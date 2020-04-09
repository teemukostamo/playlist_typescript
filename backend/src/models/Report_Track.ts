/* eslint-disable @typescript-eslint/class-name-casing */
import {
  Table,
  DataType,
  Column,
  Model,
  UpdatedAt,
  CreatedAt,
  Index,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'playlist__report_track',
})
export class Report_Track extends Model<Report_Track> {
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
  track_id!: number;

  @Index({
    unique: false,
  })
  @Column
  report_id!: number;

  @Column
  length?: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  comment?: string;

  @Column
  old_id?: number;

  @Column
  sortable_rank?: number;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;
}
