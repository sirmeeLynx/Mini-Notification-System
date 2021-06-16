import { Router } from 'express';

// Controllers
import { publishMessageController } from '../controllers';

// Middlewares
import * as validator from '../middlewares';

const router = Router();

router.post('/:topic', validator.publishValidate, publishMessageController);

export default router;
