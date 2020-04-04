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
  tableName: 'playlist__artist'
})
export class Artist extends Model<Artist> {
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
