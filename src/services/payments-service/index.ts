import { unauthorizedError } from '@/errors';
import ticketsService from '../tickets-service';
import { PaymentBody } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentsRepository from '@/repositories/payments-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getPaymentbyTicketId(ticketId: number, userId: number) {
  const ticket = await ticketsService.getTicketByTicketId(ticketId);
  const payment = await paymentsRepository.getPaymentbyTicketId(ticketId);
  const enrollment = await enrollmentRepository.getUserEnrollment(userId);

  if (enrollment.id !== ticket.enrollmentId) {
    throw unauthorizedError();
  }
  return payment;
}

async function createPayment(body: PaymentBody, userId: number) {
  const ticket = await ticketsService.getTicketByTicketId(body.ticketId);
  await getPaymentbyTicketId(ticket.id, userId); 
  const ticketType = await ticketsService.getTicketsTypeById(ticket.ticketTypeId);
  const payment = await paymentsRepository.createPayment(body.cardData, body.ticketId, ticketType.price);
  await ticketsRepository.updateTicket(body.ticketId);
  return payment;
}
const paymentsService = {
  getPaymentbyTicketId,
  createPayment,
};

export default paymentsService;