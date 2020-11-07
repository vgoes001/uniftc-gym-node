import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ListHourAvailabiityController from '../controllers/ListHourAvailabiityController';

const availabilityRouter = Router();
const listHourAvailabiityController = new ListHourAvailabiityController();

availabilityRouter.use(ensureAuthenticated);

availabilityRouter.get('/', listHourAvailabiityController.index);

export default availabilityRouter;
