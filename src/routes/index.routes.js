import {Router} from 'express';
import studentRouter from './user.routes';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send('MERN running - Server');
});

router.use('/user', userRouter);

export default router;
