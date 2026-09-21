export interface Ticket {
  id: number;
  case_id: string;
  subject: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  created_at: string;
  name?: string;
  email?: string;
  phone?: string;
}

export interface Reply {
  id: number;
  ticket_id: number;
  replied_by: number;
  replied_by_type: "USER" | "ADMIN";
  message: string;
  is_admin: boolean;
  attachment?: string;
  created_at: string;
}

export interface CreateTicketData {
  name?: string;
  email?: string;
  phone?: string;
  subject: string;
  message: string;
  user_type: "ECOM_USER";
  user_id: string;
}

export interface ReplyData {
  message: string;
  attachment?: string;
}

export interface TicketsResponse {
  success: boolean;
  tickets: Ticket[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface TicketResponse {
  success: boolean;
  ticket: Ticket;
  replies: Reply[];
}
