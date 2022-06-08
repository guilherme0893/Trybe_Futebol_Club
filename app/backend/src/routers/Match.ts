import * as express from 'express';
import MatchController from '../controllers/Match';
import TokenValidation from '../middlewares/TokenValidation';

class MatchRouter {
  private _matchController = new MatchController();
  private _token = new TokenValidation();

  match(app: express.Application) {
    app.get(
      '/matches',
      (req, res) => this._matchController.getAllMatches(req, res),
    );
    app.post(
      '/matches',
      (req, res, next) => this._token.tokenValidation(req, res, next),
      (req, res) => this._matchController.createMatch(req, res),
    );
  }
}

export default MatchRouter;
