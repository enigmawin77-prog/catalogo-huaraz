import { closeDatabase, initDatabase } from '../config/database.js'
import { env } from '../config/env.js'
import { authService } from '../services/auth.service.js'

function arg(name) {
  const prefix = `--${name}=`
  const found = process.argv.find((item) => item.startsWith(prefix))
  return found ? found.slice(prefix.length) : ''
}

const email = arg('email') || env.adminEmail
const password = arg('password') || env.adminPassword

if (!email || !password) {
  console.error('Uso: npm run create-admin -- --email=admin@local --password=TuClaveSegura')
  console.error('También puedes definir ADMIN_EMAIL y ADMIN_PASSWORD en backend/.env')
  process.exit(1)
}

initDatabase()

try {
  const user = await authService.createAdmin(email, password)
  console.log(`Administrador creado: ${user.email} (id ${user.id})`)
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
} finally {
  closeDatabase()
}
