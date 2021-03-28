import { State } from '../../database/schema/State'
class CreateStateService {
  static async call(name: string, abbreviation: string) {
    // required params
    if (!name || !abbreviation) throw { code: 400, msg: "name and abbreviation are required" }
    // check if not repeated name
    const stateExists = await State.findOne({ $or: [{ name }, { abbreviation }] })
    if (stateExists) {
      throw { code: 409, msg: 'State already exists' }
    }
    // insert
    const newState = await State.create({
      name,
      abbreviation,
    })

    return newState
  }
}

export { CreateStateService }