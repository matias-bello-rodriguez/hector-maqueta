import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';

const CalendarioModule = () => {
  const [mesActual, setMesActual] = useState(new Date());
  const [vistaActual, setVistaActual] = useState('mes'); // 'mes', 'semana', 'dia'
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch(`${API_URL}/eventos`);
        const data = await response.json();
        // Map 'nombre' to 'titulo' for compatibility
        const mappedEventos = data.map(e => ({
          ...e,
          titulo: e.nombre,
          // Ensure tipo is valid or default to 'corporativo' if missing/invalid
          tipo: ['matrimonio', 'corporativo', 'cumpleaños', 'aniversario'].includes(e.tipo) ? e.tipo : 'corporativo'
        }));
        setEventos(mappedEventos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching eventos:', error);
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const tipoColors = {
    matrimonio: { bg: 'bg-pink-500', text: 'text-pink-700', border: 'border-pink-500', light: 'bg-pink-50' },
    corporativo: { bg: 'bg-blue-500', text: 'text-blue-700', border: 'border-blue-500', light: 'bg-blue-50' },
    cumpleaños: { bg: 'bg-amber-500', text: 'text-amber-700', border: 'border-amber-500', light: 'bg-amber-50' },
    aniversario: { bg: 'bg-purple-500', text: 'text-purple-700', border: 'border-purple-500', light: 'bg-purple-50' },
  };

  const getDiasEnMes = (fecha) => {
    const year = fecha.getFullYear();
    const month = fecha.getMonth();
    const primerDia = new Date(year, month, 1);
    const ultimoDia = new Date(year, month + 1, 0);
    const diasEnMes = ultimoDia.getDate();
    const diaSemanaInicio = primerDia.getDay();
    
    return { diasEnMes, diaSemanaInicio, year, month };
  };

  const { diasEnMes, diaSemanaInicio, year, month } = getDiasEnMes(mesActual);

  const mesAnterior = () => {
    setMesActual(new Date(year, month - 1, 1));
  };

  const mesSiguiente = () => {
    setMesActual(new Date(year, month + 1, 1));
  };

  const obtenerEventosDelDia = (dia) => {
    const fechaBuscada = `${year}-${String(month + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    return eventos.filter(evento => evento.fecha === fechaBuscada);
  };

  const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const nombresDias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const hoyClick = () => {
    setMesActual(new Date());
  };

  const eventosFiltrados = filtroTipo === 'todos' 
    ? eventos 
    : eventos.filter(e => e.tipo === filtroTipo);

  const eventosProximos = eventosFiltrados
    .filter(e => new Date(e.fecha) >= new Date())
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    .slice(0, 8);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-3xl font-bold text-slate-800">Calendario de Eventos</h2>
        
        <div className="flex gap-3 items-center">
          {/* Filtro por tipo */}
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            <option value="todos">Todos los tipos</option>
            <option value="matrimonio">Matrimonios</option>
            <option value="corporativo">Corporativos</option>
            <option value="cumpleaños">Cumpleaños</option>
            <option value="aniversario">Aniversarios</option>
          </select>

          {/* Botón Hoy */}
          <button
            onClick={hoyClick}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors"
          >
            📍 Hoy
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Cargando calendario...</div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendario */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">
                {nombresMeses[month]} {year}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={mesAnterior}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold transition-colors"
                >
                  ← Anterior
                </button>
                <button
                  onClick={mesSiguiente}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold transition-colors"
                >
                  Siguiente →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {/* Encabezados días */}
              {nombresDias.map((dia, idx) => (
                <div key={dia} className={`text-center font-semibold py-2 ${
                  idx === 0 || idx === 6 ? 'text-red-600' : 'text-slate-600'
                }`}>
                  {dia}
                </div>
              ))}

              {/* Días vacíos al inicio */}
              {Array.from({ length: diaSemanaInicio }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square bg-slate-50 rounded-lg"></div>
              ))}

              {/* Días del mes */}
              {Array.from({ length: diasEnMes }).map((_, i) => {
                const dia = i + 1;
                const eventosDelDia = obtenerEventosDelDia(dia);
                const esHoy = new Date().getDate() === dia && 
                             new Date().getMonth() === month && 
                             new Date().getFullYear() === year;
                const esFinde = new Date(year, month, dia).getDay() === 0 || new Date(year, month, dia).getDay() === 6;

                return (
                  <div
                    key={dia}
                    className={`aspect-square border rounded-lg p-1.5 hover:shadow-md transition-all cursor-pointer ${
                      esHoy ? 'bg-emerald-100 border-emerald-500 border-2 ring-2 ring-emerald-200' : 
                      esFinde ? 'bg-slate-50 border-slate-200' :
                      'border-slate-200 bg-white'
                    }`}
                  >
                    <div className={`text-xs font-bold mb-0.5 ${
                      esHoy ? 'text-emerald-700' : 
                      esFinde ? 'text-red-600' :
                      'text-slate-700'
                    }`}>
                      {dia}
                    </div>
                    <div className="space-y-0.5 overflow-y-auto max-h-16">
                      {eventosDelDia.slice(0, 3).map((evento) => (
                        <div
                          key={evento.id}
                          onClick={() => setEventoSeleccionado(evento)}
                          className={`text-[10px] text-white px-1 py-0.5 rounded ${tipoColors[evento.tipo]?.bg || 'bg-gray-500'} truncate hover:opacity-80 transition-opacity cursor-pointer`}
                          title={`${evento.titulo} - ${evento.hora}`}
                        >
                          {evento.hora.substring(0, 5)}
                        </div>
                      ))}
                      {eventosDelDia.length > 3 && (
                        <div className="text-[9px] text-slate-500 font-semibold text-center">
                          +{eventosDelDia.length - 3} más
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Leyenda mejorada */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">Tipos de Eventos:</h4>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(tipoColors).map(([tipo, colors]) => (
                      <div key={tipo} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded ${colors.bg}`}></div>
                        <span className="text-sm text-slate-600 capitalize">{tipo}</span>
                        <span className="text-xs text-slate-400">
                          ({eventosFiltrados.filter(e => e.tipo === tipo).length})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-600">Total eventos en {nombresMeses[month]}</div>
                  <div className="text-3xl font-bold text-emerald-600">
                    {eventosFiltrados.filter(e => new Date(e.fecha).getMonth() === month).length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel derecho mejorado */}
          <div className="space-y-4">
            {/* Header próximos eventos */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold">Próximos Eventos</h3>
                  <p className="text-sm opacity-90">{eventosProximos.length} eventos programados</p>
                </div>
                <div className="text-4xl">📅</div>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="flex-1 bg-white/20 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">{eventosFiltrados.length}</div>
                  <div className="text-xs opacity-90">Total</div>
                </div>
                <div className="flex-1 bg-white/20 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">
                    {eventosFiltrados.filter(e => {
                      const hoy = new Date();
                      const fechaEvento = new Date(e.fecha);
                      const diff = Math.ceil((fechaEvento - hoy) / (1000 * 60 * 60 * 24));
                      return diff >= 0 && diff <= 7;
                    }).length}
                  </div>
                  <div className="text-xs opacity-90">Esta semana</div>
                </div>
              </div>
            </div>

            {/* Lista mejorada de próximos eventos */}
            <div className="bg-white rounded-xl shadow-md p-4 max-h-[600px] overflow-y-auto">
              <div className="space-y-3">
                {eventosProximos.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <div className="text-4xl mb-2">📭</div>
                    <p>No hay eventos próximos</p>
                  </div>
                ) : (
                  eventosProximos.map((evento) => {
                    const diasRestantes = Math.ceil((new Date(evento.fecha) - new Date()) / (1000 * 60 * 60 * 24));
                    const esUrgente = diasRestantes <= 3 && diasRestantes >= 0;
                    
                    return (
                      <div 
                        key={evento.id} 
                        onClick={() => setEventoSeleccionado(evento)}
                        className={`border-l-4 ${tipoColors[evento.tipo]?.border || 'border-gray-500'} ${tipoColors[evento.tipo]?.light || 'bg-gray-50'} p-4 rounded-r-lg hover:shadow-md transition-all cursor-pointer ${
                          esUrgente ? 'ring-2 ring-red-300' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-slate-800 flex-1">{evento.titulo}</h4>
                          <span className={`text-white text-xs px-2 py-1 rounded ${tipoColors[evento.tipo]?.bg || 'bg-gray-500'}`}>
                            {evento.tipo}
                          </span>
                        </div>
                        
                        <div className="space-y-1 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <span>📅</span>
                            <span>{new Date(evento.fecha).toLocaleDateString('es-CL', { 
                              weekday: 'long', 
                              day: 'numeric', 
                              month: 'long',
                              year: 'numeric'
                            })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>🕐</span>
                            <span>{evento.hora}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>📍</span>
                            <span className="text-xs">{evento.lugar}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>👥</span>
                            <span>{evento.personas} personas</span>
                          </div>
                        </div>

                        {esUrgente && (
                          <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-red-600">
                            <span>⚠️</span>
                            <span>¡Evento en {diasRestantes} día{diasRestantes !== 1 ? 's' : ''}!</span>
                          </div>
                        )}

                        {diasRestantes > 0 && (
                          <div className="mt-2 text-xs text-slate-500">
                            Faltan {diasRestantes} días
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Estadísticas del mes mejoradas */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span>📊</span> Estadísticas del Mes
              </h4>
              <div className="space-y-3">
                {Object.entries(tipoColors).map(([tipo, colors]) => {
                  const cantidad = eventosFiltrados.filter(e => e.tipo === tipo && new Date(e.fecha).getMonth() === month).length;
                  const total = eventosFiltrados.filter(e => new Date(e.fecha).getMonth() === month).length;
                  const porcentaje = total > 0 ? Math.round((cantidad / total) * 100) : 0;
                  
                  return (
                    <div key={tipo} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className={`capitalize ${colors.text} font-medium`}>{tipo}</span>
                        <span className="font-bold text-slate-800">{cantidad}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`${colors.bg} h-full rounded-full transition-all duration-300`}
                          style={{ width: `${porcentaje}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total del mes:</span>
                  <span className="font-bold text-lg text-emerald-600">
                    {eventosFiltrados.filter(e => new Date(e.fecha).getMonth() === month).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de detalles del evento */}
      {eventoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className={`${tipoColors[eventoSeleccionado.tipo]?.bg || 'bg-gray-500'} text-white p-6 rounded-t-xl`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{eventoSeleccionado.titulo}</h3>
                  <p className="text-sm opacity-90">Cliente: {eventoSeleccionado.cliente}</p>
                </div>
                <button
                  onClick={() => setEventoSeleccionado(null)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <span className="text-2xl">✕</span>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="text-sm text-slate-500 mb-1">📅 Fecha</div>
                  <div className="font-semibold text-slate-800">
                    {new Date(eventoSeleccionado.fecha).toLocaleDateString('es-CL', { 
                      weekday: 'long', 
                      day: 'numeric', 
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="text-sm text-slate-500 mb-1">🕐 Hora</div>
                  <div className="font-semibold text-slate-800">{eventoSeleccionado.hora}</div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg md:col-span-2">
                  <div className="text-sm text-slate-500 mb-1">📍 Lugar</div>
                  <div className="font-semibold text-slate-800">{eventoSeleccionado.lugar}</div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="text-sm text-slate-500 mb-1">👥 Invitados</div>
                  <div className="font-semibold text-slate-800">{eventoSeleccionado.personas} personas</div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="text-sm text-slate-500 mb-1">🏷️ Tipo</div>
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${tipoColors[eventoSeleccionado.tipo]?.bg || 'bg-gray-500'} text-white`}>
                    {eventoSeleccionado.tipo}
                  </span>
                </div>
              </div>

              {eventoSeleccionado.notas && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <div className="text-sm font-semibold text-slate-700 mb-1">📝 Notas</div>
                  <div className="text-sm text-slate-600">{eventoSeleccionado.notas}</div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
                  ✏️ Editar Evento
                </button>
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
                  📧 Contactar Cliente
                </button>
              </div>

              <button
                onClick={() => setEventoSeleccionado(null)}
                className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-3 rounded-lg font-semibold transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarioModule;
