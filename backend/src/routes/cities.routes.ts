import { Router } from 'express'

import { CreateCityController } from '../controllers/city/CreateCityController'
import { ListCitiesController } from '../controllers/city/ListCitiesController'
import { DeleteCityController } from '../controllers/city/DeleteCityController'
import { UpdateCityController } from '../controllers/city/UpdateCityController'
import { SelectOneCityController } from '../controllers/city/SelectOneCityController'


const cityRoutes = Router()

cityRoutes.post('/', (req, res) => CreateCityController.handle(req, res))

cityRoutes.get('/', (req, res) => ListCitiesController.handle(req, res))

cityRoutes.delete('/:id', (req, res) => DeleteCityController.handle(req, res))

cityRoutes.put('/:id', (req, res) => UpdateCityController.handle(req, res))

cityRoutes.get('/:id', (req, res) => SelectOneCityController.handle(req, res))

export { cityRoutes }
