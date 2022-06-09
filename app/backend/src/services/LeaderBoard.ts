import IMatch from '../interfaces/Match';
import ITeam from '../interfaces/Team';
import Team from './Team';
import Match from './Match';

class LeaderBoard {
  private teamService = new Team();
  private matchService = new Match();
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

  public async fillTeamStats() {
    const teams = await this.teamService.getAllTeams(); // array of teams
    const matches = await this.matchService.getAllMatches(); // array of matches
    const correlateTeamToMatch = teams.map((team) => { // MAPEIA team PARA CADA match ---> createTeamStats(team, match)
      matches.forEach((match) => { this.createTeamStats(team, match); });
      const correlation = { name: team.teamName,
        totalGames: this.totalGames,
        totalPoints: this.totalPoints,
        totalVictories: this.totalVictories,
        totalDraws: this.totalDraws,
        totalLosses: this.totalLosses,
        goalsFavor: this.goalsFavor,
        goalsOwn: this.goalsOwn,
        goalsBalance: this.goalsBalance,
        efficiency: this.efficiency,
      };
      return correlation;
    });
    return correlateTeamToMatch;
  }

  public async createLeaderBoard() {
    const winner = await this.fillTeamStats();
    return winner;
  }
}

export default LeaderBoard;
