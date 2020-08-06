import Router from 'express';
import ctrl from '../controller/peliculas.js';

var router = Router();

/* GET all. */
router.get('/', ctrl.getMovies);

router.get('/recomendacion', ctrl.getRecom);

/* GET by id*/
router.get('/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    ctrl.getById(id, res);
});


export default router;
