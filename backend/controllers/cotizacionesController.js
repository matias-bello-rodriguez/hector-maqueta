const { db } = require('../config/firebase');

const getCotizaciones = async (req, res) => {
  try {
    const snapshot = await db.collection('cotizaciones').get();
    const cotizaciones = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(cotizaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCotizacion = async (req, res) => {
  try {
    const newCotizacion = req.body;
    const docRef = await db.collection('cotizaciones').add(newCotizacion);
    res.status(201).json({ id: docRef.id, ...newCotizacion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCotizacion = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    await db.collection('cotizaciones').doc(id).update(updatedData);
    res.status(200).json({ id, ...updatedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCotizacion = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('cotizaciones').doc(id).delete();
    res.status(200).json({ message: 'Cotización eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCotizaciones,
  createCotizacion,
  updateCotizacion,
  deleteCotizacion
};
