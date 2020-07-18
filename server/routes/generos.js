import Router from 'express';
import ctrl from '../controller/generos.js';

var router = Router();

/* GET all. */
router.get('/', ctrl.getAll);

// /* GET by id. */
// router.get('/:id', ctrl.getById);

export default router;
