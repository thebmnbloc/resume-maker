
import { AuthService } from '../services/authService'
import { Request, Response, NextFunction } from 'express'

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // REGISTRATION
  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { user, token } = await this.authService.register(req.body)
        res.status(201).json({
          success: true,
          data: { user, token },
          message: 'User registered successfully',
        })
        } catch (error) {
          next(error)
        }
  }

  registerWithTemplate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userData, templateData } = req.body
      const user = await this.authService.registerWithTemplate(userData, templateData)
      res.status(201).json({
        success: true,
        data: user,
        message: 'User registered with template successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  // ─── AUTHENTICATION ───
 login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body
    const { user, token } = await this.authService.login(email, password)
    res.status(200).json({
      success: true,
      data: { user, token },
      message: 'Login successful',
    })
    } catch (error) {
      next(error)
    }
  }

  getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }
      const user = await this.authService.getUserWithTemplates(userId)
      res.status(200).json({ success: true, data: user })
    } catch (error) {
      next(error)
    }
  }

  // ─── PROFILE ───
  updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }
      const user = await this.authService.updateProfile(userId, req.body)
      res.status(200).json({
        success: true,
        data: user,
        message: 'Profile updated successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  updateAvatar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }
      const { avatarUrl } = req.body
      const user = await this.authService.updateAvatar(userId, avatarUrl)
      res.status(200).json({
        success: true,
        data: user,
        message: 'Avatar updated successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  changeEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }
      const { newEmail } = req.body
      const user = await this.authService.changeEmail(userId, newEmail)
      res.status(200).json({
        success: true,
        data: user,
        message: 'Email updated successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }
      const { hashedPassword } = req.body
      const user = await this.authService.updatePassword(userId, hashedPassword)
      res.status(200).json({
        success: true,
        data: user,
        message: 'Password updated successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  // ─── STATUS ───
  deactivateAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }
      const user = await this.authService.deactivateUser(userId)
      res.status(200).json({
        success: true,
        data: user,
        message: 'Account deactivated',
      })
    } catch (error) {
      next(error)
    }
  }

  deleteAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }
      await this.authService.deleteUser(userId)
      res.status(200).json({
        success: true,
        message: 'Account deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  }
}