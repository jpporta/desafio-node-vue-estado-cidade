import { Request, Response } from "express";

import { ListStatesService } from '../../services/state/ListStatesServices'

class ListStatesController {
  static async handle(req: Request, res: Response) {
    let response
    const { page, limit, name, abbreviation } = req.query as { [k: string]: string }
    try {
      response = await ListStatesService.call(page, limit, name, abbreviation)
    } catch (err) {
      if (err.code && err.code < 100) return res.status(500).json({ error: err })
      return res.status(err.code).json({ error: err.msg })
    }
    return res.status(200).json(response)
  }
}

export { ListStatesController }