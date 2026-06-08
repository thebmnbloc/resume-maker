import { prisma } from "../config/db";
import { ResumeTemplate, Prisma } from "../generated/prisma/client";




export class TemplatesRepository {
  // CREATE 
  async create(data: Prisma.ResumeTemplateCreateInput): Promise<ResumeTemplate> {
    return prisma.resumeTemplate.create({ data })
  }

  async createWithProfile(
    templateData: Prisma.ResumeTemplateCreateInput,
    profileData: Prisma.ProfileCreateWithoutResumeInput
  ): Promise<ResumeTemplate> {
    return prisma.resumeTemplate.create({
      data: {
        ...templateData,
        profile: { create: profileData },
      },
      include: { profile: true },
    })
  }

  async createWithRelations(
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
    const {
      profile,
      contact,
      educations,
      experiences,
      expertises,
      languages,
      certifications,
      references,
      ...templateData
    } = data

    return prisma.resumeTemplate.create({
      data: {
        ...templateData,
        ...(profile && { profile: { create: profile } }),
        ...(contact && { contact: { create: contact } }),
        ...(educations?.length && { educations: { create: educations } }),
        ...(experiences?.length && { experiences: { create: experiences } }),
        ...(expertises?.length && { expertises: { create: expertises } }),
        ...(languages?.length && { languages: { create: languages } }),
        ...(certifications?.length && { certifications: { create: certifications } }),
        ...(references?.length && { references: { create: references } }),
      },
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
    })
  }

  // ─── READ ───
  async findById(id: string): Promise<ResumeTemplate | null> {
    return prisma.resumeTemplate.findUnique({
      where: { id },
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
    })
  }

  async findByUserId(userId: string): Promise<ResumeTemplate[]> {
    return prisma.resumeTemplate.findMany({
      where: { userId },
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
    })
  }

  async findPublic(): Promise<ResumeTemplate[]> {
    return prisma.resumeTemplate.findMany({
      where: { isPublic: true },
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
    })
  }

  async findByLayoutStyle(layoutStyle: string): Promise<ResumeTemplate[]> {
    return prisma.resumeTemplate.findMany({
      where: { layoutStyle },
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
    })
  }

  async findByThemeColor(themeColor: string): Promise<ResumeTemplate[]> {
    return prisma.resumeTemplate.findMany({
      where: { themeColor },
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
    })
  }

  // ─── UPDATE ───
  async update(
    id: string,
    data: Prisma.ResumeTemplateUpdateInput
  ): Promise<ResumeTemplate> {
    return prisma.resumeTemplate.update({
      where: { id },
      data,
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
    })
  }

  async updateProfile(
    resumeId: string,
    data: Prisma.ProfileUpdateInput
  ): Promise<ResumeTemplate> {
    return prisma.resumeTemplate.update({
      where: { id: resumeId },
      data: { profile: { update: data } },
      include: { profile: true },
    })
  }

  async updateContact(
    resumeId: string,
    data: Prisma.ContactUpdateInput
  ): Promise<ResumeTemplate> {
    return prisma.resumeTemplate.update({
      where: { id: resumeId },
      data: { contact: { update: data } },
      include: { contact: true },
    })
  }

  async togglePublic(id: string, isPublic: boolean): Promise<ResumeTemplate> {
    return prisma.resumeTemplate.update({
      where: { id },
      data: { isPublic },
    })
  }

  // ─── DELETE ───
  async delete(id: string): Promise<ResumeTemplate> {
    return prisma.resumeTemplate.delete({
      where: { id },
    })
  }

  async deleteByUserId(userId: string): Promise<Prisma.BatchPayload> {
    return prisma.resumeTemplate.deleteMany({
      where: { userId },
    })
  }

  // ─── COUNT ───
  async countByUser(userId: string): Promise<number> {
    return prisma.resumeTemplate.count({
      where: { userId },
    })
  }

  async countPublic(): Promise<number> {
    return prisma.resumeTemplate.count({
      where: { isPublic: true },
    })
  }
}