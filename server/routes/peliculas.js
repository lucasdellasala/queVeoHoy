import Router from 'express';
import ctrl from '../controller/peliculas.js';

var router = Router();

/* GET all. */
router.get('/', ctrl.getAll);

router.get('/:filter', ctrl.getFilteredMovies);


export default router;
