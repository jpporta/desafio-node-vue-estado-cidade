import { Request, Response } from "express";
import { Cache } from '../../database/cache'

import { CreateCityService } from '../../services/city/CreateCityService'

class CreateCityController {
  static async handle(req: Request, res: Response) {
    const { name, stateId } = req.body
    let response
    try {
      response = await CreateCityService.call(name, stateId)
      await Cache.delete('city-list-*')
      await Cache.set(`city-${response._id}`, response, 60)
    } catch (err) {
      if (err.code && err.code < 100) return res.status(500).json({ error: err })
      return res.status(err.code).json({ error: err.msg })
    }
    return res.status(201).json(response)
  }
}

export { CreateCityController }