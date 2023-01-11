import { SessionData } from "express-session";

declare module "express-session" {
  export interface SessionData {
    user: { email: any; firstName: any; lastName: any, id:any };
    authenticated: boolean
    failedLoggins: any
  }
}
