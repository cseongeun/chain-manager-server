import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthProvider, USER_REPOSITORY_PROVIDE } from './user.constant';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_PROVIDE)
    private userRepository: Repository<User>,
  ) {}

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOne(provider: AuthProvider, email: string): Promise<User> {
    return this.userRepository.findOne({ where: { provider, email } });
  }

  async createOne(
    provider: AuthProvider,
    email: string,
    name: string,
    password: string,
  ): Promise<User> {
    return this.userRepository.save({
      provider,
      email,
      name,
      password: password ?? '',
    });
  }
}
