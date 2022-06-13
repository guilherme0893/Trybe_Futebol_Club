import IMatch from '../interfaces/Match';
// import ITeam from '../interfaces/Team';
// import Team from './Team';
// import Match from './Match';

class LeaderBoard {
  // private teamService = new Team();
  // private matchService = new Match();
  // private totalPoints = 0;
  // private totalGames = 0;
  // private totalVictories = 0;
  // private totalDraws = 0;
  // private totalLosses = 0;
  // private goalsFavor = 0;
  // private goalsOwn = 0;
  // private goalsBalance = 0;
  // private efficiency = 0;

  // public createTeamStats(team: ITeam, match: IMatch) {
  //   // 1 - points must be counted if the match is finished
  //   if (team.id === match.homeTeam && !match.inProgress) {
  //     // if wins
  //     if (match.homeTeamGoals > match.awayTeamGoals) {
  //       this.totalPoints += 3;
  //       this.totalVictories += 1;
  //     }
  //     // if loses
  //     if (match.homeTeamGoals < match.awayTeamGoals) this.totalLosses += 1;
  //     // if draws
  //     if (match.homeTeamGoals === match.awayTeamGoals) {
  //       this.totalPoints += 1;
  //       this.totalDraws += 1;
  //     }
  //   }
  //   this.totalGames += 1;
  //   this.goalsFavor += match.homeTeamGoals;
  //   this.goalsOwn += match.awayTeamGoals;
  //   this.goalsBalance = this.goalsFavor - this.goalsOwn;
  //   this.efficiency = Number(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
  // }

  public createVictoryStats = (match: IMatch[]): number => match.reduce((accumulator, matches) => {
    if (matches.homeTeamGoals > matches.awayTeamGoals) return accumulator + 1;
    return accumulator;
  }, 0);

  public createDrawStas = (match: IMatch[]): number => match.reduce((accumulator, matches) => {
    if (matches.homeTeam === matches.awayTeamGoals) return accumulator + 1;
    return accumulator;
  }, 0);

  public createLosesStats = (match: IMatch[]): number => match.reduce((accumulator, matches) => {
    if (matches.awayTeamGoals > matches.homeTeamGoals) return accumulator + 1;
    return accumulator;
  }, 0);

  // public clearStats() {
  //   this.totalPoints = 0;
  //   this.totalGames = 0;
  //   this.totalVictories = 0;
  //   this.totalDraws = 0;
  //   this.totalLosses = 0;
  //   this.goalsFavor = 0;
  //   this.goalsOwn = 0;
  //   this.goalsBalance = 0;
  //   this.efficiency = 0;
  // }

  // public async fillTeamStats() {
  //   const teams = await this.teamService.getAllTeams(); // array of teams
  //   const matches: IMatch[] = await this.matchService.getAllMatches(); // array of matches
  //   return teams.map((team) => { // MAPEIA team PARA CADA match ---> createTeamStats(team, match)
  //     matches.forEach((match) => { this.createTeamStats(team, match); });
  //     const correlation = { name: team.teamName,
  //       totalGames: this.totalGames,
  //       totalPoints: this.totalPoints,
  //       totalVictories: this.totalVictories,
  //       totalDraws: this.totalDraws,
  //       totalLosses: this.totalLosses,
  //       goalsFavor: this.goalsFavor,
  //       goalsOwn: this.goalsOwn,
  //       goalsBalance: this.goalsBalance,
  //       efficiency: this.efficiency,
  //     };
  //     this.clearStats();
  //     return correlation;
  //   });
  // }

  // public async createLeaderBoard() {
  //   const teams = await this.fillTeamStats();
  //   const sortedTeams = teams.sort((teamA, teamB) =>
  //     teamB.totalPoints - teamA.totalPoints
  //     || teamB.totalVictories - teamA.totalVictories
  //     || teamB.goalsBalance - teamA.goalsBalance
  //     || teamB.goalsFavor - teamA.goalsFavor
  //     || teamA.goalsOwn - teamB.goalsOwn);
  //   return sortedTeams;
  // }
}

export default LeaderBoard;
