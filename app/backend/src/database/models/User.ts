import { Model, DataTypes } from 'sequelize';
import db from '.';

class User extends Model {
  username: string;
  role: string;
  enail: string;
  password: string;
}

User.init({
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'User',
  tableName: 'users',
});

export default User;
