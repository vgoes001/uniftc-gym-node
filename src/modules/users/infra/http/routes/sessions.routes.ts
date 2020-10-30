import { Router, Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request: Request, response: Response) => {
  const { enrollment, password } = request.body;

  const authenticateUser = new AuthenticateUserService();
  const { user, token } = await authenticateUser.execute({
    enrollment,
    password,
  });
  delete user.password;
  return response.json({ user, token });
});

export default sessionsRouter;