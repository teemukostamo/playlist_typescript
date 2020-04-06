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
// import Album from './types';
let Album = class Album extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], Album.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Index({
        unique: false
    }),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Album.prototype, "artist_id", void 0);
__decorate([
    sequelize_typescript_1.Index({
        unique: false
    }),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Album.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Album.prototype, "local", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Album.prototype, "identifier", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Album.prototype, "label", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Album.prototype, "year", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Album.prototype, "spotify_id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Album.prototype, "user_id", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Album.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Album.prototype, "updated_at", void 0);
Album = __decorate([
    sequelize_typescript_1.Table({
        timestamps: true,
        tableName: 'playlist__album'
    })
], Album);
exports.Album = Album;
// const Album = db.define(
//   'playlist__album',
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     artist_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'playlist__artist',
//         key: 'id'
//       },
//       allowNull: false
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     local: {
//       type: DataTypes.INTEGER
//     },
//     identifier: {
//       type: DataTypes.STRING(150)
//     },
//     label: {
//       type: DataTypes.STRING(150)
//     },
//     year: {
//       type: DataTypes.DATEONLY
//     },
//     spotify_id: {
//       type: DataTypes.STRING(22)
//     },
//     user_id: {
//       type: DataTypes.INTEGER
//     }
//   },
//   {
//     tableName: 'playlist__album',
//     freezeTableName: true,
//     timestamps: true,
//     underscored: true,
//     createdAt: 'created_at',
//     updatedAt: 'updated_at'
//   },
//   {
//     indexes: {
//       unique: false,
//       fields: ['artist_id', 'name']
//     }
//   }
// );
