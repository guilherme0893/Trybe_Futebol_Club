import { Router } from 'express';
import TeamsController from '../controllers/Team';

const teamController = new TeamsController();

const teamRouter = Router();

teamRouter.get(
  '/',
  (req, res) => {
    teamController.getAllTeams(req, res);
  },
);

export default teamRouter;
