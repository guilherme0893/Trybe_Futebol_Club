import IMatch from '../interfaces/Match';
import ITeam from '../interfaces/Team';
import Team from './Team';

class LeaderBoard {
  private teamService = new Team();
  private name: string;
  private totalPoints = 0;
  private totalGames = 0;
  private totalVictories = 0;
  private totalDraws = 0;
  private totalLosses = 0;
  private goalsFavor = 0;
  private goalsOwn = 0;
  private goalsBalance = 0;
  private efficiency = 0;

  // estilo t&d
  public createTeamStats(team: ITeam, match: IMatch) {
    // 1 - points must be counted if the match is finished
    if (team.id === match.homeTeam && match.inProgress === false) {
      // if wins
      if (match.homeTeamGoals > match.awayTeamGoals) {
        this.totalVictories += 1;
      }
      // if loses
      if (match.homeTeamGoals < match.awayTeamGoals) {
        this.totalLosses += 1;
      }
      // if draws
      if (match.homeTeamGoals === match.awayTeamGoals) {
        this.totalDraws += 1;
      }
    }
    this.totalGames += 1;
    this.goalsFavor += match.homeTeamGoals;
    this.goalsOwn += match.awayTeamGoals;
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.totalPoints = Number(this.totalVictories * 3) + Number(this.totalDraws);
    this.efficiency = Number((this.totalPoints / ((this.totalGames) * 100)).toFixed(2));
  }
}

export default LeaderBoard;
