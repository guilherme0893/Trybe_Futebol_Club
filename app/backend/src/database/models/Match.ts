import { Model, DataTypes } from 'sequelize';
import db from '.';

class Match extends Model {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

Match.init({
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  sequelize: db,
  modelName: 'Match',
  timestamps: false,
  underscored: true,
  tableName: 'matches',
});

export default Match;
