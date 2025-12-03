import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';

const EventosModule = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvento, setSelectedEvento] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    cliente: '',
    fecha: '',
    hora: '',
    lugar: '',
    personas: '',
    estado: 'Pendiente',
    progreso: 0,
    tareas: [],
    tipo: 'corporativo' // Default type
  });

  const fetchEventos = async () => {
    try {
      const response = await fetch(`${API_URL}/eventos`);
      const data = await response.json();
      setEventos(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching eventos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const estadoColors = {
    'Confirmado': 'bg-green-100 text-green-800',
    'En preparación': 'bg-blue-100 text-blue-800',
    'Pendiente': 'bg-amber-100 text-amber-800',
    'Cancelado': 'bg-red-100 text-red-800',
    'Completado': 'bg-purple-100 text-purple-800',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = formData.id ? 'PUT' : 'POST';
      const url = formData.id 
        ? `${API_URL}/eventos/${formData.id}`
        : `${API_URL}/eventos`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchEventos();
        setShowForm(false);
        setFormData({
          nombre: '',
          cliente: '',
          fecha: '',
          hora: '',
          lugar: '',
          personas: '',
          estado: 'Pendiente',
          progreso: 0,
          tareas: [],
          tipo: 'corporativo'
        });
      }
    } catch (error) {
      console.error('Error saving evento:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este evento?')) {
      try {
        await fetch(`${API_URL}/eventos/${id}`, {
          method: 'DELETE',
        });
        fetchEventos();
        setSelectedEvento(null);
      } catch (error) {
        console.error('Error deleting evento:', error);
      }
    }
  };

  const toggleTarea = async (eventoId, tareaId) => {
    const evento = eventos.find(e => e.id === eventoId);
    if (!evento) return;

    const nuevasTareas = evento.tareas.map(tarea =>
      tarea.id === tareaId ? { ...tarea, completada: !tarea.completada } : tarea
    );
    const tareasCompletadas = nuevasTareas.filter(t => t.completada).length;
    const nuevoProgreso = nuevasTareas.length > 0 ? Math.round((tareasCompletadas / nuevasTareas.length) * 100) : 0;

    const eventoActualizado = { ...evento, tareas: nuevasTareas, progreso: nuevoProgreso };

    // Optimistic update
    setEventos(eventos.map(e => e.id === eventoId ? eventoActualizado : e));
    if (selectedEvento && selectedEvento.id === eventoId) {
        setSelectedEvento(eventoActualizado);
    }

    try {
      await fetch(`${API_URL}/eventos/${eventoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventoActualizado),
      });
    } catch (error) {
      console.error('Error updating tarea:', error);
      fetchEventos(); // Revert on error
    }
  };

  const openEditForm = (evento) => {
    setFormData(evento);
    setShowForm(true);
    setSelectedEvento(null);
  };

  // Helper to add a task in the form
  const addTaskToForm = () => {
    const newTask = { id: Date.now(), descripcion: '', completada: false };
    setFormData({ ...formData, tareas: [...formData.tareas, newTask] });
  };

  const updateTaskInForm = (id, descripcion) => {
    const newTareas = formData.tareas.map(t => t.id === id ? { ...t, descripcion } : t);
    setFormData({ ...formData, tareas: newTareas });
  };

  const removeTaskFromForm = (id) => {
    const newTareas = formData.tareas.filter(t => t.id !== id);
    setFormData({ ...formData, tareas: newTareas });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800">Gestión de Eventos</h2>
        <div className="flex gap-3">
          <button 
            onClick={() => {
              setFormData({
                nombre: '',
                cliente: '',
                fecha: '',
                hora: '',
                lugar: '',
                personas: '',
                estado: 'Pendiente',
                progreso: 0,
                tareas: [],
                tipo: 'corporativo'
              });
              setShowForm(true);
            }}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            + Nuevo Evento
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4">
          <div className="text-sm opacity-90 mb-1">Total Eventos</div>
          <div className="text-2xl font-bold">{eventos.length}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4">
          <div className="text-sm opacity-90 mb-1">Confirmados</div>
          <div className="text-2xl font-bold">{eventos.filter(e => e.estado === 'Confirmado').length}</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl p-4">
          <div className="text-sm opacity-90 mb-1">En Preparación</div>
          <div className="text-2xl font-bold">{eventos.filter(e => e.estado === 'En preparación').length}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4">
          <div className="text-sm opacity-90 mb-1">Personas Total</div>
          <div className="text-2xl font-bold">{eventos.reduce((sum, e) => sum + Number(e.personas || 0), 0)}</div>
        </div>
      </div>

      {/* Lista de Eventos */}
      {loading ? (
        <div className="text-center py-10">Cargando eventos...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {eventos.map((evento) => (
            <div key={evento.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold">{evento.nombre}</h3>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${estadoColors[evento.estado] || 'bg-gray-100 text-gray-800'}`}>
                    {evento.estado}
                  </span>
                </div>
                <p className="text-sm opacity-90">👤 {evento.cliente}</p>
              </div>

              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-slate-500">📅 Fecha:</span>
                    <p className="font-semibold text-slate-800">{evento.fecha ? new Date(evento.fecha).toLocaleDateString('es-CL') : 'Sin fecha'}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">🕐 Hora:</span>
                    <p className="font-semibold text-slate-800">{evento.hora}</p>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-slate-500">📍 Lugar:</span>
                  <p className="font-semibold text-slate-800">{evento.lugar}</p>
                </div>

                <div className="text-sm">
                  <span className="text-slate-500">👥 Personas:</span>
                  <p className="font-semibold text-slate-800">{evento.personas} invitados</p>
                </div>

                {/* Barra de Progreso */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">Progreso del Evento</span>
                    <span className="text-sm font-bold text-emerald-600">{evento.progreso || 0}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${evento.progreso || 0}%` }}
                    ></div>
                  </div>
                </div>

                {/* Tareas Preview */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Tareas Pendientes:</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {evento.tareas && evento.tareas.slice(0, 3).map((tarea) => (
                      <label key={tarea.id} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={tarea.completada}
                          onChange={() => toggleTarea(evento.id, tarea.id)}
                          className="w-4 h-4 text-emerald-500 focus:ring-emerald-500 rounded"
                        />
                        <span className={`text-sm ${tarea.completada ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                          {tarea.descripcion}
                        </span>
                      </label>
                    ))}
                    {evento.tareas && evento.tareas.length > 3 && (
                        <p className="text-xs text-slate-500 pl-2">... y {evento.tareas.length - 3} más</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedEvento(evento)}
                  className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Ver Detalles Completos
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">{formData.id ? 'Editar Evento' : 'Nuevo Evento'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Nombre Evento</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className="w-full border rounded p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Cliente</label>
                  <input type="text" name="cliente" value={formData.cliente} onChange={handleInputChange} className="w-full border rounded p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Fecha</label>
                  <input type="date" name="fecha" value={formData.fecha} onChange={handleInputChange} className="w-full border rounded p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Hora</label>
                  <input type="time" name="hora" value={formData.hora} onChange={handleInputChange} className="w-full border rounded p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Lugar</label>
                  <input type="text" name="lugar" value={formData.lugar} onChange={handleInputChange} className="w-full border rounded p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Personas</label>
                  <input type="number" name="personas" value={formData.personas} onChange={handleInputChange} className="w-full border rounded p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Estado</label>
                  <select name="estado" value={formData.estado} onChange={handleInputChange} className="w-full border rounded p-2">
                    <option value="Pendiente">Pendiente</option>
                    <option value="En preparación">En preparación</option>
                    <option value="Confirmado">Confirmado</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Completado">Completado</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Tipo</label>
                  <select name="tipo" value={formData.tipo} onChange={handleInputChange} className="w-full border rounded p-2">
                    <option value="matrimonio">Matrimonio</option>
                    <option value="corporativo">Corporativo</option>
                    <option value="cumpleaños">Cumpleaños</option>
                    <option value="aniversario">Aniversario</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tareas</label>
                {formData.tareas.map((tarea) => (
                  <div key={tarea.id} className="flex gap-2 mb-2">
                    <input 
                      type="text" 
                      value={tarea.descripcion} 
                      onChange={(e) => updateTaskInForm(tarea.id, e.target.value)}
                      className="flex-1 border rounded p-2"
                      placeholder="Descripción de la tarea"
                    />
                    <button type="button" onClick={() => removeTaskFromForm(tarea.id)} className="text-red-500 px-2">✕</button>
                  </div>
                ))}
                <button type="button" onClick={addTaskToForm} className="text-sm text-emerald-600 font-semibold">+ Agregar Tarea</button>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-slate-200 rounded hover:bg-slate-300">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Detalles */}
      {selectedEvento && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{selectedEvento.nombre}</h3>
                <p className="text-slate-600 mt-1">Cliente: {selectedEvento.cliente}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEditForm(selectedEvento)} className="text-blue-500 hover:text-blue-700">✏️ Editar</button>
                <button onClick={() => handleDelete(selectedEvento.id)} className="text-red-500 hover:text-red-700">🗑️ Eliminar</button>
                <button
                    onClick={() => setSelectedEvento(null)}
                    className="text-slate-400 hover:text-slate-600 text-2xl ml-4"
                >
                    ✕
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <span className="text-sm text-slate-500">Fecha del Evento</span>
                  <p className="text-lg font-semibold text-slate-800">{selectedEvento.fecha ? new Date(selectedEvento.fecha).toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Sin fecha'}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <span className="text-sm text-slate-500">Hora</span>
                  <p className="text-lg font-semibold text-slate-800">{selectedEvento.hora}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg md:col-span-2">
                  <span className="text-sm text-slate-500">Ubicación</span>
                  <p className="text-lg font-semibold text-slate-800">{selectedEvento.lugar}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <span className="text-sm text-slate-500">Número de Invitados</span>
                  <p className="text-lg font-semibold text-slate-800">{selectedEvento.personas} personas</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <span className="text-sm text-slate-500">Estado</span>
                  <p className="text-lg font-semibold text-slate-800">{selectedEvento.estado}</p>
                </div>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded">
                <h4 className="font-semibold text-slate-800 mb-2">Progreso General: {selectedEvento.progreso || 0}%</h4>
                <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full rounded-full"
                    style={{ width: `${selectedEvento.progreso || 0}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Lista de Tareas</h4>
                <div className="space-y-2">
                  {selectedEvento.tareas && selectedEvento.tareas.map((tarea) => (
                    <div key={tarea.id} className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
                      <input
                        type="checkbox"
                        checked={tarea.completada}
                        onChange={() => toggleTarea(selectedEvento.id, tarea.id)}
                        className="w-5 h-5 text-emerald-500 focus:ring-emerald-500 rounded"
                      />
                      <span className={`flex-1 ${tarea.completada ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}>
                        {tarea.descripcion}
                      </span>
                      {tarea.completada && <span className="text-green-600">✓</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedEvento(null)}
              className="w-full mt-6 bg-slate-300 hover:bg-slate-400 text-slate-800 px-6 py-3 rounded-lg font-semibold"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventosModule;
