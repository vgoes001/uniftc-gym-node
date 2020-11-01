import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  enrollment: string;
  name: string;
  course: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    course,
    enrollment,
    password,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEnrollment(
      enrollment,
    );

    if (checkUserExists) {
      throw new AppError('Enrollment already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      enrollment,
      course,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
