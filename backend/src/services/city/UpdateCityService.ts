import { State } from '../../database/schema/State'
import { City } from '../../database/schema/City'
class UpdateCityService {
  static async call(id: string, name: string, stateId: string) {
    // check if at least one field to update
    if (!name && !stateId) throw { code: 400, msg: "at least name or stateId should be sent" }
    // check if updating item exists
    const cityExists = await City.findOne({ _id: id })
    if (!cityExists) throw { code: 404, msg: 'City not found' }
    // if state change, it should exist
    if (stateId) {
      const stateExists = await State.findOne({ _id: stateId })
      // check if state exists
      if (!stateExists) {
        throw { code: 404, msg: 'State not found' }
      }
    }
    // build update body
    const newFields: { [k: string]: any } = {}
    if (name) newFields.name = name
    if (stateId) newFields.stateId = stateId

    // update entry
    const updatedCity = await City.findOneAndUpdate({ _id: id }, newFields, { new: true })

    return updatedCity
  }
}

export { UpdateCityService }