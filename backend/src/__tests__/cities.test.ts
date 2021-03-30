import { CreateCityService } from '../services/city/CreateCityService'
import { DeleteCityService } from '../services/city/DeleteCityService'
import { ListCitiesService } from '../services/city/ListCitiesServices'
import { SelectOneCityService } from '../services/city/SelectOneCityService'
import { UpdateCityService } from '../services/city/UpdateCityService'

jest.mock('../database/schema/City.ts', () => {
  return {
    City: {
      findOne: jest.fn(({ name, _id }) => Promise.resolve(
        name === 'teste' || _id === "605f637a4f9b7402c64ec8b4" ? {
          "_id": "605f637a4f9b7402c64ec8b4",
          "name": "teste",
          "stateId": "605f5d87a6276401a6593090",
          "createdAt": "2021-03-27T16:55:22.340Z",
          "updatedAt": "2021-03-28T22:58:09.411Z",
          "__v": 0
        } : null
      )),
      create: jest.fn(() => Promise.resolve("Created")),
      deleteOne: jest.fn(() => Promise.resolve("Deleted")),
      find: (() => ({
        skip: (skip: number) =>
        ({
          limit: jest.fn((limit: number) => Promise.resolve(new Array(limit + skip)))
        })
      })),
      count: jest.fn(() => Promise.resolve(30)),
      findOneAndUpdate: jest.fn((_id, newCity, _opt) => Promise.resolve(newCity))
    }
  }
})

jest.mock('../database/schema/State.ts', () => {
  return {
    State: {
      findOne: jest.fn(({ _id }) => Promise.resolve(
        _id === '605f5d87a6276401a6593090' ? {
          "_id": "605f5d87a6276401a6593090",
          "name": "São Paulo",
          "abbreviation": "SP",
          "createdAt": "2021-03-27T16:29:59.141Z",
          "updatedAt": "2021-03-27T16:53:13.297Z",
          "__v": 0
        } : null)),
    }
  }
})


describe('Creation', () => {
  test('should return error 400 if name or stateId is not given', async () => {
    let response;
    try {
      //@ts-ignore
      await CreateCityService.call(null, null)
    } catch (err) {
      response = err
    }

    return expect(response.code).toEqual(400)
  });

  test('should return error 404 stateId does not exist', async () => {
    let response;
    try {
      await CreateCityService.call('teste', '123')
    } catch (err) {
      response = err
    }

    return expect(response.code).toEqual(404)
  })

  test('should return error 409 if there is a city with this name', async () => {
    let response;
    try {
      await CreateCityService.call('teste', '605f5d87a6276401a6593090')
    } catch (err) {
      response = err
    }

    return expect(response.code).toEqual(409)
  })

  test('should return ok if everything passed', async () => {
    let response;
    try {
      response = await CreateCityService.call('teste1', '605f5d87a6276401a6593090')
    } catch (err) {
      response = err
    }

    return expect(response).toEqual("Created")
  })
})

describe('Deletion', () => {
  test('should give 400 error, if no id is passed', async () => {
    let response;
    try {
      // @ts-ignore
      response = await DeleteCityService.call(undefined)
    }
    catch (err) {
      response = err
    }
    return expect(response.code).toEqual(400)
  })
  test('should give 404 error, if city not found', async () => {
    let response;
    try {
      response = await DeleteCityService.call('123')
    }
    catch (err) {
      response = err
    }
    return expect(response.code).toEqual(404)
  })
  test('should be ok if everything is correct', async () => {
    let response;
    let error;
    try {
      response = await DeleteCityService.call('605f637a4f9b7402c64ec8b4')
    }
    catch (err) {
      error = err
    }
    expect(response).toEqual(undefined)
    return expect(error).toEqual(undefined)
  })
})

describe('List', () => {
  test('should give 400 error if invalid parameters', async () => {
    let response
    let error
    try {
      response = await ListCitiesService.call('zasdf', 'zxdfcafs', 's', 'c')
    } catch (err) {
      error = err
    }

    return expect(error.code).toEqual(400)
  })
  test('should return success default parameters', async () => {
    let response, error
    try {
      // @ts-ignore
      response = await ListCitiesService.call(undefined, undefined, undefined, undefined)

    } catch (err) {
      error = err
    }
    // @ts-ignore
    return expect(response.rows).toHaveLength(10)
  })

  test('should return success with custom parameters', async () => {
    let response, error
    try {
      // @ts-ignore
      response = await ListCitiesService.call('2', '15', undefined, undefined)

    } catch (err) {
      error = err
    }

    // @ts-ignore
    return expect(response.rows).toHaveLength(15 * 2 /*skip*/ + 15 /*limit*/)
  })
})

describe('Get one', () => {
  test('should give 404 if city not found', async () => {
    let response, error;
    try {
      response = await SelectOneCityService.call('123')
    }
    catch (err) {
      error = err
    }
    return expect(error.code).toEqual(404)
  })

  test('should give a city if city is found', async () => {
    let response, error;
    try {
      response = await SelectOneCityService.call('605f637a4f9b7402c64ec8b4')
    }
    catch (err) {
      error = err
    }
    // @ts-ignore
    return expect(response._id).toEqual('605f637a4f9b7402c64ec8b4')
  })
})

describe('Update', () => {
  test('should give 400 if no attribute is given', async () => {
    let response, error;
    try {
      // @ts-ignore
      response = await UpdateCityService.call(undefined, undefined, undefined)
    }
    catch (err) {
      error = err
    }
    // @ts-ignore
    return expect(error.code).toEqual(400)
  })
  test('should give 404 if no city is found', async () => {
    let response, error;
    try {
      // @ts-ignore
      response = await UpdateCityService.call('123', 'teste', '123')
    }
    catch (err) {
      error = err
    }
    // @ts-ignore
    return expect(error.code).toEqual(404)
  })
  test('should give 404 if no state is found', async () => {
    let response, error;
    try {
      // @ts-ignore
      response = await UpdateCityService.call('605f637a4f9b7402c64ec8b4', 'teste', '123')
    }
    catch (err) {
      error = err
    }
    // @ts-ignore
    return expect(error.code).toEqual(404)
  })
  test('should succeed if everything is in order', async () => {
    let response, error;
    try {
      // @ts-ignore
      response = await UpdateCityService.call('605f637a4f9b7402c64ec8b4', 'testeUpdate', '605f5d87a6276401a6593090')
    }
    catch (err) {
      error = err
    }
    // @ts-ignore
    return expect(response.name).toEqual('testeUpdate')
  })
})