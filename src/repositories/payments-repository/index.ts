import { prisma } from '@/config';
import { CardData } from '@/protocols';

async function getPaymentbyTicketId(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function createPayment(card: CardData, ticketId: number, value: number) {
  const cardNumberStr = card.number.toString();
  const lastDigits = cardNumberStr.substring(cardNumberStr.length - 4, cardNumberStr.length);
  return await prisma.payment.create({
    data: {
      updatedAt: new Date(Date.now()),
      cardIssuer: card.issuer,
      cardLastDigits: lastDigits,
      value,
      createdAt: new Date(Date.now()),
      ticketId,
    },
  });
}
const paymentsRepository = {
  getPaymentbyTicketId,
  createPayment,
};

export default paymentsRepository;