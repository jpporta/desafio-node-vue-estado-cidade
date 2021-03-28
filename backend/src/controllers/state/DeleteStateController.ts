import { Request, Response } from "express";

import { DeleteStateService } from '../../services/state/DeleteStateService'

class DeleteStateController {
  static async handle(req: Request, res: Response) {
    const { id } = req.params
    try {
      await DeleteStateService.call(id)
    } catch (err) {
      if (err.code && err.code < 100) return res.status(500).json({ error: err })
      return res.status(err.code).json({ error: err.msg })
    }
    return res.sendStatus(202)
  }
}

export { DeleteStateController }