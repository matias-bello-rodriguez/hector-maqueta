import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';

const ClientesModule = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await fetch(`${API_URL}/clientes`);
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Error fetching clientes:', error);
    }
  };

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

  const handleSaveCliente = async () => {
    try {
      if (selectedCliente) {
        const response = await fetch(`${API_URL}/clientes/${selectedCliente.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          fetchClientes();
        }
      } else {
        const newCliente = {
          ...formData,
          eventos: 0,
          ultimoEvento: null
        };
        const response = await fetch(`${API_URL}/clientes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCliente),
        });
        if (response.ok) {
          fetchClientes();
        }
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving cliente:', error);
    }
  };

  const handleDeleteCliente = async (id) => {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      try {
        const response = await fetch(`${API_URL}/clientes/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchClientes();
        }
      } catch (error) {
        console.error('Error deleting cliente:', error);
      }
    }
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Gestión de Clientes</h2>
        <button
          onClick={handleAddCliente}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold shadow-md transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
        >
          <span>➕</span> <span className="hidden sm:inline">Nuevo Cliente</span><span className="sm:hidden">Nuevo</span>
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
          <table className="w-full min-w-[600px]">
            <thead className="bg-slate-700 text-white">
              <tr>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-semibold">Nombre</th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-semibold hidden sm:table-cell">Email</th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-semibold hidden md:table-cell">Teléfono</th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-semibold">Tipo</th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-semibold hidden lg:table-cell">Eventos</th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredClientes.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-slate-50">
                  <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-slate-800 font-medium">{cliente.nombre}</td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-slate-600 hidden sm:table-cell">{cliente.email}</td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-slate-600 hidden md:table-cell">{cliente.telefono}</td>
                  <td className="px-3 md:px-6 py-3 md:py-4">
                    <span className={`inline-flex px-2 md:px-3 py-1 text-xs font-semibold rounded-full ${
                      cliente.empresa === 'Corporativo' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {cliente.empresa}
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-slate-600 text-center hidden lg:table-cell">{cliente.eventos}</td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCliente(cliente)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteCliente(cliente.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-4 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 md:mb-6">
              {selectedCliente ? 'Editar Cliente' : 'Nuevo Cliente'}
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Nombre Completo / Empresa</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Tipo de Cliente</label>
                <select
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
                >
                  <option value="">Seleccionar...</option>
                  <option value="Particular">Particular</option>
                  <option value="Corporativo">Corporativo</option>
                </select>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Dirección</label>
                <input
                  type="text"
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Notas</label>
                <textarea
                  value={formData.notas}
                  onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                  rows="3"
                  className="w-full px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base"
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 md:mt-6">
              <button
                onClick={handleSaveCliente}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base"
              >
                💾 Guardar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-800 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base"
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
