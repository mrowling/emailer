export interface IEmailOptions {
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  text: string;
}

export interface IResponse {
  success: boolean;
  status: number;
  serviceProvider: string;
}
