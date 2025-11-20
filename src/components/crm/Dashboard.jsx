import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const ventasMensuales = [
    { mes: 'Ene', ventas: 4200000, eventos: 8 },
    { mes: 'Feb', ventas: 3800000, eventos: 7 },
    { mes: 'Mar', ventas: 5100000, eventos: 10 },
    { mes: 'Abr', ventas: 4600000, eventos: 9 },
    { mes: 'May', ventas: 6200000, eventos: 12 },
    { mes: 'Jun', ventas: 5800000, eventos: 11 },
  ];

  const tipoEventos = [
    { tipo: 'Matrimonios', valor: 45, color: '#10b981' },
    { tipo: 'Corporativos', valor: 30, color: '#3b82f6' },
    { tipo: 'Cumpleaños', valor: 15, color: '#f59e0b' },
    { tipo: 'Otros', valor: 10, color: '#8b5cf6' },
  ];

  const stats = [
    { label: 'Clientes Activos', value: '127', icon: '👥', color: 'from-blue-500 to-blue-600', trend: '+12%' },
    { label: 'Eventos del Mes', value: '18', icon: '🎉', color: 'from-emerald-500 to-emerald-600', trend: '+8%' },
    { label: 'Cotizaciones Pendientes', value: '23', icon: '📝', color: 'from-amber-500 to-amber-600', trend: '+5' },
    { label: 'Ingresos del Mes', value: '$6.2M', icon: '💰', color: 'from-purple-500 to-purple-600', trend: '+18%' },
  ];

  const proximosEventos = [
    { id: 1, cliente: 'María González', evento: 'Matrimonio', fecha: '2025-11-25', estado: 'Confirmado' },
    { id: 2, cliente: 'Empresa TechCorp', evento: 'Evento Corporativo', fecha: '2025-11-28', estado: 'Pendiente' },
    { id: 3, cliente: 'Carlos Ramírez', evento: 'Cumpleaños 50 años', fecha: '2025-12-02', estado: 'Confirmado' },
    { id: 4, cliente: 'Ana Martínez', evento: 'Aniversario', fecha: '2025-12-05', estado: 'En preparación' },
  ];

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
          <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-4">Ventas Mensuales</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ventasMensuales}>
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
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={tipoEventos}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ tipo, valor }) => `${tipo} ${valor}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="valor"
              >
                {tipoEventos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
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
              {proximosEventos.map((evento) => (
                <tr key={evento.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-800 font-medium">{evento.cliente}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{evento.evento}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
