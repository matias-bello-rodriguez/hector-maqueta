import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { API_URL } from '../../config';

const Dashboard = () => {
  const [eventos, setEventos] = useState([]);
  const [cotizaciones, setCotizaciones] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventosRes, cotizacionesRes, ventasRes] = await Promise.all([
          fetch(`${API_URL}/eventos`),
          fetch(`${API_URL}/cotizaciones`),
          fetch(`${API_URL}/ventas`)
        ]);

        const eventosData = await eventosRes.json();
        const cotizacionesData = await cotizacionesRes.json();
        const ventasData = await ventasRes.json();

        setEventos(Array.isArray(eventosData) ? eventosData : []);
        setCotizaciones(Array.isArray(cotizacionesData) ? cotizacionesData : []);
        setVentas(Array.isArray(ventasData) ? ventasData : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Cálculos dinámicos
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // 1. Stats Cards
  const eventosDelMes = eventos.filter(e => {
    const d = new Date(e.fecha);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length;

  const cotizacionesPendientes = cotizaciones.filter(c => c.estado === 'Pendiente').length;

  // Ingresos: Suma de totales de cotizaciones aprobadas este mes + Ventas POS
  const ingresosCotizaciones = cotizaciones
    .filter(c => {
      const d = new Date(c.fecha);
      return c.estado === 'Aprobada' && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, c) => sum + (Number(c.total) || 0), 0);

  const ingresosVentas = ventas
    .filter(v => {
      const d = new Date(v.fecha);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, v) => sum + (Number(v.total) || 0), 0);

  const ingresosDelMes = ingresosCotizaciones + ingresosVentas;

  // Clientes Activos: Clientes únicos en eventos, cotizaciones o ventas
  const clientesUnicos = new Set([
    ...eventos.map(e => e.cliente),
    ...cotizaciones.map(c => c.cliente),
    ...ventas.map(v => v.cliente?.nombre || 'Cliente POS')
  ]);
  const clientesActivos = clientesUnicos.size;

  const stats = [
    { label: 'Clientes Activos', value: clientesActivos.toString(), icon: '👥', color: 'from-blue-500 to-blue-600', trend: 'Total' },
    { label: 'Eventos del Mes', value: eventosDelMes.toString(), icon: '🎉', color: 'from-emerald-500 to-emerald-600', trend: 'Este mes' },
    { label: 'Cotizaciones Pendientes', value: cotizacionesPendientes.toString(), icon: '📝', color: 'from-amber-500 to-amber-600', trend: 'Por revisar' },
    { label: 'Ingresos del Mes', value: `$${(ingresosDelMes / 1000000).toFixed(1)}M`, icon: '💰', color: 'from-purple-500 to-purple-600', trend: 'Aprobados' },
  ];

  // 2. Ventas Mensuales (basado en cotizaciones aprobadas + ventas POS)
  const ventasMensualesData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - 5 + i);
    const month = d.getMonth();
    const year = d.getFullYear();
    const monthName = d.toLocaleString('es-CL', { month: 'short' });

    const ventasCotizaciones = cotizaciones
      .filter(c => {
        const date = new Date(c.fecha);
        return c.estado === 'Aprobada' && date.getMonth() === month && date.getFullYear() === year;
      })
      .reduce((sum, c) => sum + (Number(c.total) || 0), 0);

    const ventasPOS = ventas
      .filter(v => {
        const date = new Date(v.fecha);
        return date.getMonth() === month && date.getFullYear() === year;
      })
      .reduce((sum, v) => sum + (Number(v.total) || 0), 0);

    const ventasTotal = ventasCotizaciones + ventasPOS;

    const numEventos = eventos.filter(e => {
      const date = new Date(e.fecha);
      return date.getMonth() === month && date.getFullYear() === year;
    }).length;

    return { mes: monthName, ventas: ventasTotal, eventos: numEventos };
  });

  // 3. Distribución de Eventos
  const tiposCount = eventos.reduce((acc, curr) => {
    const tipo = curr.tipo || 'Otro';
    acc[tipo] = (acc[tipo] || 0) + 1;
    return acc;
  }, {});

  const tipoColors = {
    matrimonio: '#10b981',
    corporativo: '#3b82f6',
    cumpleaños: '#f59e0b',
    aniversario: '#8b5cf6',
    otro: '#64748b'
  };

  const tipoEventosData = Object.keys(tiposCount).map(tipo => ({
    tipo: tipo.charAt(0).toUpperCase() + tipo.slice(1),
    valor: Math.round((tiposCount[tipo] / eventos.length) * 100),
    color: tipoColors[tipo.toLowerCase()] || tipoColors.otro
  }));

  // 4. Próximos Eventos
  const proximosEventos = eventos
    .filter(e => new Date(e.fecha) >= new Date())
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    .slice(0, 5);

  if (loading) {
    return <div className="text-center py-10">Cargando dashboard...</div>;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Dashboard</h2>
        <div className="text-xs md:text-sm text-slate-600">
          Última actualización: {new Date().toLocaleString('es-CL')}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.color} text-white rounded-xl shadow-lg p-4 md:p-6 transform hover:scale-105 transition-transform`}>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <span className="text-3xl md:text-4xl">{stat.icon}</span>
              <span className="text-xs md:text-sm bg-white/20 px-2 py-1 rounded">{stat.trend}</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-xs md:text-sm opacity-90">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-4">Ventas Mensuales (Últimos 6 meses)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ventasMensualesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value) => `$${value.toLocaleString('es-CL')}`} />
              <Legend />
              <Line type="monotone" dataKey="ventas" stroke="#10b981" strokeWidth={2} name="Ventas (CLP)" />
              <Line type="monotone" dataKey="eventos" stroke="#3b82f6" strokeWidth={2} name="N° Eventos" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-4">Distribución de Eventos</h3>
          {tipoEventosData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={tipoEventosData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ tipo, valor }) => `${tipo} ${valor}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="valor"
                >
                  {tipoEventosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center text-slate-400">
              No hay datos de eventos aún
            </div>
          )}
        </div>
      </div>

      {/* Próximos Eventos */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-3 md:p-4">
          <h3 className="text-lg md:text-xl font-semibold">Próximos Eventos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Cliente</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Evento</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Fecha</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {proximosEventos.length > 0 ? (
                proximosEventos.map((evento) => (
                  <tr key={evento.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-800 font-medium">{evento.cliente}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{evento.nombre}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{new Date(evento.fecha).toLocaleDateString('es-CL')}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        evento.estado === 'Confirmado' ? 'bg-green-100 text-green-800' :
                        evento.estado === 'Pendiente' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {evento.estado}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                    No hay eventos próximos programados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
