import { Model, DataTypes } from 'sequelize';
import db from '.';

class Team extends Model {
  id: number;
  teamName: string;
}

Team.init({
  teamName: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'Team',
  timestamps: false,
  tableName: 'teams',
});

export default Team;
