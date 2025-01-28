import connection from '../database/database.js';

export async function findAllCustomers() {
  const result = await connection.query('SELECT * FROM customers');
  return result.rows;
}

export async function findCustomerById(id) {
  const result = await connection.query('SELECT * FROM customers WHERE id = $1', [id]);
  return result.rows[0];
}

export async function findCustomerByCpf(cpf) {
  const result = await connection.query('SELECT * FROM customers WHERE cpf = $1', [cpf]);
  return result.rows[0];
}

export async function insertCustomer(name, phone, cpf) {
  await connection.query(
    'INSERT INTO customers (name, phone, cpf) VALUES ($1, $2, $3)',
    [name, phone, cpf]
  );
}