import { Model } from '@workshop/util-sequelize';

import { Column, CreatedAt, DataType, IsUUID, Table, UpdatedAt } from 'sequelize-typescript';

@Table({ modelName: 'users' })
export class UserModel extends Model<UserModel> {
  @IsUUID(4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  job_name?: string | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  age?: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  sponsor_id?: string | null;
}
