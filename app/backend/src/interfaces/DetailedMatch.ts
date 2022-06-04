import IMatch from './Match';

interface IDetailedMatch extends IMatch {
  teamHome: {
    teamName: string,
  }
  teamAway: {
    teamName: string,
  }
}

export default IDetailedMatch;
