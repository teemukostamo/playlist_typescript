import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { QueryTypes } from 'sequelize';

import { Album } from '../models/Album';

import { asyncHandler } from '../middleware/async';
import ErrorResponse from '../utils/errorResponse';

// @desc    Get one album
// @route   GET /albumdetails/:id
// @access  Private
export const getOneAlbum = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const album = await db.query(
      `
      SELECT al.name as album_name
      , al.id as album_id
      , al.label
      , al.identifier as cat_id
      , al.spotify_id
      , al.year
      , ar.name as artist_name
      , ar.id as artist_id
      FROM playlist__artist as ar
      INNER JOIN playlist__album as al ON al.artist_id = ar.id
      WHERE al.id = ${req.params.id}
    `,
      {
        type: QueryTypes.SELECT
      }
    );
    if (album.length === 0) {
      return next(
        new ErrorResponse(`no album found with the id ${req.params.id}`, 404)
      );
    }
    res.status(200).json(album);
  }
);

// @desc    Get one album's tracklist & album occurrence in reports count
// @route   GET /tracklist/:id
// @access  Private
export const getAlbumTracklist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const album = await db.query(
      `
      SELECT tr.id as track_id
      , tr.isrc
      , tr.side as disc_no
      , tr.track_no
      , tr.name as track_title
      , ar.name as artist_name
      , count(rt.track_id) as report_occurrence
     FROM playlist__album as al
     LEFT JOIN  playlist__artist as ar ON al.artist_id = ar.id
     LEFT JOIN  playlist__track as tr ON tr.album_id = al.id
     LEFT JOIN  playlist__report_track as rt ON  rt.track_id = tr.id
     WHERE al.id = ${req.params.id}
     group by track_id
     order by track_no asc, track_title asc
    `,
      {
        type: QueryTypes.SELECT
      }
    );
    if (album.length === 0) {
      return next(
        new ErrorResponse(`no album found with the id ${req.params.id}`, 404)
      );
    }
    res.status(200).json(album);
  }
);

// @desc    Update album name, label, cat_id, year or spotify_id
// @route   PUT /albumdetails/:id
// @access  Private
export const updateAlbum = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, label, cat_id, year, spotify_id } = req.body;
    const updatedAlbum = await Album.update(
      {
        name,
        label,
        identifier: cat_id,
        year,
        spotify_id
      },
      { where: { id: req.params.id } }
    );
    if (updatedAlbum[0] === 0) {
      return next(
        new ErrorResponse(`no album found with the id ${req.params.id}`, 404)
      );
    }
    res.status(200).json(`${updatedAlbum[0]} row('s) affected`);
  }
);

// @desc    Change the artist of an album
// @route   PUT /updateartist
// @access  Private
export const changeArtist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { album_id, artist_id } = req.body;
    const changedArtist = await Album.update(
      {
        artist_id
      },
      { where: { id: album_id } }
    );
    if (changedArtist[0] === 0) {
      return next(
        new ErrorResponse(`no album found with the id ${album_id}`, 404)
      );
    }
    res.status(200).json(`${changedArtist[0]} row(s) affected.`);
  }
);
