import IMatch from '../interfaces/Match';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

class MatchService {
  public getAllMatches = async (): Promise<IMatch[]> => {
    const matches = await Match.findAll({ // lembrar do eager loading
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };

  // public getMatchInProgress = async (inProgress: boolean) => {
  //   const allMatches = await this.getAllMatches();
  //   const matchesInProgress = allMatches.filter((match) => match.inProgress === inProgress);
  //   console.log(matchesInProgress);
  //   return matchesInProgress;
  // };

  public createMatch = async (match: IMatch) => {
    const newMatch = await Match.create(match);
    console.log(newMatch);
    return newMatch;
  };
}

export default MatchService;
