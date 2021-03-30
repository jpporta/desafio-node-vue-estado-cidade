import { CreateStateService } from "../services/state/CreateStateService"
import { DeleteStateService } from "../services/state/DeleteStateService"
import { ListStatesService } from "../services/state/ListStatesServices"
import { SelectOneStateService } from "../services/state/SelectOneStateService"
import { UpdateStateService } from "../services/state/UpdateStateService"

// jest.mock('../database/schema/City.ts', () => {
//   return {
//     City: {
//       findOne: jest.fn(({ name, _id }) => Promise.resolve(
//         name === 'teste' || _id === "605f637a4f9b7402c64ec8b4" ? {
//           "_id": "605f637a4f9b7402c64ec8b4",
//           "name": "teste",
//           "stateId": "605f5d87a6276401a6593090",
//           "createdAt": "2021-03-27T16:55:22.340Z",
//           "updatedAt": "2021-03-28T22:58:09.411Z",
//           "__v": 0
//         } : null
//       )),
//       create: jest.fn(() => Promise.resolve("Created")),
//       deleteOne: jest.fn(() => Promise.resolve("Deleted")),
//       find: (() => ({
//         skip: (skip: number) =>
//         ({
//           limit: jest.fn((limit: number) => Promise.resolve(new Array(limit + skip)))
//         })
//       })),
//       count: jest.fn(() => Promise.resolve(30)),
//       findOneAndUpdate: jest.fn((_id, newCity, _opt) => Promise.resolve(newCity))
//     }
//   }
// })

jest.mock('../database/schema/State.ts', () => {
  return {
    State: {
      findOne: jest.fn(filter => Promise.resolve(
        filter._id === '605f5d87a6276401a6593090' ||
          (filter['$or'] && filter['$or'][0] && filter['$or'][0].name === "São Paulo") ||
          (filter['$or'] && filter['$or'][0] && filter['$or'][0].abbreviation === "SP") ? {
          "_id": "605f5d87a6276401a6593090",
          "name": "São Paulo",
          "abbreviation": "SP",
          "createdAt": "2021-03-27T16:29:59.141Z",
          "updatedAt": "2021-03-27T16:53:13.297Z",
          "__v": 0
        } : null)
      ),
      create: jest.fn(() => Promise.resolve("Created")),
      deleteOne: jest.fn(() => Promise.resolve("Deleted")),
      find: (() => ({
        skip: (skip: number) =>
        ({
          limit: jest.fn((limit: number) => Promise.resolve(new Array(limit + skip)))
        })
      })),
      count: jest.fn(() => Promise.resolve(30)),
      findOneAndUpdate: jest.fn((_id, newState, _opt) => Promise.resolve(newState))
    }
  }
})


describe('Creation', () => {
  test('should return error 400 if name or abbreviation is not given', async () => {
    let response;
    try {
      //@ts-ignore
      await CreateStateService.call(null, null)
    } catch (err) {
      response = err
    }

    return expect(response.code).toEqual(400)
  });

  test('should return error 409 if there is a state with this name', async () => {
    let response;
    try {
      await CreateStateService.call('São Paulo', 'te')
    } catch (err) {
      response = err
    }

    return expect(response.code).toEqual(409)
  })

  test('should return ok if everything passed', async () => {
    let response;
    try {
      response = await CreateStateService.call('teste1', '605f5d87a6276401a6593090')
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
      response = await DeleteStateService.call(undefined)
    }
    catch (err) {
      response = err
    }
    return expect(response.code).toEqual(400)
  })
  test('should give 404 error, if state not found', async () => {
    let response;
    try {
      response = await DeleteStateService.call('123')
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
      response = await DeleteStateService.call('605f5d87a6276401a6593090')
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
      response = await ListStatesService.call('zasdf', 'zxdfcafs', 's', 'c')
    } catch (err) {
      error = err
    }

    return expect(error.code).toEqual(400)
  })
  test('should return success default parameters', async () => {
    let response, error
    try {
      // @ts-ignore
      response = await ListStatesService.call(undefined, undefined, undefined, undefined)

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
      response = await ListStatesService.call('2', '15', undefined, undefined)

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
      response = await SelectOneStateService.call('123')
    }
    catch (err) {
      error = err
    }
    return expect(error.code).toEqual(404)
  })

  test('should give a city if city is found', async () => {
    let response, error;
    try {
      response = await SelectOneStateService.call('605f5d87a6276401a6593090')
    }
    catch (err) {
      error = err
    }
    // @ts-ignore
    return expect(response._id).toEqual('605f5d87a6276401a6593090')
  })
})

describe('Update', () => {
  test('should give 400 if no attribute is given', async () => {
    let response, error;
    try {
      // @ts-ignore
      response = await UpdateStateService.call(undefined, undefined, undefined)
    }
    catch (err) {
      error = err
    }
    // @ts-ignore
    return expect(error.code).toEqual(400)
  })
  test('should give 404 if no state is found', async () => {
    let response, error;
    try {
      // @ts-ignore
      response = await UpdateStateService.call('123', 'teste', '123')
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
      response = await UpdateStateService.call('605f5d87a6276401a6593090', 'testeUpdate', 'tu')
    }
    catch (err) {
      error = err
    }
    //@ts-ignore
    expect(response.abbreviation).toEqual('tu')
    // @ts-ignore
    return expect(response.name).toEqual('testeUpdate')
  })
})