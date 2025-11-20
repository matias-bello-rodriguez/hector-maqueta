import React, { useState } from 'react';

const ClientesModule = () => {
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'María González', email: 'maria@email.com', telefono: '+56912345678', empresa: 'Particular', eventos: 3, ultimoEvento: '2025-08-15' },
    { id: 2, nombre: 'Carlos Ramírez', email: 'carlos@email.com', telefono: '+56987654321', empresa: 'Particular', eventos: 1, ultimoEvento: '2025-10-20' },
    { id: 3, nombre: 'TechCorp S.A.', email: 'contacto@techcorp.cl', telefono: '+56922334455', empresa: 'Corporativo', eventos: 5, ultimoEvento: '2025-11-10' },
    { id: 4, nombre: 'Ana Martínez', email: 'ana.m@email.com', telefono: '+56933445566', empresa: 'Particular', eventos: 2, ultimoEvento: '2025-09-25' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    direccion: '',
    notas: ''
  });

  const handleAddCliente = () => {
    setSelectedCliente(null);
    setFormData({ nombre: '', email: '', telefono: '', empresa: '', direccion: '', notas: '' });
    setShowModal(true);
  };

  const handleEditCliente = (cliente) => {
    setSelectedCliente(cliente);
    setFormData({ ...cliente });
    setShowModal(true);
  };

  const handleSaveCliente = () => {
    if (selectedCliente) {
      setClientes(clientes.map(c => c.id === selectedCliente.id ? { ...c, ...formData } : c));
    } else {
      const newCliente = {
        id: clientes.length + 1,
        ...formData,
        eventos: 0,
        ultimoEvento: null
      };
      setClientes([...clientes, newCliente]);
    }
    setShowModal(false);
  };

  const handleDeleteCliente = (id) => {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      setClientes(clientes.filter(c => c.id !== id));
    }
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800">Gestión de Clientes</h2>
        <button
          onClick={handleAddCliente}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors flex items-center gap-2"
        >
          <span>➕</span> Nuevo Cliente
        </button>
      </div>

      {/* Buscador */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <input
          type="text"
          placeholder="🔍 Buscar cliente por nombre, email o empresa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Tabla de Clientes */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Nombre</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Teléfono</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Tipo</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Eventos</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredClientes.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">{cliente.nombre}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{cliente.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{cliente.telefono}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      cliente.empresa === 'Corporativo' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {cliente.empresa}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 text-center">{cliente.eventos}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleEditCliente(cliente)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDeleteCliente(cliente.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full mx-4">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              {selectedCliente ? 'Editar Cliente' : 'Nuevo Cliente'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre Completo / Empresa</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Cliente</label>
                <select
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Seleccionar...</option>
                  <option value="Particular">Particular</option>
                  <option value="Corporativo">Corporativo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Dirección</label>
                <input
                  type="text"
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Notas</label>
                <textarea
                  value={formData.notas}
                  onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSaveCliente}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold"
              >
                💾 Guardar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-800 px-6 py-3 rounded-lg font-semibold"
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientesModule;
