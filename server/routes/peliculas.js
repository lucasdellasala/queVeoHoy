import Router from 'express';
import ctrl from '../controller/peliculas.js';

var router = Router();

/* GET all. */
router.get('/', ctrl.getAll);

// /* GET by id. */
// router.get('/:id', ctrl.getById);

export default router;
