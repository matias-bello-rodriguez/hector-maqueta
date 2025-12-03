const { db } = require('../config/firebase');

const getEventos = async (req, res) => {
  try {
    const snapshot = await db.collection('eventos').get();
    const eventos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createEvento = async (req, res) => {
  try {
    const nuevoEvento = req.body;
    // Ensure tareas is an array if not provided
    if (!nuevoEvento.tareas) {
        nuevoEvento.tareas = [];
    }
    const docRef = await db.collection('eventos').add(nuevoEvento);
    res.status(201).json({ id: docRef.id, ...nuevoEvento });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const eventoActualizado = req.body;
    await db.collection('eventos').doc(id).update(eventoActualizado);
    res.json({ id, ...eventoActualizado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEvento = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('eventos').doc(id).delete();
    res.json({ message: 'Evento eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getEventos, createEvento, updateEvento, deleteEvento };
