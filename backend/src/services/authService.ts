
import { AuthRepository } from '../repositories/authRepository'
import { User, Prisma, UserRole } from '../generated/prisma/client'
import { hashPassword, comparePassword } from '../utils/password'
import { generateToken } from '../utils/jwt'

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

   // REGISTRATION

  async register(data: Prisma.UserCreateInput): Promise<{ user: User; token: string }> {
    const exists = await this.authRepository.existsByEmail(data.email)
    if (exists) {
      throw new Error('Email already registered')
    }

    const hashed = await hashPassword(data.password)
    const user = await this.authRepository.createUser({
      ...data,
      password: hashed,
    })

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    return { user, token }
  }

  // LOGIN
  async login(email: string, plainPassword: string): Promise<{ user: User; token: string }> {
    const user = await this.authRepository.findByEmail(email)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const valid = await comparePassword(plainPassword, user.password)
    if (!valid) {
      throw new Error('Invalid credentials')
    }

    if (!user.isActive) {
      throw new Error('Account deactivated')
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    return { user, token }
  }

  // ─── PASSWORD ───
  async updatePassword(id: string, plainPassword: string): Promise<User> {
    const hashed = await hashPassword(plainPassword)
    return this.authRepository.updatePassword(id, hashed)
  }

  async registerWithTemplate(
    userData: Prisma.UserCreateInput,
    templateData: Prisma.ResumeTemplateCreateWithoutUserInput
  ): Promise<User> {
    const exists = await this.authRepository.existsByEmail(userData.email)
    if (exists) {
      throw new Error('Email already registered')
    }
    return this.authRepository.createUserWithTemplate(userData, templateData)
  }

  // AUTHENTICATION
  async getUserByEmail(email: string): Promise<User | null> {
    return this.authRepository.findByEmail(email)
  }

  async getUserById(id: string): Promise<User | null> {
    return this.authRepository.findById(id)
  }

  async getUserWithTemplates(id: string): Promise<User | null> {
    return this.authRepository.findByIdWithTemplates(id)
  }

  async changeEmail(id: string, newEmail: string): Promise<User> {
    const exists = await this.authRepository.existsByEmail(newEmail)
    if (exists) {
      throw new Error('Email already in use')
    }
    return this.authRepository.updateEmail(id, newEmail)
  }

  // PROFILE
  async updateProfile(
    id: string,
    data: Pick<Prisma.UserUpdateInput, 'firstName' | 'lastName' | 'avatarUrl'>
  ): Promise<User> {
    return this.authRepository.updateProfile(id, data)
  }

  async updateAvatar(id: string, avatarUrl: string): Promise<User> {
    return this.authRepository.updateAvatar(id, avatarUrl)
  }

  // STATUS
  async activateUser(id: string): Promise<User> {
    return this.authRepository.activate(id)
  }

  async deactivateUser(id: string): Promise<User> {
    return this.authRepository.deactivate(id)
  }

  async toggleUserStatus(id: string): Promise<User> {
    return this.authRepository.toggleActive(id)
  }

  // DELETE
  async deleteUser(id: string): Promise<User> {
    return this.authRepository.delete(id)
  }

  // VALIDATION
  async validateCredentials(email: string): Promise<User | null> {
    return this.authRepository.findByEmail(email)
  }

  async checkUserStatus(id: string): Promise<boolean> {
    return this.authRepository.isActive(id)
  }
}