import { Request, Response } from "express";

import { Cache } from '../../database/cache'
import { ListStatesService } from '../../services/state/ListStatesServices'

class ListStatesController {
  static async handle(req: Request, res: Response) {
    let response
    const { page, limit, name, abbreviation } = req.query as { [k: string]: string }
    try {
      response = await Cache.get(`state-list-${page}-${limit}-${name}-${abbreviation}`)
      if (!response) {
        response = await ListStatesService.call(page, limit, name, abbreviation)
        await Cache.set(`state-list-${page}-${limit}-${name}-${abbreviation}`, response, 60)
      }
    } catch (err) {
      if (err.code && err.code < 100) return res.status(500).json({ error: err })
      return res.status(err.code).json({ error: err.msg })
    }
    return res.status(200).json(response)
  }
}

export { ListStatesController }