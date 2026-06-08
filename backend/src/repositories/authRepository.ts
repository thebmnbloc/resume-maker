import { prisma } from "../config/db";
import { User, Prisma } from '../generated/prisma/client';



export class AuthRepository {
  // USER CREATION
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data,
      include: { resumeTemplates: true },
    })
  }

  async createUserWithTemplate(
    userData: Prisma.UserCreateInput,
    templateData: Prisma.ResumeTemplateCreateWithoutUserInput
  ): Promise<User> {
    return prisma.user.create({
      data: {
        ...userData,
        resumeTemplates: { create: templateData },
      },
      include: { resumeTemplates: true },
    })
  }

  // AUTHENTICATION
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
      include: { resumeTemplates: true },
    })
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      include: { resumeTemplates: true },
    })
  }

  async findByIdWithTemplates(id: string): Promise<User | null> {
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

  // PASSWORD & SECURITY 
  async updatePassword(id: string, hashedPassword: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    })
  }

  async updateEmail(id: string, email: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { email },
    })
  }

  //  PROFILE 
  async updateProfile(
    id: string,
    data: Pick<Prisma.UserUpdateInput, 'firstName' | 'lastName' | 'avatarUrl'>
  ): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    })
  }

  async updateAvatar(id: string, avatarUrl: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { avatarUrl },
    })
  }

  // STATUS 
  async activate(id: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { isActive: true },
    })
  }

  async deactivate(id: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { isActive: false },
    })
  }

  async toggleActive(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { isActive: true },
    })
    if (!user) throw new Error('User not found')
    return prisma.user.update({
      where: { id },
      data: { isActive: !user.isActive },
    })
  }

  // DELETE 
  async delete(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    })
  }

  // VALIDATION 
  async existsByEmail(email: string): Promise<boolean> {
    const count = await prisma.user.count({ where: { email } })
    return count > 0
  }

  async isActive(id: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { isActive: true },
    })
    return user?.isActive ?? false
  }
}