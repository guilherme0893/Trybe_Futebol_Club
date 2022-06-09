import * as express from 'express';
import MatchController from '../controllers/Match';
import TokenValidation from '../middlewares/TokenValidation';
import MatchValidation from '../middlewares/Match';

class MatchRouter {
  private _matchController = new MatchController();
  private _token = new TokenValidation();
  private _matchValidation = new MatchValidation();

  match(app: express.Application) {
    app.patch(
      '/matches/:id',
      (req, res) => this._matchController.updateMatchScore(req, res),
    );
    app.patch(
      '/matches/:id/finish',
      (req, res, next) => this._token.tokenValidation(req, res, next),
      (req, res) => this._matchController.updateMatchProgressById(req, res),
    );
    app.get('/matches', (req, res) => this._matchController.getAllMatches(req, res));
    app.post(
      '/matches',
      (req, res, next) => this._token.tokenValidation(req, res, next),
      (req, res, next) => this._matchValidation.checkIfSameTeams(req, res, next),
      (req, res, next) => this._matchValidation.checkIfTeamExists(req, res, next),
      (req, res) => this._matchController.createMatch(req, res),
    );
  }
}

export default MatchRouter;
