import {
  Table,
  Column,
  Model,
  UpdatedAt,
  CreatedAt,
  DataType,
  IsEmail,
  Index
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'playlist__user'
})
export class User extends Model<User> {
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
  username!: string;

  @Column
  password!: string;

  @Column
  first_name?: string;

  @Column
  last_name?: string;

  @IsEmail
  @Column
  email!: string;

  @Column
  address?: string;

  @Column
  zip?: string;

  @Column
  country?: string;

  @Column
  phone?: string;

  @Column
  status?: number;

  @Column
  level?: number;

  @Column
  last_seen?: Date;

  @Column
  reset_key?: string;

  @Column
  old_id?: number;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;
}
