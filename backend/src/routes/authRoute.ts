
import { Router } from 'express'
import { authController } from '../container'
import { authenticate } from '../middlewares/authenticate'

const router = Router()

router.post('/register', authController.register)
router.post('/register-with-template', authController.registerWithTemplate)
router.post('/login', authController.login)
router.get('/profile', authenticate, authController.getProfile)
router.patch('/profile', authenticate, authController.updateProfile)
router.patch('/avatar', authenticate, authController.updateAvatar)
router.patch('/email', authenticate, authController.changeEmail)
router.patch('/password', authenticate, authController.changePassword)
router.post('/deactivate', authenticate, authController.deactivateAccount)
router.delete('/account', authenticate, authController.deleteAccount)

export default router;