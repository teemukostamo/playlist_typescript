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
let Program = class Program extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], Program.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Index({
        unique: false
    }),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Program.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Index({
        unique: false
    }),
    sequelize_typescript_1.Index,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Program.prototype, "user_id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Program.prototype, "identifier", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Program.prototype, "display", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Program.prototype, "site", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Program.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Program.prototype, "updated_at", void 0);
Program = __decorate([
    sequelize_typescript_1.Table({
        timestamps: true,
        tableName: 'playlist__program'
    })
], Program);
exports.Program = Program;
