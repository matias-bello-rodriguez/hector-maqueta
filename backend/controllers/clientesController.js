const { db } = require('../config/firebase');

const getClientes = async (req, res) => {
  try {
    const snapshot = await db.collection('clientes').get();
    const clientes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCliente = async (req, res) => {
  try {
    const newCliente = req.body;
    const docRef = await db.collection('clientes').add(newCliente);
    res.status(201).json({ id: docRef.id, ...newCliente });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    await db.collection('clientes').doc(id).update(updatedData);
    res.status(200).json({ id, ...updatedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('clientes').doc(id).delete();
    res.status(200).json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente
};
