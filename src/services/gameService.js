import * as gameRepository from '../repositories/gameRepository.js';
import { gameSchema } from '../schemas/gameSchema.js';
import { BadRequestError, ConflictError } from '../errors/errors.js';

export async function listGames() {
  return await gameRepository.findAllGames();
}

export async function createGame(name, image, stockTotal, pricePerDay) {
  const { error } = gameSchema.validate({ name, image, stockTotal, pricePerDay });
  if (error) throw BadRequestError(error.details[0].message);

  const existingGame = await gameRepository.findGameByName(name);
  if (existingGame) throw ConflictError('Game name already exists');

  await gameRepository.insertGame(name, image, stockTotal, pricePerDay);
}
