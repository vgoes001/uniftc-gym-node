import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });
    delete user.password;

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, course, password, old_password } = request.body;
    const user_id = request.user.id;

    const updateProfileService = container.resolve(UpdateProfileService);
    const user = await updateProfileService.execute({
      name,
      old_password,
      course,
      password,
      user_id,
    });
    delete user.password;
    return response.json(user);
  }
}
