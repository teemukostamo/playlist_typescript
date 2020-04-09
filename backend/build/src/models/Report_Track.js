"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/class-name-casing */
const sequelize_typescript_1 = require("sequelize-typescript");
let Report_Track = class Report_Track extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Report_Track.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Index({
        unique: false,
    }),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Report_Track.prototype, "track_id", void 0);
__decorate([
    sequelize_typescript_1.Index({
        unique: false,
    }),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Report_Track.prototype, "report_id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Report_Track.prototype, "length", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Report_Track.prototype, "comment", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Report_Track.prototype, "old_id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Report_Track.prototype, "sortable_rank", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Report_Track.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Report_Track.prototype, "updated_at", void 0);
Report_Track = __decorate([
    sequelize_typescript_1.Table({
        timestamps: true,
        tableName: 'playlist__report_track',
    })
], Report_Track);
exports.Report_Track = Report_Track;
