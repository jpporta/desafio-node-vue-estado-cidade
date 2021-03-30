import { State } from '../../database/schema/State'
class UpdateStateService {
  static async call(id: string, name: string, abbreviation: string) {
    // check if at least one field to update
    if (!name && !abbreviation) throw { code: 400, msg: "at least name or abbreviation should be sent" }
    // check if updating item exists
    let stateExists
    try {
      stateExists = await State.findOne({ _id: id })
    } catch (err) {
      console.log('update', err)
      throw { code: 500, msg: err }
    }
    if (!stateExists) throw { code: 404, msg: 'State not found' }
    // build update body
    const newFields: { [k: string]: any } = {}
    if (name) newFields.name = name
    if (abbreviation) newFields.abbreviation = abbreviation

    // update entry
    try {
      const updatedState = await State.findOneAndUpdate({ _id: id }, newFields, { new: true })

      return updatedState
    } catch (err) {
      throw { code: 500, msg: err }
    }
  }
}

export { UpdateStateService }