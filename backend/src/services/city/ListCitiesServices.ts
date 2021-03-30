import { City } from '../../database/schema/City'

class ListCitiesService {
  static async call(pageParam: string = '0', limitParam: string = '10', name: string, stateId: string) {

    let limit, page;

    limit = Number.parseInt(limitParam)
    page = Number.parseInt(pageParam)

    if (isNaN(limit) || isNaN(page)) throw { code: 400, msg: "Invalid pagination" }
    // set filters
    const filters: { [k: string]: any } = {}
    if (name) filters.name = new RegExp(name, 'i')
    if (stateId) filters.stateId = stateId
    // set pagination
    const skip = page * limit
    // query
    let rows
    let count
    try {
      rows = await City.find(filters).skip(skip).limit(limit)
      count = await City.count(filters)
    } catch (err) {
      throw { code: 500, msg: err }
    }
    const response = {
      rows, count
    }
    // return
    return response
  }
}

export { ListCitiesService }