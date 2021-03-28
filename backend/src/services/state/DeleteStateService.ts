import { State } from '../../database/schema/State'

class DeleteStateService {
  static async call(id: string) {
    // required params
    if (!id) throw { code: 400, msg: "id is required" }
    // check if state exists
    const stateExists = await State.findOne({ _id: id })
    if (!stateExists) {
      throw { code: 404, msg: 'State not found' }
    }
    // insert
    await State.deleteOne({ _id: id })
  }
}

export { DeleteStateService }