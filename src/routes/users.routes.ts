import { Router, Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { enrollment, name, course, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      enrollment,
      course,
      password,
    });
    delete user.password;
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
