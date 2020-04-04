/* eslint-disable @typescript-eslint/class-name-casing */
import {
  Table,
  DataType,
  Column,
  Model,
  UpdatedAt,
  CreatedAt,
  Index
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'playlist__report_transfer'
})
export class Report_Transfer extends Model<Report_Transfer> {
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
  user_id!: number;

  @Column
  status!: number;

  @Column
  filename?: string;

  @Column
  period?: Date;

  @Column
  old_id?: number;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;
}
