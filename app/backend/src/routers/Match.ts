import { Router } from 'express';
import MatchController from '../controllers/Match';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get(
  '/',
  (req, res) => {
    matchController.getAllMatches(req, res);
  },
);

export default matchRouter;
