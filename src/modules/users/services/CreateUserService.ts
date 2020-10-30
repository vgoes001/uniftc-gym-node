import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

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

    const hashedPassword = await hash(password, 8);

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
