import { Router } from 'express'

import { cityRoutes } from './cities.routes'
import { stateRoutes } from './states.routes'

import { AuthMiddleware } from '../middlewares/auth'

const routes = Router()

routes.use(AuthMiddleware.validateApiKey)

routes.use('/cities', cityRoutes)
routes.use('/states', stateRoutes)

export { routes }
