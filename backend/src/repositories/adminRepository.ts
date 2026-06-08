
import { prisma } from "../config/db";
import { User, ResumeTemplate, Prisma, UserRole } from "../generated/prisma/client";

export class AdminRepository {
  // USER MANAGEMENT
  async findAllUsers(options?: {
    skip?: number
    take?: number
    role?: UserRole
    isActive?: boolean
    search?: string
  }): Promise<User[]> {
    const { skip, take, role, isActive, search } = options ?? {}

    return prisma.user.findMany({
      skip,
      take,
      where: {
        ...(role && { role }),
        ...(isActive !== undefined && { isActive }),
        ...(search && {
          OR: [
            { email: { contains: search, mode: 'insensitive' as const } },
            { firstName: { contains: search, mode: 'insensitive' as const } },
            { lastName: { contains: search, mode: 'insensitive' as const } },
          ],
        }),
      },
      include: {
        resumeTemplates: {
          select: {
            id: true,
            layoutStyle: true,
            themeColor: true,
            isPublic: true,
            createdAt: true,
            _count: {
              select: {
                educations: true,
                experiences: true,
                expertises: true,
                languages: true,
                certifications: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      include: {
        resumeTemplates: {
          include: {
            profile: true,
            contact: true,
            educations: true,
            experiences: { include: { achievements: true } },
            expertises: { include: { items: true } },
            languages: true,
            certifications: true,
            references: true,
          },
        },
      },
    })
  }

  async updateUserRole(id: string, role: UserRole): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { role },
    })
  }

  async promoteToAdmin(id: string): Promise<User> {
    return this.updateUserRole(id, UserRole.ADMIN)
  }

  async demoteToUser(id: string): Promise<User> {
    return this.updateUserRole(id, UserRole.USER)
  }

  async bulkUpdateStatus(ids: string[], isActive: boolean): Promise<Prisma.BatchPayload> {
    return prisma.user.updateMany({
      where: { id: { in: ids } },
      data: { isActive },
    })
  }

  async bulkDeleteUsers(ids: string[]): Promise<Prisma.BatchPayload> {
    return prisma.user.deleteMany({
      where: { id: { in: ids } },
    })
  }

  // TEMPLATE MANAGEMENT
  async findAllTemplates(options?: {
    skip?: number
    take?: number
    isPublic?: boolean
    userId?: string
  }): Promise<ResumeTemplate[]> {
    const { skip, take, isPublic, userId } = options ?? {}

    return prisma.resumeTemplate.findMany({
      skip,
      take,
      where: {
        ...(isPublic !== undefined && { isPublic }),
        ...(userId && { userId }),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            isActive: true,
          },
        },
        profile: true,
        contact: true,
        educations: true,
        experiences: { include: { achievements: true } },
        expertises: { include: { items: true } },
        languages: true,
        certifications: true,
        references: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findTemplateById(id: string): Promise<ResumeTemplate | null> {
    return prisma.resumeTemplate.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        profile: true,
        contact: true,
        educations: true,
        experiences: { include: { achievements: true } },
        expertises: { include: { items: true } },
        languages: true,
        certifications: true,
        references: true,
      },
    })
  }

  async updateTemplatePublicStatus(id: string, isPublic: boolean): Promise<ResumeTemplate> {
    return prisma.resumeTemplate.update({
      where: { id },
      data: { isPublic },
    })
  }

  async bulkUpdateTemplateVisibility(ids: string[], isPublic: boolean): Promise<Prisma.BatchPayload> {
    return prisma.resumeTemplate.updateMany({
      where: { id: { in: ids } },
      data: { isPublic },
    })
  }

  async deleteTemplate(id: string): Promise<ResumeTemplate> {
    return prisma.resumeTemplate.delete({
      where: { id },
    })
  }

  async bulkDeleteTemplates(ids: string[]): Promise<Prisma.BatchPayload> {
    return prisma.resumeTemplate.deleteMany({
      where: { id: { in: ids } },
    })
  }

  // ANALYTICS
  async getUserStats(): Promise<{
    total: number
    active: number
    inactive: number
    admins: number
    users: number
  }> {
    const [total, active, inactive, admins, users] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.user.count({ where: { isActive: false } }),
      prisma.user.count({ where: { role: UserRole.ADMIN } }),
      prisma.user.count({ where: { role: UserRole.USER } }),
    ])

    return { total, active, inactive, admins, users }
  }

  async getTemplateStats(): Promise<{
    total: number
    public: number
    private: number
    byLayout: Record<string, number>
    byTheme: Record<string, number>
  }> {
    const [total, publicCount, privateCount] = await Promise.all([
      prisma.resumeTemplate.count(),
      prisma.resumeTemplate.count({ where: { isPublic: true } }),
      prisma.resumeTemplate.count({ where: { isPublic: false } }),
    ])

    const layoutGroups = await prisma.resumeTemplate.groupBy({
      by: ['layoutStyle'],
      _count: { layoutStyle: true },
    })

    const themeGroups = await prisma.resumeTemplate.groupBy({
      by: ['themeColor'],
      _count: { themeColor: true },
    })

    const byLayout = layoutGroups.reduce(
      (acc, curr) => {
        acc[curr.layoutStyle] = curr._count.layoutStyle
        return acc
      },
      {} as Record<string, number>
    )

    const byTheme = themeGroups.reduce(
      (acc, curr) => {
        acc[curr.themeColor] = curr._count.themeColor
        return acc
      },
      {} as Record<string, number>
    )

    return { total, public: publicCount, private: privateCount, byLayout, byTheme }
  }

  async getRecentActivity(days: number = 7): Promise<{
    newUsers: number
    newTemplates: number
  }> {
    const since = new Date()
    since.setDate(since.getDate() - days)

    const [newUsers, newTemplates] = await Promise.all([
      prisma.user.count({ where: { createdAt: { gte: since } } }),
      prisma.resumeTemplate.count({ where: { createdAt: { gte: since } } }),
    ])

    return { newUsers, newTemplates }
  }

  // SYSTEM
  async getDatabaseStats(): Promise<{
    users: number
    templates: number
    profiles: number
    contacts: number
    educations: number
    experiences: number
    achievements: number
    expertises: number
    expertiseItems: number
    languages: number
    certifications: number
    references: number
  }> {
    const [
      users,
      templates,
      profiles,
      contacts,
      educations,
      experiences,
      achievements,
      expertises,
      expertiseItems,
      languages,
      certifications,
      references,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.resumeTemplate.count(),
      prisma.profile.count(),
      prisma.contact.count(),
      prisma.education.count(),
      prisma.experience.count(),
      prisma.achievement.count(),
      prisma.expertise.count(),
      prisma.expertiseItem.count(),
      prisma.language.count(),
      prisma.certification.count(),
      prisma.reference.count(),
    ])

    return {
      users,
      templates,
      profiles,
      contacts,
      educations,
      experiences,
      achievements,
      expertises,
      expertiseItems,
      languages,
      certifications,
      references,
    }
  }
}