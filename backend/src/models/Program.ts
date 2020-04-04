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
  tableName: 'playlist__program'
})
export class Program extends Model<Program> {
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
  name!: string;

  @Index({
    unique: false
  })
  @Index
  @Column
  user_id?: number;

  @Column
  identifier?: string;

  @Column
  display?: number;

  @Column
  site?: number;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;
}
