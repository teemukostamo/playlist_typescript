import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { QueryTypes } from 'sequelize';
import { Artist } from '../models/Artist';

import { asyncHandler } from '../middleware/async';
import ErrorResponse from '../utils/errorResponse';

// @desc    Get one artist details
// @route   GET /details/:id
// @access  Private
export const getOneArtist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const artist = await Artist.findOne({ where: { id: req.params.id } });
    if (!artist) {
      return next(
        new ErrorResponse(`no artist found with the id ${req.params.id}`, 404)
      );
    }
    res.status(200).json(artist);
  }
);

// @desc    Get all albums by artist
// @route   GET /albumsby/:id
// @access  Private
export const getAllAlbumsByArtist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const albumlist = await db.query(
      `
      SELECT al.id as album_id
      , ar.id as artist_id
      , al.name
      , al.identifier
      , ar.name as artist_name
      , ar.spotify_id as artist_spotify_id
      , count(distinct tr.id) as track_count
      , count(rt.track_id) as report_occurrence
     FROM playlist__album as al 
     INNER JOIN playlist__artist as ar ON al.artist_id = ar.id
     INNER JOIN playlist__track as tr ON tr.album_id = al.id
     INNER JOIN playlist__report_track as rt ON rt.track_id = tr.id
     WHERE ar.id = ${req.params.id}
     group by album_id
     ORDER BY al.name
    `,
      {
        type: QueryTypes.SELECT
      }
    );
    if (albumlist.length === 0) {
      return next(
        new ErrorResponse(`no artist found with the id ${req.params.id}`, 404)
      );
    }
    res.status(200).json(albumlist);
  }
);

// @desc    Update artist details
// @route   PUT /details/:id
// @access  Private
export const updateArtist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, spotify_id } = req.body;
    const updatedArtist = await Artist.update(
      {
        name,
        spotify_id
      },
      { where: { id: req.params.id } }
    );
    if (updatedArtist[0] === 0) {
      return next(
        new ErrorResponse(`no artist found with the id ${req.params.id}`, 404)
      );
    }
    res.status(200).json(`${updatedArtist[0]} row('s) affected`);
  }
);
