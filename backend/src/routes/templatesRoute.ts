
import { Router } from 'express'
import { templatesController } from '../container';
import { authenticate } from '../middlewares/authenticate';

const router = Router()

router.post('/', authenticate, templatesController.createTemplate)
router.post('/full', authenticate, templatesController.createFullTemplate)
router.get('/my', authenticate, templatesController.getMyTemplates)
router.get('/public', templatesController.getPublicTemplates)
router.get('/layout/:layout', templatesController.getTemplatesByLayout)
router.get('/theme/:theme', templatesController.getTemplatesByTheme)
router.get('/:id', authenticate, templatesController.getTemplateById)
router.patch('/:id', authenticate, templatesController.updateTemplate)
router.patch('/:id/profile', authenticate, templatesController.updateTemplateProfile)
router.patch('/:id/contact', authenticate, templatesController.updateTemplateContact)
router.patch('/:id/publish', authenticate, templatesController.publishTemplate)
router.patch('/:id/unpublish', authenticate, templatesController.unpublishTemplate)
router.delete('/:id', authenticate, templatesController.deleteTemplate)
router.get('/stats/count', authenticate, templatesController.getMyTemplateCount)

export default router