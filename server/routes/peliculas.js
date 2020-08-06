import Router from 'express';
import ctrl from '../controller/peliculas.js';

var router = Router();

/* GET all. */
router.get('/', ctrl.getMovies);

/* GET by id*/
router.get('/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    ctrl.getById(id, res);
});

router.get('/recomendacion', (req, res) => {
    console.log("ROUTES");
    ctrl.getRecom(req, res)
});

export default router;
