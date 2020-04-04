import {
  Table,
  Column,
  Model,
  UpdatedAt,
  CreatedAt,
  DataType,
  Index
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'playlist__report'
})
export class Report extends Model<Report> {
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

  @Index({
    unique: false
  })
  @Column
  program_id!: number;

  @Index({
    unique: false
  })
  @Column
  program_date!: Date;

  @Column
  program_start_time!: string;

  @Column
  program_end_time!: string;

  @Column
  program_no?: number;

  @Column
  program_dj?: string;

  @Index({
    unique: false
  })
  @Column
  status!: number;

  @Column
  rerun!: number;

  @Column
  old_id?: number;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;
}
