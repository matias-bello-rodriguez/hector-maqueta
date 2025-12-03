import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';

const CotizacionesModule = () => {
  const [cotizaciones, setCotizaciones] = useState([]);

  useEffect(() => {
    fetchCotizaciones();
  }, []);

  const fetchCotizaciones = async () => {
    try {
      const response = await fetch(`${API_URL}/cotizaciones`);
      const data = await response.json();
      setCotizaciones(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching cotizaciones:', error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    cliente: '',
    evento: '',
    fecha: '',
    personas: '',
    servicios: {
      catering: false,
      decoracion: false,
      mobiliario: false,
      personal: false,
      sonido: false,
      fotografia: false,
    },
    menuSeleccionado: '',
    observaciones: ''
  });

  const precios = {
    catering: 15000,
    decoracion: 500000,
    mobiliario: 300000,
    personal: 800000,
    sonido: 400000,
    fotografia: 600000,
  };

  const menus = [
    { id: 'basico', nombre: 'Menú Básico', precioPersona: 15000 },
    { id: 'premium', nombre: 'Menú Premium', precioPersona: 25000 },
    { id: 'gourmet', nombre: 'Menú Gourmet', precioPersona: 35000 },
  ];

  const calcularTotal = () => {
    let total = 0;
    
    // Calcular servicios
    Object.keys(formData.servicios).forEach(servicio => {
      if (formData.servicios[servicio]) {
        total += precios[servicio];
      }
    });

    // Calcular menú
    if (formData.menuSeleccionado && formData.personas) {
      const menu = menus.find(m => m.id === formData.menuSeleccionado);
      if (menu) {
        total += menu.precioPersona * parseInt(formData.personas);
      }
    }

    return total;
  };

  const handleGenerarCotizacion = async () => {
    const total = calcularTotal();
    const nuevaCotizacion = {
      cliente: formData.cliente,
      evento: formData.evento,
      fecha: formData.fecha,
      personas: parseInt(formData.personas),
      total: total,
      estado: 'Pendiente'
    };

    try {
      const response = await fetch(`${API_URL}/cotizaciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaCotizacion),
      });
      if (response.ok) {
        fetchCotizaciones();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error creating cotizacion:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      cliente: '',
      evento: '',
      fecha: '',
      personas: '',
      servicios: {
        catering: false,
        decoracion: false,
        mobiliario: false,
        personal: false,
        sonido: false,
        fotografia: false,
      },
      menuSeleccionado: '',
      observaciones: ''
    });
  };

  const handleEstadoChange = async (id, nuevoEstado) => {
    try {
      const response = await fetch(`${API_URL}/cotizaciones/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      if (response.ok) {
        fetchCotizaciones();
      }
    } catch (error) {
      console.error('Error updating cotizacion status:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800">Cotizaciones</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors flex items-center gap-2"
        >
          <span>➕</span> Nueva Cotización
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
          <div className="text-sm opacity-90 mb-2">Total Cotizaciones</div>
          <div className="text-3xl font-bold">{cotizaciones.length}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
          <div className="text-sm opacity-90 mb-2">Aprobadas</div>
          <div className="text-3xl font-bold">{cotizaciones.filter(c => c.estado === 'Aprobada').length}</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl p-6">
          <div className="text-sm opacity-90 mb-2">Valor Total</div>
          <div className="text-3xl font-bold">${(cotizaciones.reduce((sum, c) => sum + c.total, 0) / 1000000).toFixed(1)}M</div>
        </div>
      </div>

      {/* Tabla de Cotizaciones */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Cliente</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Evento</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Fecha</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Personas</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Total</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {cotizaciones.map((cotizacion) => (
                <tr key={cotizacion.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">#{cotizacion.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-800">{cotizacion.cliente}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{cotizacion.evento}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{cotizacion.fecha}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 text-center">{cotizacion.personas}</td>
                  <td className="px-6 py-4 text-sm text-slate-800 font-semibold">${cotizacion.total.toLocaleString('es-CL')}</td>
                  <td className="px-6 py-4">
                    <select
                      value={cotizacion.estado}
                      onChange={(e) => handleEstadoChange(cotizacion.id, e.target.value)}
                      className={`px-3 py-1 text-xs font-semibold rounded-full border-0 ${
                        cotizacion.estado === 'Aprobada' ? 'bg-green-100 text-green-800' :
                        cotizacion.estado === 'Pendiente' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="En revisión">En revisión</option>
                      <option value="Aprobada">Aprobada</option>
                      <option value="Rechazada">Rechazada</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">📄 PDF</button>
                    <button className="text-green-600 hover:text-green-800">📧 Enviar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nueva Cotización */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl w-full mx-4 my-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Nueva Cotización</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Información básica */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-700 border-b pb-2">Información del Evento</h4>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Cliente</label>
                  <input
                    type="text"
                    value={formData.cliente}
                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Evento</label>
                  <select
                    value={formData.evento}
                    onChange={(e) => setFormData({ ...formData, evento: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Matrimonio">Matrimonio</option>
                    <option value="Cumpleaños">Cumpleaños</option>
                    <option value="Evento Corporativo">Evento Corporativo</option>
                    <option value="Aniversario">Aniversario</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Fecha del Evento</label>
                  <input
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Número de Personas</label>
                  <input
                    type="number"
                    value={formData.personas}
                    onChange={(e) => setFormData({ ...formData, personas: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Menú</label>
                  <select
                    value={formData.menuSeleccionado}
                    onChange={(e) => setFormData({ ...formData, menuSeleccionado: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Seleccionar menú...</option>
                    {menus.map(menu => (
                      <option key={menu.id} value={menu.id}>
                        {menu.nombre} - ${menu.precioPersona.toLocaleString('es-CL')}/persona
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Servicios */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-700 border-b pb-2">Servicios Adicionales</h4>
                <div className="space-y-3">
                  {Object.keys(formData.servicios).map((servicio) => (
                    <label key={servicio} className="flex items-center gap-3 cursor-pointer bg-slate-50 p-3 rounded-lg hover:bg-slate-100">
                      <input
                        type="checkbox"
                        checked={formData.servicios[servicio]}
                        onChange={(e) => setFormData({
                          ...formData,
                          servicios: { ...formData.servicios, [servicio]: e.target.checked }
                        })}
                        className="w-5 h-5 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span className="flex-1 capitalize font-medium text-slate-700">{servicio}</span>
                      <span className="text-slate-600 font-semibold">${precios[servicio].toLocaleString('es-CL')}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Observaciones</label>
                  <textarea
                    value={formData.observaciones}
                    onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>

                {/* Total */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-lg">
                  <div className="text-sm opacity-90 mb-1">Total Cotización</div>
                  <div className="text-3xl font-bold">${calcularTotal().toLocaleString('es-CL')}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleGenerarCotizacion}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold"
              >
                💾 Generar Cotización
              </button>
              <button
                onClick={() => { setShowModal(false); resetForm(); }}
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

export default CotizacionesModule;
