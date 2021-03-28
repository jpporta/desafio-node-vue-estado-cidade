import { Router } from 'express'

import { CreateStateController } from '../controllers/state/CreateStateController'
import { ListStatesController } from '../controllers/state/ListStatesController'
import { DeleteStateController } from '../controllers/state/DeleteStateController'
import { UpdateStateController } from '../controllers/state/UpdateStateController'
import { SelectOneStateController } from '../controllers/state/SelectOneStateController'


const stateRoutes = Router()

stateRoutes.post('/', (req, res) => CreateStateController.handle(req, res))

stateRoutes.get('/', (req, res) => ListStatesController.handle(req, res))

stateRoutes.delete('/:id', (req, res) => DeleteStateController.handle(req, res))

stateRoutes.put('/:id', (req, res) => UpdateStateController.handle(req, res))

stateRoutes.get('/:id', (req, res) => SelectOneStateController.handle(req, res))

export { stateRoutes }
