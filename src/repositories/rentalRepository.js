import connection from '../database/database.js';

export async function findAllRentals() {
  const query = `
    SELECT 
      rentals.*, 
      customers.name AS customer_name, 
      games.name AS game_name
    FROM rentals
    JOIN customers ON rentals."customerId" = customers.id
    JOIN games ON rentals."gameId" = games.id
  `;
  const result = await connection.query(query);
  return result.rows.map(row => ({
    id: row.id,
    customerId: row.customerId,
    gameId: row.gameId,
    rentDate: row.rentDate,
    daysRented: row.daysRented,
    returnDate: row.returnDate,
    originalPrice: row.originalPrice,
    delayFee: row.delayFee,
    customer: { id: row.customerId, name: row.customer_name },
    game: { id: row.gameId, name: row.game_name }
  }));
}

export async function findRentalById(id) {
  const result = await connection.query('SELECT * FROM rentals WHERE id = $1', [id]);
  return result.rows[0];
}

export async function insertRental(customerId, gameId, rentDate, daysRented, originalPrice) {
  await connection.query(
    'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice", "returnDate", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [customerId, gameId, rentDate, daysRented, originalPrice, null, null]
  );
}

export async function countOpenRentalsByGameId(gameId) {
  const result = await connection.query(
    'SELECT COUNT(*) FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL',
    [gameId]
  );
  return parseInt(result.rows[0].count);
}

export async function returnRental(rentalId, returnDate, delayFee) {
  await connection.query(
    'UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3',
    [returnDate, delayFee, rentalId]
  );
}

export async function deleteRental(rentalId) {
  await connection.query('DELETE FROM rentals WHERE id = $1', [rentalId]);
}

export async function updateRental(rentalId, daysRented, returnDate) {
  const query = `
    UPDATE rentals 
    SET "daysRented" = $1, "returnDate" = $2
    WHERE id = $3
    RETURNING *;  -- Retorna os dados atualizados do aluguel
  `;
  const result = await connection.query(query, [daysRented, returnDate, rentalId]);

  return result.rows[0];
}
