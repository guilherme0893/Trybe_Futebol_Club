import IDetailedMatch from '../../interfaces/DetailedMatch';

const matchesMock: IDetailedMatch[] = [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 2,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: "Botafogo de Futebol e Regatas"
    },
    teamAway: {
      teamName: "Botafogo Football Club"
    }
  },
  {
    id: 1,
    homeTeam: 2,
    homeTeamGoals: 0,
    awayTeam: 3,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: {
      teamName: "Botafogo Football Club"
    },
    teamAway: {
      teamName: "Clube de Regatas Botafogoh"
    }
  },
  {
    id: 3,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 3,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: {
      teamName: "Botafogo Football Club"
    },
    teamAway: {
      teamName: "Clube de Regatas Botafogoh"
    }
  }
]

export default matchesMock;
