import {
  Table,
  Column,
  Model,
  UpdatedAt,
  CreatedAt,
  DataType,
  Index
} from 'sequelize-typescript';
// import Album from './types';

@Table({
  timestamps: true,
  tableName: 'playlist__album'
})
export class Album extends Model<Album> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false
  })
  id!: number;

  @Index({
    unique: false
  })
  @Column
  artist_id!: number;

  @Index({
    unique: false
  })
  @Column
  name!: string;

  @Column
  local?: number;

  @Column
  identifier?: string;

  @Column
  label?: string;

  @Column
  year?: Date;

  @Column
  spotify_id?: string;

  @Column
  user_id?: number;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;
}

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
