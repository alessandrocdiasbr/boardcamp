import * as customerRepository from '../repositories/customerRepository.js';
import { customerSchema } from '../schemas/customerSchema.js';
import { BadRequestError, NotFoundError, ConflictError } from '../errors/errors.js';

export async function listCustomers() {
  return await customerRepository.findAllCustomers();
}

export async function getCustomerById(id) {
  const customer = await customerRepository.findCustomerById(id);
  if (!customer) throw NotFoundError('Customer not found');
  return customer;
}

export async function createCustomer(name, phone, cpf) {
  const { error } = customerSchema.validate({ name, phone, cpf });
  if (error) throw BadRequestError(error.details[0].message);

  const existingCustomer = await customerRepository.findCustomerByCpf(cpf);
  if (existingCustomer) throw ConflictError('CPF already exists');

  await customerRepository.insertCustomer(name, phone, cpf);
}
