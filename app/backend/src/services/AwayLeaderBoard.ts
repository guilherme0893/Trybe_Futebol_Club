import ITeam from '../interfaces/Team';
import IMatch from '../interfaces/Match';
import TeamObject from '../interfaces/TeamObject';
import Team from '../database/models/Team';
import Match from '../database/models/Match';

class AwayLeaderBoard {
  private _team: TeamObject;
  private _teamFinishedMatches: IMatch[];
  private _sortedTeams: TeamObject[];
  private _teams: ITeam[];
  private _teamsBoard: TeamObject[];

  public createVictoryStats = (match: IMatch[]): number => match.reduce((accumulator, matches) => {
    if (matches.homeTeamGoals < matches.awayTeamGoals) return accumulator + 1;
    return accumulator;
  }, 0);

  public createDrawStas = (match: IMatch[]): number => match.reduce((accumulator, matches) => {
    if (matches.homeTeamGoals === matches.awayTeamGoals) return accumulator + 1;
    return accumulator;
  }, 0);

  public createLossesStats = (match: IMatch[]): number => match.reduce((accumulator, matches) => {
    if (matches.awayTeamGoals < matches.homeTeamGoals) return accumulator + 1;
    return accumulator;
  }, 0);

  public createFavorGoals = (match:IMatch[]): number => match.reduce((accumulator, matches) => {
    const favorGoals = accumulator + matches.awayTeamGoals;
    return favorGoals;
  }, 0);

  public createAgaintsGoals = (match: IMatch[]): number => match.reduce((accumulator, matches) => {
    const againtGoals = accumulator + matches.homeTeamGoals;
    return againtGoals;
  }, 0);

  // reuses the basic structure of createTeamStats but changing the way of calculating stats;
  public createTeamStats(team: string, match: IMatch[]) {
    const teamTotalPoints = (this.createVictoryStats(match) * 3) + this.createDrawStas(match);
    const teamTotalMatches = match.length;
    const teamEfficiency = Number(((teamTotalPoints / (teamTotalMatches * 3)) * 100).toFixed(2));
    const teamGoalsBalance = this.createFavorGoals(match) - this.createAgaintsGoals(match);

    // create object with each team data
    this._team = {
      name: team,
      totalPoints: teamTotalPoints,
      totalGames: teamTotalMatches,
      totalVictories: this.createVictoryStats(match),
      totalLosses: this.createLossesStats(match),
      totalDraws: this.createDrawStas(match),
      goalsFavor: this.createFavorGoals(match),
      goalsOwn: this.createAgaintsGoals(match),
      goalsBalance: teamGoalsBalance,
      efficiency: teamEfficiency,
    };
    return this._team;
  }

  // refact to fillTeamStats ---> mapeando os teams e onde eles têm partidas finished, para jogar no createTeamStats;
  public fillTeamStats(teams: ITeam[], matches: IMatch[]) {
    return teams.map((team) => {
      this._teamFinishedMatches = matches.filter((match) => (
        team.id === match.awayTeam
      ));
      return this.createTeamStats(team.teamName, this._teamFinishedMatches);
    });
  }

  // refact do createLeaderBoard
  public sortLeaderBoard(unorderedBoard: TeamObject[]) {
    this._sortedTeams = unorderedBoard.sort((teamA, teamB) => (
      teamB.totalPoints - teamA.totalPoints
        || teamB.totalVictories - teamA.totalVictories
        || teamB.goalsBalance - teamA.goalsBalance
        || teamB.goalsFavor - teamA.goalsFavor
        || teamA.goalsOwn - teamB.goalsOwn
    ));
    return this._sortedTeams;
  }

  public async createBord() {
    // atenção porque precisa receber partidas finalizadas
    this._teamFinishedMatches = await Match.findAll({
      where: { inProgress: false },
    });
    // get all teams
    this._teams = await Team.findAll();
    this._teamsBoard = this.fillTeamStats(this._teams, this._teamFinishedMatches);
    return this.sortLeaderBoard(this._teamsBoard);
  }
}

export default AwayLeaderBoard;
