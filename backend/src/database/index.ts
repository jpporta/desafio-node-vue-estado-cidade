import mongoose from 'mongoose'

mongoose.connect('mongodb://root:pass@localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true });

const { connection } = mongoose

connection.once('open', () => console.log('Database connected successfully'))
