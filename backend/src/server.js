import { initDatabase } from './config/database.js'
import { env } from './config/env.js'
import { createApp } from './app.js'
import { seedIfEmpty } from './db/seed.js'

initDatabase()
seedIfEmpty()

const app = createApp()

app.listen(env.port, () => {
  console.log(`API Catálogo Huaraz en http://localhost:${env.port}`)
})
