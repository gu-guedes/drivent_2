import { prisma } from '@/config';

async function getTicketsTypes() {
  return await prisma.ticketType.findMany();
}

async function getUserTicketsByEnrollmentId(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    }
   
})
}

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  return await prisma.ticket.create({
    data: {
      status: 'RESERVED',
      enrollmentId,
      ticketTypeId,
      updatedAt: new Date(Date.now()),
    },
  });
}

async function getTicketByTicketId(id: number) {
  return await prisma.ticket.findUnique({
    where: {
      id,
    },
  });
}

async function getTicketTypeById(id: number) {
  return await prisma.ticketType.findFirst({
    where: {
      id,
    },
  });
}

async function updateTicket(id: number) {
  await prisma.ticket.update({
    data: {
      status: 'PAID',
    },
    where: {
      id,
    },
  });
}

const ticketsRepository = {
  getTicketsTypes,
  getUserTicketsByEnrollmentId,
  createTicket,
  getTicketByTicketId,
  updateTicket,
  getTicketTypeById,
};

export default ticketsRepository;