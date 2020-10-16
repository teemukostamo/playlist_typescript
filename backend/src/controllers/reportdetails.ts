import { Request, Response, NextFunction } from 'express';
import mysql from 'mysql';
import { db } from '../config/database';
import { QueryTypes } from 'sequelize';
import { Report } from '../models/Report';

import { asyncHandler } from '../middleware/async';
import ErrorResponse from '../utils/errorResponse';

// @desc    Get one report details
// @route   GET /details/:id
// @access  Private
export const getReportDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = mysql.escape(req.params.id);
    const report = await db.query(
      `
      SELECT pr.name as program_name
      , re.program_no
      , re.program_dj
      , re.program_date
      , re.program_start_time
      , re.program_end_time
      , re.id
      , pr.id as program_id
      , re.rerun
      , re.status
      , re.user_id
      , us.username
      , us.first_name
      , us.last_name
     FROM playlist__program as pr
     INNER JOIN playlist__report as re ON pr.id = re.program_id
     INNER JOIN playlist__user as us ON re.user_id = us.id
     WHERE re.id = ${id}
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (report.length === 0) {
      return next(new ErrorResponse(`no report with id ${req.params.id}`, 404));
    }
    res.status(200).json(report);
  }
);

// @desc    Create a new report
// @route   POST /
// @access  Private
export const createNewReport = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      user_id,
      program_id,
      program_date,
      program_start_time,
      program_end_time,
      program_no,
      program_dj,
      status,
      rerun,
    } = req.body;

    const savedReport = await Report.create({
      user_id,
      program_id,
      program_date,
      program_start_time,
      program_end_time,
      program_no,
      program_dj,
      status,
      rerun,
    });
    res.status(201).json(savedReport.toJSON());
  }
);

// @desc    Update existing report details
// @route   PUT /update/:id
// @access  Private
export const updateReportDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      user_id,
      program_id,
      program_date,
      program_start_time,
      program_end_time,
      program_no,
      program_dj,
      status,
      rerun,
    } = req.body;

    const updatedReport = await Report.update(
      {
        user_id,
        program_id,
        program_date,
        program_start_time,
        program_end_time,
        program_no,
        program_dj,
        status,
        rerun,
      },
      { where: { id: req.body.id } }
    );
    if (updatedReport[0] === 0) {
      return next(
        new ErrorResponse(`no report found with the id ${req.body.id}`, 404)
      );
    }
    console.log(updatedReport);
    res.status(200).json(`${updatedReport[0]} rows(s) affected`);
  }
);
