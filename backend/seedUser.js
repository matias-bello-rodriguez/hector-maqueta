const { db } = require('./config/firebase');

const seedUser = async () => {
  try {
    const user = {
      username: 'hector',
      password: 'hector', // In a real app, this should be hashed!
      role: 'admin'
    };

    // Check if user exists
    const snapshot = await db.collection('usuarios').where('username', '==', 'hector').get();
    if (snapshot.empty) {
      await db.collection('usuarios').add(user);
      console.log('Usuario "hector" creado exitosamente.');
    } else {
      console.log('El usuario "hector" ya existe.');
    }
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
};

seedUser();
