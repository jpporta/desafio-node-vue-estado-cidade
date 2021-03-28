import { Schema, model, Types } from 'mongoose'

const CitySchema = new Schema({
  name: String,
  stateId: { type: Types.ObjectId, ref: 'State' },
  createdAt: Date,
  updatedAt: Date,
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
})

const City = model('City', CitySchema)

export { City }