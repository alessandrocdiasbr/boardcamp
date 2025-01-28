import * as gameService from '../services/gameService.js';

export async function createGame(req, res, next) {
  const { name, image, stockTotal, pricePerDay } = req.body;
  await gameService.createGame(name, image, stockTotal, pricePerDay);
  res.status(201).json({ message: 'Jogo Criado com Sucesso!' });
}

export async function listGames(req, res, next) {
  const games = await gameService.listGames();
  res.status(200).json(games);
}