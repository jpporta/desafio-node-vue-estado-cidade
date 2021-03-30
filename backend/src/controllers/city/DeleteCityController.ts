import { Request, Response } from "express";
import { Cache } from '../../database/cache'

import { DeleteCityService } from '../../services/city/DeleteCityService'

class DeleteCityController {
  static async handle(req: Request, res: Response) {
    const { id } = req.params
    try {
      await DeleteCityService.call(id)
      await Cache.delete('city-list-*')
      await Cache.delete(`city-${id}`)
    } catch (err) {
      if (!err.code || (err.code && err.code < 100)) return res.status(500).json({ error: err })
      return res.status(err.code).json({ error: err.msg })
    }
    return res.sendStatus(202)
  }
}

export { DeleteCityController }