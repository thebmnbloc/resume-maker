
import { Router } from 'express'
import { adminController } from '../container'

const router = Router()

// Apply admin check to all routes
router.use(adminController.requireAdmin)

// Users
router.get('/users', adminController.listUsers)
router.get('/users/:id', adminController.getUserDetail)
router.patch('/users/:id/promote', adminController.promoteUser)
router.patch('/users/:id/demote', adminController.demoteUser)
router.patch('/users/:id/role', adminController.updateUserRole)
router.post('/users/bulk-activate', adminController.bulkActivateUsers)
router.post('/users/bulk-deactivate', adminController.bulkDeactivateUsers)
router.post('/users/bulk-delete', adminController.bulkDeleteUsers)

// Templates
router.get('/templates', adminController.listTemplates)
router.get('/templates/:id', adminController.getTemplateDetail)
router.patch('/templates/:id/publish', adminController.publishTemplate)
router.patch('/templates/:id/unpublish', adminController.unpublishTemplate)
router.post('/templates/bulk-publish', adminController.bulkPublishTemplates)
router.post('/templates/bulk-unpublish', adminController.bulkUnpublishTemplates)
router.delete('/templates/:id', adminController.deleteTemplate)
router.post('/templates/bulk-delete', adminController.bulkDeleteTemplates)

// Analytics
router.get('/analytics/users', adminController.getUserAnalytics)
router.get('/analytics/templates', adminController.getTemplateAnalytics)
router.get('/analytics/activity', adminController.getRecentActivity)
router.get('/analytics/dashboard', adminController.getDashboardSummary)
router.get('/analytics/database', adminController.getDatabaseOverview)

export default router