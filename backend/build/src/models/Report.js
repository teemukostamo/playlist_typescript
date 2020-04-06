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
const sequelize_typescript_1 = require("sequelize-typescript");
let Report = class Report extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], Report.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Index({
        unique: false
    }),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Report.prototype, "user_id", void 0);
__decorate([
    sequelize_typescript_1.Index({
        unique: false
    }),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Report.prototype, "program_id", void 0);
__decorate([
    sequelize_typescript_1.Index({
        unique: false
    }),
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Report.prototype, "program_date", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Report.prototype, "program_start_time", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Report.prototype, "program_end_time", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Report.prototype, "program_no", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Report.prototype, "program_dj", void 0);
__decorate([
    sequelize_typescript_1.Index({
        unique: false
    }),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Report.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Report.prototype, "rerun", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Report.prototype, "old_id", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Report.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Report.prototype, "updated_at", void 0);
Report = __decorate([
    sequelize_typescript_1.Table({
        timestamps: true,
        tableName: 'playlist__report'
    })
], Report);
exports.Report = Report;
