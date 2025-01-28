import { Router } from 'express';
import * as rentalController from '../controllers/rentalController.js';
import { asyncError } from '../middlewares/asyncErrorMiddleware.js';

const rentalsRouter = Router();

rentalsRouter.get('/', asyncError(rentalController.listRentals));        
rentalsRouter.post('/', asyncError(rentalController.createRental));      
rentalsRouter.post('/:id/return', asyncError(rentalController.returnRental)); 
rentalsRouter.delete('/:id', asyncError(rentalController.deleteRental));  
rentalsRouter.put('/:id', asyncError(rentalController.updateRental));   

export default rentalsRouter;
