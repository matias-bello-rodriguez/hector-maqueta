const { db, admin } = require('../config/firebase');

const getVentas = async (req, res) => {
  try {
    const snapshot = await db.collection('ventas').orderBy('fecha', 'desc').get();
    const ventas = snapshot.docs.map(doc => {
      const data = doc.data();
      return { 
        id: doc.id, 
        ...data,
        fecha: data.fecha.toDate ? data.fecha.toDate() : data.fecha // Handle Firestore Timestamp
      };
    });
    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createVenta = async (req, res) => {
  try {
    const newVenta = {
      ...req.body,
      fecha: admin.firestore.Timestamp.now() // Use server timestamp
    };
    const docRef = await db.collection('ventas').add(newVenta);
    res.status(201).json({ id: docRef.id, ...newVenta });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVentaById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('ventas').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getVentas,
  createVenta,
  getVentaById
};
