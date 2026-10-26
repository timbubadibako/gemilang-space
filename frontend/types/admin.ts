export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'backlog' | 'in_progress' | 'review' | 'done';
export type PayoutStatus = 'pending' | 'ready' | 'paid';
export type ClientPaymentStatus = 'unpaid' | 'dp_50' | 'paid';

export interface Ticket {
  id: string;
  projectSlug: string;
  projectName: string;
  clientName: string;
  moduleName: string;
  description: string;
  points: number;
  estHours: number;
  // Financials: Client Billable vs Developer Payout
  clientPrice: number;
  devPayout: number;
  assignedDev: string;
  devRole: string;
  priority: TicketPriority;
  status: TicketStatus;
  clientPaymentStatus: ClientPaymentStatus;
  payoutStatus: PayoutStatus;
  createdAt: string;
  dueDate?: string;
}

export interface DeveloperRateConfig {
  devName: string;
  role: string;
  hourlyRate: number;
  pointRate: number;
}

export interface CMSContentState {
  siteTitle: string;
  contactWhatsApp: string;
  contactEmail: string;
  activeAnnouncement?: string;
}
