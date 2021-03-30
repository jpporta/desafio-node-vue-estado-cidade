import { Request, Response } from "express";
import { Cache } from '../../database/cache'

import { SelectOneStateService } from '../../services/state/SelectOneStateService'

class SelectOneStateController {
  static async handle(req: Request, res: Response) {
    let response
    const { id } = req.params
    try {
      response = await Cache.get(`state-${id}`)
      if (!response) {
        response = await SelectOneStateService.call(id)
        await Cache.set(`state-${id}`, response, 60)
      }
    } catch (err) {
      if (err.code && err.code < 100) return res.status(500).json({ error: err })
      return res.status(err.code).json({ error: err.msg })
    }
    return res.status(200).json(response)
  }
}

export { SelectOneStateController }