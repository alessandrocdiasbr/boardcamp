import { Router } from 'express';
import * as gameController from '../controllers/gameController.js';
import { asyncError } from '../middlewares/asyncErrorMiddleware.js';

const gamesRouter = Router();

gamesRouter.get('/', asyncError(gameController.listGames));
gamesRouter.post('/', asyncError(gameController.createGame));

export default gamesRouter;