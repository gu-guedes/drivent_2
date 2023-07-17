import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';
import { PaymentBody } from '@/protocols';

type RequestWithParams = AuthenticatedRequest & { query: { ticketId: number } };
type BodyPay = PaymentBody & RequestWithParams;

export async function getPaymentbyTicketId(req: RequestWithParams, res: Response) {
  const ticketId = req.query.ticketId;

  if (!ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  const { userId } = req;
  const payment = await paymentsService.getPaymentbyTicketId(Number(ticketId), userId);

  res.status(httpStatus.OK).send(payment);
}

export async function createPayment(req: BodyPay, res: Response) {
  const { body } = req;
  const { userId } = req;
  const payment = await paymentsService.createPayment(body, userId);
  res.status(httpStatus.OK).send(payment);
}