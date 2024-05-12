import { Request, Response } from "express";

class NagadPayment {
  constructor() {}
  async store(req: Request, res: Response) {
    return res.json();
  }
}

export default new NagadPayment();
