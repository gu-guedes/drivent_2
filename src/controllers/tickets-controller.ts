import { Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';


export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  const tickets = await ticketsService.getTicketsTypes();
  res.status(httpStatus.OK).send(tickets);
}

export async function getTicketsByUserId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const tickets = await ticketsService.getUserTicketsByEnrollmentId(userId);
  res.status(httpStatus.OK).send(tickets);
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;

  const newTicket = await ticketsService.createTicket(userId, ticketTypeId);
  res.status(httpStatus.CREATED).send(newTicket);
}