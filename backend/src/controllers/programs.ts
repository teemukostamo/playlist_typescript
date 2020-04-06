import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { QueryTypes } from 'sequelize';

import { Program } from '../models/Program';
import { Report } from '../models/Report';

import { asyncHandler } from '../middleware/async';
import ErrorResponse from '../utils/errorResponse';

// @desc    Get all active programs
// @route   GET /active
// @access  Private
export const getAllActivePrograms = asyncHandler(
  async (_req: Request, res: Response, next: NextFunction) => {
    const programs = await db.query(
      'SELECT * FROM playlist__program WHERE display = 1 order by name asc',
      {
        type: QueryTypes.SELECT
      }
    );
    if (programs.length === 0) {
      return next(new ErrorResponse('no programs found', 404));
    }
    res.status(200).json(programs);
  }
);

// @desc    Get all programs
// @route   GET /all
// @access  Private
export const getAllPrograms = asyncHandler(
  async (_req: Request, res: Response, next: NextFunction) => {
    const programs = await db.query(
      'SELECT * FROM playlist__program order by display desc, name asc',
      {
        type: QueryTypes.SELECT
      }
    );
    if (programs.length === 0) {
      return next(new ErrorResponse('no programs found', 404));
    }
    res.status(200).json(programs);
  }
);

// @desc    Get one program
// @route   GET /getone/:id
// @access  Private
export const getOneProgram = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const program = await db.query(
      `SELECT * FROM playlist__program WHERE id = ${req.params.id}`,
      {
        type: QueryTypes.SELECT
      }
    );
    if (program.length === 0) {
      return next(
        new ErrorResponse(`no programs found with the id ${req.params.id}`, 404)
      );
    }
    res.status(200).json(program);
  }
);

// @desc    Create a new program
// @route   POST /
// @access  Private
export const createNewProgram = asyncHandler(
  async (req: Request, res: Response) => {
    const savedProgram = await Program.create({
      user_id: req.body.user_id,
      identifier: req.body.identifier,
      name: req.body.name,
      display: 1,
      site: 1
    });
    res.status(201).json(savedProgram);
  }
);

// @desc    Update program - get the id of program to update from req body
// @route   PUT /update
// @access  Private
export const updateProgram = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, name, identifier, site, display } = req.body;
    const programToUpdate = await Program.update(
      {
        name,
        identifier,
        site,
        display
      },
      { where: { id } }
    );
    if (programToUpdate[0] === 0) {
      return next(new ErrorResponse(`no program found with the id ${id}`, 404));
    }
    res.status(200).json(`${programToUpdate[0]} row(s) affected`);
  }
);

// @desc    Merge two programs
// @route   PUT /merge
// @access  Private
export const mergePrograms = asyncHandler(
  async (req: Request, res: Response) => {
    const { merge, mergeTo } = req.body;
    let transaction;
    try {
      transaction = await db.transaction();
      await Report.update(
        {
          program_id: mergeTo
        },
        { where: { program_id: merge } }
      );
      await Program.destroy({ where: { id: merge } });
      res.status(200).json('1 table affected');
    } catch (err) {
      if (transaction) await transaction.rollback();
    }
  }
);
