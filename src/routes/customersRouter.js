import { Router } from 'express';
import * as customerController from '../controllers/customerController.js';
import { asyncError } from '../middlewares/asyncErrorMiddleware.js';

const customersRouter = Router();

customersRouter.get('/', asyncError(customerController.listCustomers));
customersRouter.get('/:id', asyncError(customerController.getCustomerById));
customersRouter.post('/', asyncError(customerController.createCustomer));

export default customersRouter;