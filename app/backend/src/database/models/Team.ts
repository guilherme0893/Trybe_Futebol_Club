import { Model, DataTypes } from 'sequelize';
import db from '.';

class Team extends Model {
  id: number;
  teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  teamName: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'Team',
  timestamps: false,
  tableName: 'teams',
});

export default Team;
