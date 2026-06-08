// src/services/adminService.ts
import { AdminRepository } from '../repositories/adminRepository';
import { AuthRepository } from '../repositories/authRepository';
import { TemplateRepository } from '../repositories/templatesRepository';
import { User, ResumeTemplate, UserRole, Prisma } from '../generated/prisma/client';

export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly authRepository: AuthRepository,
    private readonly templateRepository: TemplateRepository
  ) {}

  // USER MANAGEMENT
  async listUsers(options?: {
    skip?: number
    take?: number
    role?: UserRole
    isActive?: boolean
    search?: string
  }): Promise<User[]> {
    return this.adminRepository.findAllUsers(options)
  }

  async getUserDetail(id: string): Promise<User | null> {
    return this.adminRepository.findUserById(id)
  }

  async promoteUser(id: string): Promise<User> {
    return this.adminRepository.promoteToAdmin(id)
  }

  async demoteUser(id: string): Promise<User> {
    return this.adminRepository.demoteToUser(id)
  }

  async updateUserRole(id: string, role: UserRole): Promise<User> {
    return this.adminRepository.updateUserRole(id, role)
  }

  async bulkActivateUsers(ids: string[]): Promise<number> {
    const result = await this.adminRepository.bulkUpdateStatus(ids, true)
    return result.count
  }

  async bulkDeactivateUsers(ids: string[]): Promise<number> {
    const result = await this.adminRepository.bulkUpdateStatus(ids, false)
    return result.count
  }

  async bulkDeleteUsers(ids: string[]): Promise<number> {
    const result = await this.adminRepository.bulkDeleteUsers(ids)
    return result.count
  }

  // TEMPLATE MANAGEMENT
  async listTemplates(options?: {
    skip?: number
    take?: number
    isPublic?: boolean
    userId?: string
  }): Promise<ResumeTemplate[]> {
    return this.adminRepository.findAllTemplates(options)
  }

  async getTemplateDetail(id: string): Promise<ResumeTemplate | null> {
    return this.adminRepository.findTemplateById(id)
  }

  async publishTemplate(id: string): Promise<ResumeTemplate> {
    return this.adminRepository.updateTemplatePublicStatus(id, true)
  }

  async unpublishTemplate(id: string): Promise<ResumeTemplate> {
    return this.adminRepository.updateTemplatePublicStatus(id, false)
  }

  async bulkPublishTemplates(ids: string[]): Promise<number> {
    const result = await this.adminRepository.bulkUpdateTemplateVisibility(ids, true)
    return result.count
  }

  async bulkUnpublishTemplates(ids: string[]): Promise<number> {
    const result = await this.adminRepository.bulkUpdateTemplateVisibility(ids, false)
    return result.count
  }

  async deleteTemplate(id: string): Promise<ResumeTemplate> {
    return this.adminRepository.deleteTemplate(id)
  }

  async bulkDeleteTemplates(ids: string[]): Promise<number> {
    const result = await this.adminRepository.bulkDeleteTemplates(ids)
    return result.count
  }

  // ANALYTICS
  async getUserAnalytics(): Promise<{
    total: number
    active: number
    inactive: number
    admins: number
    users: number
  }> {
    return this.adminRepository.getUserStats()
  }

  async getTemplateAnalytics(): Promise<{
    total: number
    public: number
    private: number
    byLayout: Record<string, number>
    byTheme: Record<string, number>
  }> {
    return this.adminRepository.getTemplateStats()
  }

  async getRecentActivity(days: number = 7): Promise<{
    newUsers: number
    newTemplates: number
  }> {
    return this.adminRepository.getRecentActivity(days)
  }

  async getDashboardSummary(): Promise<{
    users: {
      total: number
      active: number
      inactive: number
      admins: number
      newThisWeek: number
    }
    templates: {
      total: number
      public: number
      private: number
      newThisWeek: number
    }
    database: Awaited<ReturnType<AdminRepository['getDatabaseStats']>>
  }> {
    const [userStats, templateStats, recentActivity, dbStats] = await Promise.all([
      this.adminRepository.getUserStats(),
      this.adminRepository.getTemplateStats(),
      this.adminRepository.getRecentActivity(7),
      this.adminRepository.getDatabaseStats(),
    ])

    return {
      users: {
        total: userStats.total,
        active: userStats.active,
        inactive: userStats.inactive,
        admins: userStats.admins,
        newThisWeek: recentActivity.newUsers,
      },
      templates: {
        total: templateStats.total,
        public: templateStats.public,
        private: templateStats.private,
        newThisWeek: recentActivity.newTemplates,
      },
      database: dbStats,
    }
  }

  // SYSTEM
  async getDatabaseOverview(): Promise<ReturnType<AdminRepository['getDatabaseStats']>> {
    return this.adminRepository.getDatabaseStats()
  }

  // VERIFICATION HELPERS
  async isAdmin(userId: string): Promise<boolean> {
    const user = await this.authRepository.findById(userId)
    return user?.role === UserRole.ADMIN
  }

  async verifyAdminAccess(userId: string): Promise<void> {
    const isAdmin = await this.isAdmin(userId)
    if (!isAdmin) {
      throw new Error('Forbidden: Admin access required')
    }
  }
}