import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createPayment, getPaymentbyTicketId } from '@/controllers/payments-controller';
import { paymentSchema } from '@/schemas/payments-schemas';

const paymentsRouter = Router();

paymentsRouter
.all('/*', authenticateToken)
.get('/', getPaymentbyTicketId)
.post('/process', validateBody(paymentSchema), createPayment);

export { paymentsRouter }; 