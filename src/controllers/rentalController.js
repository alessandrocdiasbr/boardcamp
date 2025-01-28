import * as rentalService from '../services/rentalService.js';

export async function createRental(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;
  await rentalService.createRental(customerId, gameId, daysRented); 
  res.status(201).json({ message: 'Aluguel criado com sucesso!' });
}

export async function listRentals(req, res, next) {
  const rentals = await rentalService.listRentals(); 
  res.status(200).json(rentals);
}

export async function returnRental(req, res, next) {
  const { id } = req.params;
  await rentalService.returnRental(Number(id)); 
  res.status(200).json({ message: 'Aluguel devolvido com sucesso!' });
}

export async function deleteRental(req, res, next) {
  const { id } = req.params;
  await rentalService.deleteRental(Number(id));
  res.status(200).json({ message: 'Aluguel deletado com sucesso!' }); 
}

export async function updateRental(req, res, next) {
  const { id } = req.params;
  const { daysRented, returnDate } = req.body;

  const updatedRental = await rentalService.updateRental(Number(id), daysRented, returnDate); 

  res.status(200).json({ message: 'Aluguel atualizado com sucesso!', rental: updatedRental });
}
