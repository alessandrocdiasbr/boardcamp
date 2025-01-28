import * as rentalRepository from '../repositories/rentalRepository.js';
import * as gameRepository from '../repositories/gameRepository.js';
import * as customerRepository from '../repositories/customerRepository.js';
import { rentalSchema } from '../schemas/rentalSchema.js';
import { BadRequestError, NotFoundError, UnprocessableEntityError } from '../errors/errors.js';

export async function listRentals() {
  return await rentalRepository.findAllRentals();
}

export async function createRental(customerId, gameId, daysRented) {
  const { error } = rentalSchema.validate({ customerId, gameId, daysRented });
  if (error) throw BadRequestError(error.details[0].message);

  const customer = await customerRepository.findCustomerById(customerId);
  if (!customer) throw NotFoundError('Customer not found');

  const game = await gameRepository.findGameById(gameId);
  if (!game) throw NotFoundError('Game not found');

  const openRentals = await rentalRepository.countOpenRentalsByGameId(gameId);
  if (openRentals >= game.stockTotal) {
    throw UnprocessableEntityError('No games available');
  }

  const rentDate = new Date().toISOString().split('T')[0];
  const originalPrice = game.pricePerDay * daysRented;

  await rentalRepository.insertRental(customerId, gameId, rentDate, daysRented, originalPrice);
}

export async function returnRental(rentalId) {
  const rental = await rentalRepository.findRentalById(rentalId);
  if (!rental) throw NotFoundError('Rental not found');
  if (rental.returnDate) throw UnprocessableEntityError('Rental already returned');

  const game = await gameRepository.findGameById(rental.gameId);
  const returnDate = new Date().toISOString().split('T')[0];
  const rentDate = new Date(rental.rentDate);
  const expectedReturnDate = new Date(rentDate);
  expectedReturnDate.setDate(rentDate.getDate() + rental.daysRented);

  let delayFee = 0;
  const actualReturnDate = new Date(returnDate);
  const daysLate = Math.max(0, Math.floor((actualReturnDate - expectedReturnDate) / (1000 * 60 * 60 * 24)));
  
  if (daysLate > 0) {
    delayFee = daysLate * game.pricePerDay;
  }

  await rentalRepository.returnRental(rentalId, returnDate, delayFee);
}

export async function deleteRental(rentalId) {
  const rental = await rentalRepository.findRentalById(rentalId);
  if (!rental) throw NotFoundError('Rental not found');
  if (rental.returnDate) throw BadRequestError('Cannot delete finished rental');

  await rentalRepository.deleteRental(rentalId);
}

export async function updateRental(rentalId, daysRented, returnDate) {
  const rental = await rentalRepository.findRentalById(rentalId);
  if (!rental) throw { type: 'not_found', message: 'Rental not found' };
  await rentalRepository.updateRental(rentalId, daysRented, returnDate);
}