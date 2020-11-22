import { Router } from 'express';

import EquipmentsController from '../controller/EquipmentsController';

const equipmentsRouter = Router();
const equipmentsController = new EquipmentsController();

equipmentsRouter.post('/', equipmentsController.create);

export default equipmentsRouter;
