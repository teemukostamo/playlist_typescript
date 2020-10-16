import { Request, Response, NextFunction } from 'express';
import mysql from 'mysql';
import { db } from '../config/database';
import { QueryTypes } from 'sequelize';
import { Report } from '../models/Report';

import { asyncHandler } from '../middleware/async';
import ErrorResponse from '../utils/errorResponse';

// @desc    Get all reports by month by current user
// @route   GET /all
// @access  Private
export const getCurrentUsersReports = asyncHandler(
  async (req: Request, res: Response) => {
    const user = mysql.escape(req.query.user);
    const date = mysql.escape(`${req.query.date}%`);
    const reports = await db.query(
      `
      SELECT re.program_no
      , pr.name
      , re.program_date
      , re.program_start_time
      , re.program_end_time
      , re.status
      , re.rerun
      , re.program_dj
      , re.id
      , re.user_id 
     FROM playlist__program as pr
     INNER JOIN playlist__report as re ON pr.id = re.program_id
     WHERE re.program_date like ${date}
     AND re.user_id = ${user}
     ORDER BY program_date ASC, program_start_time ASC
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json(reports);
  }
);

// @desc    Get all reports of a month
// @route   GET /date/:date
// @access  Private
export const getAllReportsByMonth = asyncHandler(
  async (req: Request, res: Response) => {
    const date = mysql.escape(`${req.params.date}%`);
    const reports = await db.query(
      `
      SELECT re.program_no
      , pr.name
      , re.program_date
      , re.program_start_time
      , re.program_end_time
      , re.status
      , re.rerun
      , re.program_dj
      , re.id
      , re.user_id 
     FROM playlist__program as pr
     INNER JOIN playlist__report as re ON pr.id = re.program_id
     WHERE re.program_date like ${date}
     ORDER BY program_date ASC, program_start_time ASC
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json(reports);
  }
);

// @desc    Get all in progress reports of a user
// @route   GET /user/:id
// @access  Private
export const getCurrentUsersInProgressReports = asyncHandler(
  async (req: Request, res: Response) => {
    const id = mysql.escape(req.params.id);
    const reports = await db.query(
      `
      SELECT re.program_no
      , pr.name
      , re.program_date
      , re.program_start_time
      , re.program_end_time
      , re.status
      , re.rerun
      , re.program_dj
      , re.id
      , re.user_id 
     FROM playlist__program as pr
     INNER JOIN playlist__report as re ON pr.id = re.program_id
     WHERE re.user_id=${id} AND re.status="0"
     ORDER BY program_date ASC, program_start_time ASC
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json(reports);
  }
);

// @desc    Delete report - set status to 9
// @route   PUT /:id
// @access  Private
export const deleteReport = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const deletedReport = await Report.update(
      {
        status: 9,
      },
      { where: { id: req.params.id } }
    );
    if (deletedReport[0] === 0) {
      return next(
        new ErrorResponse(`no report found with the id ${req.params.id}`, 404)
      );
    }
    res.status(200).json(`${deletedReport[0]} rows affected`);
  }
);
