import * as customerService from '../services/customerService.js';

export async function createCustomer(req, res, next) {
  const { name, phone, cpf } = req.body;
  await customerService.createCustomer(name, phone, cpf);
  res.status(201).json({ message: 'Cliente cadastrado com sucesso!' });
}

export async function listCustomers(req, res, next) {
  const customers = await customerService.listCustomers();
  res.status(200).json(customers);
}

export async function getCustomerById(req, res, next) {
  const { id } = req.params;
  const customer = await customerService.getCustomerById(Number(id));
  res.status(200).json(customer);
}