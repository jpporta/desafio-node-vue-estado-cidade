import { State } from '../../database/schema/State'
import { City } from '../../database/schema/City'
class CreateCityService {
  static async call(name: string, stateId: string) {
    // required params
    if (!name || !stateId) throw { code: 400, msg: "name and stateId are required" }
    // check if state exists
    const stateExists = await State.findOne({ _id: stateId })
    if (!stateExists) {
      throw { code: 404, msg: 'State not found' }
    }
    // check if not repeated name
    const cityNameExists = await City.findOne({ name })
    if (cityNameExists) {
      throw { code: 409, msg: 'City already exists' }
    }
    // insert
    const newCity = await City.create({
      name,
      stateId,
    })

    return newCity
  }
}

export { CreateCityService }