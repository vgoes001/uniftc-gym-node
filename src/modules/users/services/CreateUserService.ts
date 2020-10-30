import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface Request {
  enrollment: string;
  name: string;
  course: string;
  password: string;
}
class CreateUserService {
  public async execute({
    name,
    course,
    enrollment,
    password,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const checkUserExists = await usersRepository.findOne({
      where: { enrollment },
    });

    if (checkUserExists) {
      throw new AppError('Enrollment already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      enrollment,
      course,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
