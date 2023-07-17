import ticketsRepository from '@/repositories/tickets-repository';
import enrollmentsService from '../enrollments-service';
import { notFoundError } from '@/errors';


async function getTicketsTypes() {
  return await ticketsRepository.getTicketsTypes();
}

async function getUserTicketsByEnrollmentId(userId: number) {
  const userEnrollment = await enrollmentsService.getUserEnrollment(userId);
  const tickets = await ticketsRepository.getUserTicketsByEnrollmentId(userEnrollment.id);

  if (!tickets) {
    throw notFoundError();
  }
  return tickets;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const userEnrollment = await enrollmentsService.getUserEnrollment(userId);
  await ticketsRepository.createTicket(userEnrollment.id, ticketTypeId);
  return await getUserTicketsByEnrollmentId(userId);
}

async function getTicketByTicketId(ticketId: number) {
  const ticket = await ticketsRepository.getTicketByTicketId(ticketId);
  if (!ticket) {
    throw notFoundError();
  }
  return ticket;
}

async function getTicketsTypeById(id: number) {
  return await ticketsRepository.getTicketTypeById(id);
}

const ticketsService = {
  getTicketsTypes,
  getUserTicketsByEnrollmentId,
  createTicket,
  getTicketByTicketId,
  getTicketsTypeById,
};

export default ticketsService;