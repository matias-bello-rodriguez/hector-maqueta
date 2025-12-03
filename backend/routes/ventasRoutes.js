const express = require('express');
const router = express.Router();
const { getVentas, createVenta, getVentaById } = require('../controllers/ventasController');

router.get('/', getVentas);
router.post('/', createVenta);
router.get('/:id', getVentaById);

module.exports = router;
