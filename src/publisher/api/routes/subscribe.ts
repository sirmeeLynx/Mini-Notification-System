import { Router } from 'express';

// Controllers
import { subscribeToTopicController } from '../controllers';

// Middlewares
import * as validator from '../middlewares';

const router = Router();

router.post('/:topic', validator.subscribeValidate, subscribeToTopicController);

export default router;
