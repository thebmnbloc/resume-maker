// import { prisma } from './config/db';
// import { PrismaClient } from './generated/prisma/client'
import { AuthRepository } from './repositories/authRepository'
import { TemplatesRepository } from './repositories/templatesRepository'
import { AdminRepository } from './repositories/adminRepository'
import { AuthService } from './services/authService'
import { TemplatesService } from './services/templatesService'
import { AdminService } from './services/adminService'
import { AuthController } from './controllers/authController'
import { TemplatesController } from './controllers/templatesController'
import { AdminController } from './controllers/adminController'


// Repositories
const authRepository = new AuthRepository()
const templatesRepository = new TemplatesRepository()
const adminRepository = new AdminRepository()

// Services
const authService = new AuthService(authRepository)
const templateService = new TemplatesService(templatesRepository)
const adminService = new AdminService(adminRepository, authRepository, templatesRepository)

// Controllers
export const authController = new AuthController(authService)
export const templatesController = new TemplatesController(templateService)
export const adminController = new AdminController(adminService)