import React, { useState } from 'react';

const EventosModule = () => {
  const [eventos, setEventos] = useState([
    { 
      id: 1, 
      nombre: 'Matrimonio González-Silva', 
      cliente: 'María González', 
      fecha: '2025-12-20', 
      hora: '19:00',
      lugar: 'Salón Los Arrayanes, Concepción',
      personas: 150, 
      estado: 'Confirmado',
      progreso: 75,
      tareas: [
        { id: 1, descripcion: 'Confirmar menú', completada: true },
        { id: 2, descripcion: 'Contratar fotógrafo', completada: true },
        { id: 3, descripcion: 'Decoración floral', completada: false },
        { id: 4, descripcion: 'Prueba de sonido', completada: false },
      ]
    },
    { 
      id: 2, 
      nombre: 'Evento Corporativo TechCorp', 
      cliente: 'TechCorp S.A.', 
      fecha: '2025-11-28', 
      hora: '18:30',
      lugar: 'Hotel Grand Marina, Talcahuano',
      personas: 80, 
      estado: 'En preparación',
      progreso: 45,
      tareas: [
        { id: 1, descripcion: 'Definir menú ejecutivo', completada: true },
        { id: 2, descripcion: 'Setup audiovisual', completada: false },
        { id: 3, descripcion: 'Material corporativo', completada: false },
      ]
    },
    { 
      id: 3, 
      nombre: 'Cumpleaños 50 años', 
      cliente: 'Carlos Ramírez', 
      fecha: '2025-12-02', 
      hora: '20:00',
      lugar: 'Restaurant El Mirador, Concepción',
      personas: 50, 
      estado: 'Confirmado',
      progreso: 90,
      tareas: [
        { id: 1, descripcion: 'Pastel personalizado', completada: true },
        { id: 2, descripcion: 'Decoración temática', completada: true },
        { id: 3, descripcion: 'Lista de invitados', completada: true },
        { id: 4, descripcion: 'Confirmación final', completada: false },
      ]
    },
  ]);

  const [selectedEvento, setSelectedEvento] = useState(null);

  const estadoColors = {
    'Confirmado': 'bg-green-100 text-green-800',
    'En preparación': 'bg-blue-100 text-blue-800',
    'Pendiente': 'bg-amber-100 text-amber-800',
    'Cancelado': 'bg-red-100 text-red-800',
    'Completado': 'bg-purple-100 text-purple-800',
  };

  const toggleTarea = (eventoId, tareaId) => {
    setEventos(eventos.map(evento => {
      if (evento.id === eventoId) {
        const nuevasTareas = evento.tareas.map(tarea =>
          tarea.id === tareaId ? { ...tarea, completada: !tarea.completada } : tarea
        );
        const tareasCompletadas = nuevasTareas.filter(t => t.completada).length;
        const nuevoProgreso = Math.round((tareasCompletadas / nuevasTareas.length) * 100);
        return { ...evento, tareas: nuevasTareas, progreso: nuevoProgreso };
      }
      return evento;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800">Gestión de Eventos</h2>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option>Todos los estados</option>
            <option>Confirmado</option>
            <option>En preparación</option>
            <option>Pendiente</option>
          </select>
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
          <div className="text-2xl font-bold">{eventos.reduce((sum, e) => sum + e.personas, 0)}</div>
        </div>
      </div>

      {/* Lista de Eventos */}
      <div className="grid md:grid-cols-2 gap-6">
        {eventos.map((evento) => (
          <div key={evento.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold">{evento.nombre}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${estadoColors[evento.estado]}`}>
                  {evento.estado}
                </span>
              </div>
              <p className="text-sm opacity-90">👤 {evento.cliente}</p>
            </div>

            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-slate-500">📅 Fecha:</span>
                  <p className="font-semibold text-slate-800">{new Date(evento.fecha).toLocaleDateString('es-CL')}</p>
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
                  <span className="text-sm font-bold text-emerald-600">{evento.progreso}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${evento.progreso}%` }}
                  ></div>
                </div>
              </div>

              {/* Tareas */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Tareas Pendientes:</h4>
                <div className="space-y-2">
                  {evento.tareas.map((tarea) => (
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

      {/* Modal de Detalles */}
      {selectedEvento && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{selectedEvento.nombre}</h3>
                <p className="text-slate-600 mt-1">Cliente: {selectedEvento.cliente}</p>
              </div>
              <button
                onClick={() => setSelectedEvento(null)}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <span className="text-sm text-slate-500">Fecha del Evento</span>
                  <p className="text-lg font-semibold text-slate-800">{new Date(selectedEvento.fecha).toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
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
                <h4 className="font-semibold text-slate-800 mb-2">Progreso General: {selectedEvento.progreso}%</h4>
                <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full rounded-full"
                    style={{ width: `${selectedEvento.progreso}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Lista de Tareas</h4>
                <div className="space-y-2">
                  {selectedEvento.tareas.map((tarea) => (
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
