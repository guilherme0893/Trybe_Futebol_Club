import IMatch from '../interfaces/Match';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

class MatchService {
  private _matches: IMatch[];
  private _newMatch: IMatch;
  private _matchProgressToBeUpdated: object | null;

  public getAllMatches = async () => {
    this._matches = await Match.findAll({ // lembrar do eager loading
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return this._matches;
  };

  public createMatch = async (match: IMatch) => {
    const { inProgress } = match;
    if (inProgress === false) throw new Error();
    this._newMatch = await Match.create(match);
    return this._newMatch;
  };

  public updateMatchProgressById = async (id: number) => {
    this._matchProgressToBeUpdated = await Match.findOne({ where: { id } });
    if (!this._matchProgressToBeUpdated) throw new Error('Error');
    // if there is a match with id
    await Match.update(
      { inProgress: false },
      { where: { id } },
    );
  };
}

export default MatchService;
