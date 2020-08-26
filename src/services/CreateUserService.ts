import { getRepository } from 'typeorm';
import User from '../models/User';

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
      throw new Error('Enrollment already exists');
    }

    const user = usersRepository.create({
      name,
      enrollment,
      course,
      password,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
