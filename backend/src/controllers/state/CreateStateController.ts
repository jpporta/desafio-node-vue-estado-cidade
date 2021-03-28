import { Request, Response } from "express";

import { CreateStateService } from '../../services/state/CreateStateService'

class CreateStateController {
  static async handle(req: Request, res: Response) {
    const { name, abbreviation } = req.body
    let response
    try {
      response = await CreateStateService.call(name, abbreviation)
    } catch (err) {
      if (err.code && err.code < 100) return res.status(500).json({ error: err })
      return res.status(err.code).json({ error: err.msg })
    }
    return res.status(201).json(response)
  }
}

export { CreateStateController }