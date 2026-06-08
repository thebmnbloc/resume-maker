// src/controllers/adminController.ts
import { AdminService } from '../services/adminService'
import { Request, Response, NextFunction } from 'express'

export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ─── MIDDLEWARE: ADMIN CHECK ───
  requireAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }
      await this.adminService.verifyAdminAccess(userId)
      next()
    } catch (error) {
      res.status(403).json({ success: false, message: 'Admin access required' })
    }
  }

  // ─── USER MANAGEMENT ───
  listUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { skip, take, role, isActive, search } = req.query
      const users = await this.adminService.listUsers({
        skip: skip ? parseInt(skip as string) : undefined,
        take: take ? parseInt(take as string) : undefined,
        role: role as any,
        isActive: isActive !== undefined ? isActive === 'true' : undefined,
        search: search as string,
      })
      res.status(200).json({ success: true, data: users })
    } catch (error) {
      next(error)
    }
  }

  getUserDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const user = await this.adminService.getUserDetail(id)
      if (!user) {
        res.status(404).json({ success: false, message: 'User not found' })
        return
      }
      res.status(200).json({ success: true, data: user })
    } catch (error) {
      next(error)
    }
  }

  promoteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const user = await this.adminService.promoteUser(id)
      res.status(200).json({
        success: true,
        data: user,
        message: 'User promoted to admin',
      })
    } catch (error) {
      next(error)
    }
  }

  demoteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const user = await this.adminService.demoteUser(id)
      res.status(200).json({
        success: true,
        data: user,
        message: 'User demoted to standard user',
      })
    } catch (error) {
      next(error)
    }
  }

  updateUserRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const { role } = req.body
      const user = await this.adminService.updateUserRole(id, role)
      res.status(200).json({
        success: true,
        data: user,
        message: 'User role updated',
      })
    } catch (error) {
      next(error)
    }
  }

  bulkActivateUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { ids } = req.body
      const count = await this.adminService.bulkActivateUsers(ids)
      res.status(200).json({
        success: true,
        data: { count },
        message: `${count} users activated`,
      })
    } catch (error) {
      next(error)
    }
  }

  bulkDeactivateUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { ids } = req.body
      const count = await this.adminService.bulkDeactivateUsers(ids)
      res.status(200).json({
        success: true,
        data: { count },
        message: `${count} users deactivated`,
      })
    } catch (error) {
      next(error)
    }
  }

  bulkDeleteUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { ids } = req.body
      const count = await this.adminService.bulkDeleteUsers(ids)
      res.status(200).json({
        success: true,
        data: { count },
        message: `${count} users deleted`,
      })
    } catch (error) {
      next(error)
    }
  }

  // ─── TEMPLATE MANAGEMENT ───
  listTemplates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { skip, take, isPublic, userId } = req.query
      const templates = await this.adminService.listTemplates({
        skip: skip ? parseInt(skip as string) : undefined,
        take: take ? parseInt(take as string) : undefined,
        isPublic: isPublic !== undefined ? isPublic === 'true' : undefined,
        userId: userId as string,
      })
      res.status(200).json({ success: true, data: templates })
    } catch (error) {
      next(error)
    }
  }

  getTemplateDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const template = await this.adminService.getTemplateDetail(id)
      if (!template) {
        res.status(404).json({ success: false, message: 'Template not found' })
        return
      }
      res.status(200).json({ success: true, data: template })
    } catch (error) {
      next(error)
    }
  }

  publishTemplate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const template = await this.adminService.publishTemplate(id)
      res.status(200).json({
        success: true,
        data: template,
        message: 'Template published',
      })
    } catch (error) {
      next(error)
    }
  }

  unpublishTemplate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const template = await this.adminService.unpublishTemplate(id)
      res.status(200).json({
        success: true,
        data: template,
        message: 'Template unpublished',
      })
    } catch (error) {
      next(error)
    }
  }

  bulkPublishTemplates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { ids } = req.body
      const count = await this.adminService.bulkPublishTemplates(ids)
      res.status(200).json({
        success: true,
        data: { count },
        message: `${count} templates published`,
      })
    } catch (error) {
      next(error)
    }
  }

  bulkUnpublishTemplates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { ids } = req.body
      const count = await this.adminService.bulkUnpublishTemplates(ids)
      res.status(200).json({
        success: true,
        data: { count },
        message: `${count} templates unpublished`,
      })
    } catch (error) {
      next(error)
    }
  }

  deleteTemplate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      await this.adminService.deleteTemplate(id)
      res.status(200).json({
        success: true,
        message: 'Template deleted',
      })
    } catch (error) {
      next(error)
    }
  }

  bulkDeleteTemplates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { ids } = req.body
      const count = await this.adminService.bulkDeleteTemplates(ids)
      res.status(200).json({
        success: true,
        data: { count },
        message: `${count} templates deleted`,
      })
    } catch (error) {
      next(error)
    }
  }

  // ─── ANALYTICS ───
  getUserAnalytics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stats = await this.adminService.getUserAnalytics()
      res.status(200).json({ success: true, data: stats })
    } catch (error) {
      next(error)
    }
  }

  getTemplateAnalytics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stats = await this.adminService.getTemplateAnalytics()
      res.status(200).json({ success: true, data: stats })
    } catch (error) {
      next(error)
    }
  }

  getRecentActivity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { days } = req.query
      const activity = await this.adminService.getRecentActivity(
        days ? parseInt(days as string) : 7
      )
      res.status(200).json({ success: true, data: activity })
    } catch (error) {
      next(error)
    }
  }

  getDashboardSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const summary = await this.adminService.getDashboardSummary()
      res.status(200).json({ success: true, data: summary })
    } catch (error) {
      next(error)
    }
  }

  // ─── SYSTEM ───
  getDatabaseOverview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stats = await this.adminService.getDatabaseOverview()
      res.status(200).json({ success: true, data: stats })
    } catch (error) {
      next(error)
    }
  }
}