import { Request, Response } from "express";

import { ListCitiesService } from '../../services/city/ListCitiesServices'

class ListCitiesController {
  static async handle(req: Request, res: Response) {
    let response
    const { page, limit, name, stateId } = req.query as { [k: string]: string }
    try {
      response = await ListCitiesService.call(page, limit, name, stateId)
    } catch (err) {
      if (err.code && err.code < 100) return res.status(500).json({ error: err })
      return res.status(err.code).json({ error: err.msg })
    }
    return res.status(200).json(response)
  }
}

export { ListCitiesController }