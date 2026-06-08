
import { TemplatesService } from '../services/templatesService'
import { Request, Response, NextFunction } from 'express'

export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  // CREATE
  createTemplate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }
      const template = await this.templatesService.createTemplate({
        ...req.body,
        user: { connect: { id: userId } },
      })
      res.status(201).json({
        success: true,
        data: template,
        message: 'Template created successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  createFullTemplate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }
      const template = await this.templatesService.createFullTemplate({
        ...req.body,
        user: { connect: { id: userId } },
      })
      res.status(201).json({
        success: true,
        data: template,
        message: 'Full template created successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  // READ
  getMyTemplates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }
      const templates = await this.templatesService.getTemplatesByUser(userId)
      res.status(200).json({ success: true, data: templates })
    } catch (error) {
      next(error)
    }
  }

  getPublicTemplates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const templates = await this.templatesService.getPublicTemplates()
      res.status(200).json({ success: true, data: templates })
    } catch (error) {
      next(error)
    }
  }

  getTemplateById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const userId = req.user?.id

      const template = await this.templatesService.getTemplateById(id)
      if (!template) {
        res.status(404).json({ success: false, message: 'Template not found' })
        return
      }

      // Check access: public or owner
      if (!template.isPublic && template.userId !== userId) {
        res.status(403).json({ success: false, message: 'Access denied' })
        return
      }

      res.status(200).json({ success: true, data: template })
    } catch (error) {
      next(error)
    }
  }

  getTemplatesByLayout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { layout } = req.params
      const templates = await this.templatesService.getTemplatesByLayout(layout)
      res.status(200).json({ success: true, data: templates })
    } catch (error) {
      next(error)
    }
  }

  getTemplatesByTheme = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { theme } = req.params
      const templates = await this.templatesService.getTemplatesByTheme(theme)
      res.status(200).json({ success: true, data: templates })
    } catch (error) {
      next(error)
    }
  }

  // UPDATE
  updateTemplate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const userId = req.user?.id
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const isOwner = await this.templatesService.verifyOwnership(id, userId)
      if (!isOwner) {
        res.status(403).json({ success: false, message: 'Not authorized to edit this template' })
        return
      }

      const template = await this.templatesService.updateTemplate(id, req.body)
      res.status(200).json({
        success: true,
        data: template,
        message: 'Template updated successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  updateTemplateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const userId = req.user?.id
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const isOwner = await this.templatesService.verifyOwnership(id, userId)
      if (!isOwner) {
        res.status(403).json({ success: false, message: 'Not authorized to edit this template' })
        return
      }

      const template = await this.templatesService.updateTemplateProfile(id, req.body)
      res.status(200).json({
        success: true,
        data: template,
        message: 'Profile updated successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  updateTemplateContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const userId = req.user?.id
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const isOwner = await this.templatesService.verifyOwnership(id, userId)
      if (!isOwner) {
        res.status(403).json({ success: false, message: 'Not authorized to edit this template' })
        return
      }

      const template = await this.templatesService.updateTemplateContact(id, req.body)
      res.status(200).json({
        success: true,
        data: template,
        message: 'Contact updated successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  publishTemplate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const userId = req.user?.id
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const isOwner = await this.templatesService.verifyOwnership(id, userId)
      if (!isOwner) {
        res.status(403).json({ success: false, message: 'Not authorized' })
        return
      }

      const template = await this.templatesService.publishTemplate(id)
      res.status(200).json({
        success: true,
        data: template,
        message: 'Template published successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  unpublishTemplate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const userId = req.user?.id
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const isOwner = await this.templatesService.verifyOwnership(id, userId)
      if (!isOwner) {
        res.status(403).json({ success: false, message: 'Not authorized' })
        return
      }

      const template = await this.templatesService.unpublishTemplate(id)
      res.status(200).json({
        success: true,
        data: template,
        message: 'Template unpublished successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  // DELETE
  deleteTemplate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const userId = req.user?.id
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const isOwner = await this.templatesService.verifyOwnership(id, userId)
      if (!isOwner) {
        res.status(403).json({ success: false, message: 'Not authorized to delete this template' })
        return
      }

      await this.templatesService.deleteTemplate(id)
      res.status(200).json({
        success: true,
        message: 'Template deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  // STATS
  getMyTemplateCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }
      const count = await this.templatesService.countUserTemplates(userId)
      res.status(200).json({ success: true, data: { count } })
    } catch (error) {
      next(error)
    }
  }
}