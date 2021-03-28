import { Schema, model, Types } from 'mongoose'

const StateSchema = new Schema({
  name: String,
  abbreviation: String,
  createdAt: Date,
  updatedAt: Date,
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
})

const State = model('State', StateSchema)

export { State }