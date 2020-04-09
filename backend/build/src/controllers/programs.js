"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
const Program_1 = require("../models/Program");
const Report_1 = require("../models/Report");
const async_1 = require("../middleware/async");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
// @desc    Get all active programs
// @route   GET /active
// @access  Private
exports.getAllActivePrograms = async_1.asyncHandler((_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const programs = yield database_1.db.query('SELECT * FROM playlist__program WHERE display = 1 order by name asc', {
        type: sequelize_1.QueryTypes.SELECT
    });
    if (programs.length === 0) {
        return next(new errorResponse_1.default('no programs found', 404));
    }
    res.status(200).json(programs);
}));
// @desc    Get all programs
// @route   GET /all
// @access  Private
exports.getAllPrograms = async_1.asyncHandler((_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const programs = yield database_1.db.query('SELECT * FROM playlist__program order by display desc, name asc', {
        type: sequelize_1.QueryTypes.SELECT
    });
    if (programs.length === 0) {
        return next(new errorResponse_1.default('no programs found', 404));
    }
    res.status(200).json(programs);
}));
// @desc    Get one program
// @route   GET /getone/:id
// @access  Private
exports.getOneProgram = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const program = yield database_1.db.query(`SELECT * FROM playlist__program WHERE id = ${req.params.id}`, {
        type: sequelize_1.QueryTypes.SELECT
    });
    if (program.length === 0) {
        return next(new errorResponse_1.default(`no programs found with the id ${req.params.id}`, 404));
    }
    res.status(200).json(program);
}));
// @desc    Create a new program
// @route   POST /
// @access  Private
exports.createNewProgram = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const savedProgram = yield Program_1.Program.create({
        user_id: req.body.user_id,
        identifier: req.body.identifier,
        name: req.body.name,
        display: 1,
        site: 1
    });
    res.status(201).json(savedProgram);
}));
// @desc    Update program - get the id of program to update from req body
// @route   PUT /update
// @access  Private
exports.updateProgram = async_1.asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, identifier, site, display } = req.body;
    const programToUpdate = yield Program_1.Program.update({
        name,
        identifier,
        site,
        display
    }, { where: { id } });
    if (programToUpdate[0] === 0) {
        return next(new errorResponse_1.default(`no program found with the id ${id}`, 404));
    }
    res.status(200).json(`${programToUpdate[0]} row(s) affected`);
}));
// @desc    Merge two programs
// @route   PUT /merge
// @access  Private
exports.mergePrograms = async_1.asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { merge, mergeTo } = req.body;
    let transaction;
    try {
        transaction = yield database_1.db.transaction();
        yield Report_1.Report.update({
            program_id: mergeTo
        }, { where: { program_id: merge } });
        yield Program_1.Program.destroy({ where: { id: merge } });
        res.status(200).json('1 table affected');
    }
    catch (err) {
        if (transaction)
            yield transaction.rollback();
    }
}));
