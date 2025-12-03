const express = require('express');
const router = express.Router();
const { getCotizaciones, createCotizacion, updateCotizacion, deleteCotizacion } = require('../controllers/cotizacionesController');

router.get('/', getCotizaciones);
router.post('/', createCotizacion);
router.put('/:id', updateCotizacion);
router.delete('/:id', deleteCotizacion);

module.exports = router;
