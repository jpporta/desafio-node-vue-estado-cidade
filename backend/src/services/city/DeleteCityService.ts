import { City } from '../../database/schema/City'

class DeleteCityService {
  static async call(id: string) {
    // required params
    if (!id) throw { code: 400, msg: "id is required" }
    // check if state exists
    const cityExists = await City.findOne({ _id: id })
    if (!cityExists) {
      throw { code: 404, msg: 'City not found' }
    }
    // insert
    await City.deleteOne({ _id: id })
  }
}

export { DeleteCityService }