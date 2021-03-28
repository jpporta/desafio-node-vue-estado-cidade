import express from 'express'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'

import { routes } from './routes'
import swaggerFile from './swagger.json'

import './database'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/api', routes)

app.listen(3333, () => console.log('Server is running!'))
