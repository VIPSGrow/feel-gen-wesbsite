import serverCallFuction from "./constantFunction";
import type {
  CreateTicketData,
  ReplyData,
  TicketResponse,
  TicketsResponse,
} from "./types/Ticket";

export const raiseTicket = async (data: CreateTicketData): Promise<any> => {
  return serverCallFuction("POST", "api/support/raise-ticket", data as any);
};

export const getMyTickets = async (
  page: number = 1,
  limit: number = 10,
): Promise<any> => {
  return serverCallFuction(
    "GET",
    `api/support/my-tickets?page=${page}&limit=${limit}`,
  );
};

export const getTicketDetails = async (caseId: string): Promise<any> => {
  return serverCallFuction("GET", `api/support/${caseId}`);
};

export const replyToTicket = async (
  caseId: string,
  data: ReplyData,
): Promise<any> => {
  return serverCallFuction("POST", `api/support/${caseId}/reply`, data as any);
};
