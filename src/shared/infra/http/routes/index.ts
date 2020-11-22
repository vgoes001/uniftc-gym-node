import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import equipmentsRouter from '@modules/equipments/infra/http/routes/Equipments.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import availabilityRouter from '@modules/appointments/infra/http/routes/availability.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/equipments', equipmentsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/availability', availabilityRouter);

export default routes;
