import { State } from '../../database/schema/State'

class SelectOneStateService {
  static async call(id: string) {
    const state = await State.findOne({ _id: id })
    if (!state) throw { code: 404, msg: 'State not found' }
    return state
  }
}

export { SelectOneStateService }