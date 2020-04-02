import { Router } from 'express';
import { Album } from '../models/Album';

export const albums = Router();

albums.get('/:id', async (req, res, next) => {
  try {
    const album = await Album.findOne({
      where: { id: req.params.id }
    });
    res.json(album);
  } catch (error) {
    next(error);
  }
});
