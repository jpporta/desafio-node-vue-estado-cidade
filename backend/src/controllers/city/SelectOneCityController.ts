import { Request, Response } from "express";

import { SelectOneCityService } from '../../services/city/SelectOneCityService'

class SelectOneCityController {
  static async handle(req: Request, res: Response) {
    let response
    const { id } = req.params
    try {
      response = await SelectOneCityService.call(id)
    } catch (err) {
      if (err.code && err.code < 100) return res.status(500).json({ error: err })
      return res.status(err.code).json({ error: err.msg })
    }
    return res.status(200).json(response)
  }
}

export { SelectOneCityController }