const { db } = require('../config/firebase');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const snapshot = await db.collection('usuarios')
      .where('username', '==', username)
      .where('password', '==', password)
      .get();

    if (snapshot.empty) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = snapshot.docs[0].data();
    // In a real app, you would return a JWT token here
    res.status(200).json({ 
      message: 'Login exitoso',
      user: { username: user.username, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login };
