import { State } from '../../database/schema/State'


class ListStatesService {
  static async call(pageParam: string = '0', limitParam: string = '10', name: string, abbreviation: string) {
    const limit = Number.parseInt(limitParam)
    const page = Number.parseInt(pageParam)
    if (limit === undefined || page === undefined) throw { code: 400, msg: "Invalid pagination" }
    // set filters
    const filters: { [k: string]: any } = {}
    if (name) filters.name = new RegExp(name, 'i')
    if (abbreviation) filters.abbreviation = new RegExp(abbreviation, 'i')
    // set pagination
    const skip = page * limit
    // query
    let rows, count
    try {
      rows = await State.find(filters).skip(skip).limit(limit)
      count = await State.count(filters)
    } catch (err) {
      throw { code: 500, msg: err }
    }
    // return
    const response = { rows, count }
    return response
  }
}

export { ListStatesService }