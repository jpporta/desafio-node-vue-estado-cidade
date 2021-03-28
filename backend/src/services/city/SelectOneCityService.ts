import { City } from '../../database/schema/City'

class SelectOneCityService {
  static async call(id: string) {
    const city = await City.findOne({ _id: id })
    if (!city) throw { code: 404, msg: 'City not found' }
    return city
  }
}

export { SelectOneCityService }