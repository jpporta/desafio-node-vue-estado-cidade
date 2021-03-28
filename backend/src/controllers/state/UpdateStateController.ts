import { Request, Response } from "express";

import { UpdateStateService } from '../../services/state/UpdateStateService'

class UpdateStateController {
  static async handle(req: Request, res: Response) {
    const { name, stateId } = req.body
    const { id } = req.params
    let response
    try {
      response = await UpdateStateService.call(id, name, stateId)
    } catch (err) {
      if (err.code && err.code < 100) return res.status(500).json({ error: err })
      return res.status(err.code).json({ error: err.msg })
    }
    return res.status(200).json(response)
  }
}

export { UpdateStateController }