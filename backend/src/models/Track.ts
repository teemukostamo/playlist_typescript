import {
  Table,
  Column,
  Model,
  UpdatedAt,
  CreatedAt,
  DataType,
  Index,
} from 'sequelize-typescript';
// import Album from './types';

@Table({
  timestamps: true,
  tableName: 'playlist__track',
})
export class Track extends Model<Track> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
  })
  id!: number;

  @Index({
    unique: false,
  })
  @Column
  artist_id!: number;

  @Index({
    unique: false,
  })
  @Column
  album_id!: number;

  @Index({
    unique: false,
  })
  @Column
  name!: string;

  @Column
  identifier?: string;

  @Column
  label?: string;

  @Column
  side?: number;

  @Column
  track_no?: number;

  @Column
  length?: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  people?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  comment?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  note?: string;

  @Column
  record_country?: string;

  @Column
  country?: number;

  @Column
  fixed?: number;

  @Column
  isrc?: string;

  @Index({
    unique: false,
  })
  @Column
  file?: string;

  @Index({
    unique: false,
  })
  @Column
  file_order?: string;

  @Column
  spotify_id?: string;

  @Column
  user_id?: number;

  @Column
  old_id?: number;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;
}
