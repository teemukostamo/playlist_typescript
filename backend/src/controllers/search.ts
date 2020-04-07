import { Request, Response } from 'express';
import { db } from '../config/database';
import { QueryTypes } from 'sequelize';

import { Album } from '../models/Album';
import { Artist } from '../models/Artist';
import { Track } from '../models/Track';
import { Report_Track } from '../models/Report_Track';

import { asyncHandler } from '../middleware/async';

// @desc    Get results for autocomplete search
// @route   GET autocomplete/:query
// @access  Private
export const autocompleteResults = asyncHandler(
  async (req: Request, res: Response) => {
    // eslint-disable-next-line
    const searchString = req.params.query.replace(/'/g, "\\'");
    if (searchString.length < 3) {
      return res.status(400).json({ error: 'query too short' });
    }
    const results = await db.query(
      `
      SELECT t.name as track_title
      , ar.name as artist
      , al.name as album
      , t.id as track_id
      , t.length
      , al.id as album_id
      , ar.id as artist_id
      , t.label as label
     FROM playlist__track as t
     INNER JOIN playlist__artist as ar ON t.artist_id = ar.id
     INNER JOIN playlist__album as al ON t.album_id = al.id
     WHERE (t.name like '%${searchString}%' or ar.name like '%${searchString}%')
     ORDER BY t.name ASC 
     LIMIT 100
      `,
      {
        type: QueryTypes.SELECT
      }
    );
    return res.status(200).json(results);
  }
);

// @desc    Get advanced search results
// @route   GET /advanced
// @access  Private
export const advancedResults = asyncHandler(
  async (req: Request, res: Response) => {
    const { kind, query } = req.query;
    // eslint-disable-next-line quotes
    const searchString = query.replace(/'/g, "\\'");
    console.log(searchString.length);
    if (searchString.length < 3) {
      return res.status(400).json({ error: 'query too short' });
    }
    const results = await db.query(
      `
      SELECT ar.name as artist_name
      , ar.id as artist_id
      , al.name as album_name
      , al.id as album_id
      , tr.name as track_title
      , tr.id as track_id
      , tr.length
      , MAX(re.program_date) as program_date
      , MAX(re.id) as report_id
      FROM playlist__program as pr
      INNER JOIN playlist__report as re ON re.program_id = pr.id
      INNER JOIN playlist__report_track as rt ON rt.report_id = re.id
      INNER JOIN playlist__track as tr ON rt.track_id = tr.id
      INNER JOIN playlist__album as al ON tr.album_id = al.id
      INNER JOIN playlist__artist as ar ON tr.artist_id = ar.id AND al.artist_id = ar.id
      WHERE ${kind}.name like '%${searchString}%'
      GROUP BY tr.id
      ORDER BY track_title asc
      LIMIT 1000
      `,
      {
        type: QueryTypes.SELECT
      }
    );
    return res.status(200).json(results);
  }
);

// @desc    Merge tracks, albums or artists
// @route   PUT /advanced
// @access  Private
export const merge = asyncHandler(async (req: Request, res: Response) => {
  const { type, merge, mergeTo } = req.body;

  if (type === 'track') {
    let transaction;
    try {
      transaction = await db.transaction();
      await Report_Track.update(
        {
          track_id: mergeTo
        },
        { where: { track_id: merge } }
      );
      await Track.destroy({ where: { id: merge } });
      res.status(200).json('1 table affected');
    } catch (err) {
      if (transaction) await transaction.rollback();
    }
  } else if (type === 'album') {
    let transaction;
    try {
      transaction = await db.transaction();
      await Track.update(
        {
          album_id: mergeTo
        },
        { where: { album_id: merge } }
      );
      await Album.destroy({ where: { id: merge } });
      res.status(200).json('1 table affected');
    } catch (err) {
      if (transaction) await transaction.rollback();
    }
  } else if (type === 'artist') {
    let transaction;
    try {
      transaction = await db.transaction();
      await Album.update(
        {
          artist_id: mergeTo
        },
        { where: { artist_id: merge } }
      );
      await Track.update(
        {
          artist_id: mergeTo
        },
        { where: { artist_id: merge } }
      );
      await Artist.destroy({ where: { id: merge } });
      res.status(200).json('2 tables affected');
    } catch (err) {
      if (transaction) await transaction.rollback();
    }
  } else {
    res.status(404).end();
  }
});

// @desc    Get change artist options
// @route   GET /changeartist/:query
// @access  Private
export const changeArtistOptions = asyncHandler(
  async (req: Request, res: Response) => {
    const results = await db.query(
      `
    SELECT name as artist_name, id as artist_id
    FROM playlist__artist
    WHERE name like "%${req.params.query}%"
    `,
      {
        type: QueryTypes.SELECT
      }
    );
    res.status(200).json(results);
  }
);

// @desc    Get change album options
// @route   GET /changealbum/:query
// @access  Private
export const changeAlbumOptions = asyncHandler(
  async (req: Request, res: Response) => {
    const results = await db.query(
      `
    SELECT al.name as album_name, al.id as album_id, al.identifier as cat_id, ar.name as artist_name
    FROM playlist__album as al
    INNER JOIN playlist__artist as ar ON al.artist_id = ar.id
    WHERE al.name like "%${req.params.query}%"
    ORDER BY album_name asc
    `,
      {
        type: QueryTypes.SELECT
      }
    );
    res.status(200).json(results);
  }
);
