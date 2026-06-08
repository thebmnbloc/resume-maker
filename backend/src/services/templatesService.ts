// src/services/templateService.ts
import { TemplatesRepository } from '../repositories/templatesRepository';
import { ResumeTemplate, Prisma } from '../generated/prisma/client';

export class TemplatesService {
  constructor(private readonly templatesRepository: TemplatesRepository) {}

  // CREATE
  async createTemplate(data: Prisma.ResumeTemplateCreateInput): Promise<ResumeTemplate> {
    return this.templatesRepository.create(data)
  }

  async createTemplateWithProfile(
    templateData: Prisma.ResumeTemplateCreateInput,
    profileData: Prisma.ProfileCreateWithoutResumeInput
  ): Promise<ResumeTemplate> {
    return this.templatesRepository.createWithProfile(templateData, profileData)
  }

  async createFullTemplate(
    data: Prisma.ResumeTemplateCreateInput & {
      profile?: Prisma.ProfileCreateWithoutResumeInput
      contact?: Prisma.ContactCreateWithoutResumeInput
      educations?: Prisma.EducationCreateWithoutResumeInput[]
      experiences?: Prisma.ExperienceCreateWithoutResumeInput[]
      expertises?: Prisma.ExpertiseCreateWithoutResumeInput[]
      languages?: Prisma.LanguageCreateWithoutResumeInput[]
      certifications?: Prisma.CertificationCreateWithoutResumeInput[]
      references?: Prisma.ReferenceCreateWithoutResumeInput[]
    }
  ): Promise<ResumeTemplate> {
    return this.templatesRepository.createWithRelations(data)
  }

  // READ
  async getTemplateById(id: string): Promise<ResumeTemplate | null> {
    return this.templatesRepository.findById(id)
  }

  async getTemplatesByUser(userId: string): Promise<ResumeTemplate[]> {
    return this.templatesRepository.findByUserId(userId)
  }

  async getPublicTemplates(): Promise<ResumeTemplate[]> {
    return this.templatesRepository.findPublic()
  }

  async getTemplatesByLayout(layoutStyle: string): Promise<ResumeTemplate[]> {
    return this.templatesRepository.findByLayoutStyle(layoutStyle)
  }

  async getTemplatesByTheme(themeColor: string): Promise<ResumeTemplate[]> {
    return this.templatesRepository.findByThemeColor(themeColor)
  }

  // UPDATE
  async updateTemplate(
    id: string,
    data: Prisma.ResumeTemplateUpdateInput
  ): Promise<ResumeTemplate> {
    return this.templatesRepository.update(id, data)
  }

  async updateTemplateProfile(
    resumeId: string,
    data: Prisma.ProfileUpdateInput
  ): Promise<ResumeTemplate> {
    return this.templatesRepository.updateProfile(resumeId, data)
  }

  async updateTemplateContact(
    resumeId: string,
    data: Prisma.ContactUpdateInput
  ): Promise<ResumeTemplate> {
    return this.templatesRepository.updateContact(resumeId, data)
  }

  async publishTemplate(id: string): Promise<ResumeTemplate> {
    return this.templatesRepository.togglePublic(id, true)
  }

  async unpublishTemplate(id: string): Promise<ResumeTemplate> {
    return this.templatesRepository.togglePublic(id, false)
  }

  async toggleTemplateVisibility(id: string): Promise<ResumeTemplate> {
    const template = await this.templatesRepository.findById(id)
    if (!template) {
      throw new Error('Template not found')
    }
    return this.templatesRepository.togglePublic(id, !template.isPublic)
  }

  //  DELETE
  async deleteTemplate(id: string): Promise<ResumeTemplate> {
    return this.templatesRepository.delete(id)
  }

  async deleteUserTemplates(userId: string): Promise<number> {
    const result = await this.templatesRepository.deleteByUserId(userId)
    return result.count
  }

  // COUNT
  async countUserTemplates(userId: string): Promise<number> {
    return this.templatesRepository.countByUser(userId)
  }

  async countPublicTemplates(): Promise<number> {
    return this.templatesRepository.countPublic()
  }

  // OWNERSHIP CHECK
  async verifyOwnership(templateId: string, userId: string): Promise<boolean> {
    const template = await this.templatesRepository.findById(templateId)
    if (!template) return false
    return template.userId === userId
  }
}