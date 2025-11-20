import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const ReportesModule = () => {
  const ventasAnuales = [
    { mes: 'Ene', ventas: 4200000, gastos: 2100000, utilidad: 2100000 },
    { mes: 'Feb', ventas: 3800000, gastos: 1900000, utilidad: 1900000 },
    { mes: 'Mar', ventas: 5100000, gastos: 2400000, utilidad: 2700000 },
    { mes: 'Abr', ventas: 4600000, gastos: 2200000, utilidad: 2400000 },
    { mes: 'May', ventas: 6200000, gastos: 2900000, utilidad: 3300000 },
    { mes: 'Jun', ventas: 5800000, gastos: 2700000, utilidad: 3100000 },
  ];

  const clientesPorTipo = [
    { tipo: 'Particulares', cantidad: 87, color: '#10b981' },
    { tipo: 'Corporativos', cantidad: 40, color: '#3b82f6' },
  ];

  const topServicios = [
    { servicio: 'Catering Completo', ventas: 12500000 },
    { servicio: 'Decoración', ventas: 8200000 },
    { servicio: 'Mobiliario', ventas: 5400000 },
    { servicio: 'Personal de Servicio', ventas: 4800000 },
    { servicio: 'Sonido e Iluminación', ventas: 3200000 },
  ];

  const kpisAnuales = [
    { indicador: 'Cotizaciones Generadas', valor: 156, meta: 180, cumplimiento: 87 },
    { indicador: 'Tasa de Conversión', valor: 68, meta: 70, cumplimiento: 97 },
    { indicador: 'Clientes Recurrentes', valor: 42, meta: 40, cumplimiento: 105 },
    { indicador: 'Satisfacción Cliente', valor: 94, meta: 95, cumplimiento: 99 },
  ];

  const totalVentas = ventasAnuales.reduce((sum, m) => sum + m.ventas, 0);
  const totalUtilidad = ventasAnuales.reduce((sum, m) => sum + m.utilidad, 0);
  const margenPromedio = ((totalUtilidad / totalVentas) * 100).toFixed(1);

  const exportarPDF = () => {
    alert('Función de exportación a PDF en desarrollo. Se generará un reporte completo con todos los gráficos y métricas.');
  };

  const exportarExcel = () => {
    alert('Función de exportación a Excel en desarrollo. Se descargará un archivo con todos los datos tabulados.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800">Reportes y Métricas</h2>
        <div className="flex gap-3">
          <button
            onClick={exportarPDF}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-colors flex items-center gap-2"
          >
            📄 Exportar PDF
          </button>
          <button
            onClick={exportarExcel}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-colors flex items-center gap-2"
          >
            📊 Exportar Excel
          </button>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl p-6">
          <div className="text-sm opacity-90 mb-2">Ventas Totales (6 meses)</div>
          <div className="text-3xl font-bold">${(totalVentas / 1000000).toFixed(1)}M</div>
          <div className="text-xs opacity-75 mt-1">↑ 18% vs. año anterior</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
          <div className="text-sm opacity-90 mb-2">Utilidad Total</div>
          <div className="text-3xl font-bold">${(totalUtilidad / 1000000).toFixed(1)}M</div>
          <div className="text-xs opacity-75 mt-1">↑ 22% vs. año anterior</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
          <div className="text-sm opacity-90 mb-2">Margen Promedio</div>
          <div className="text-3xl font-bold">{margenPromedio}%</div>
          <div className="text-xs opacity-75 mt-1">Meta: 50%</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl p-6">
          <div className="text-sm opacity-90 mb-2">Total Clientes</div>
          <div className="text-3xl font-bold">127</div>
          <div className="text-xs opacity-75 mt-1">↑ 15 nuevos este mes</div>
        </div>
      </div>

      {/* Gráficos Principales */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Evolución de Ventas y Utilidades</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ventasAnuales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value) => `$${value.toLocaleString('es-CL')}`} />
              <Legend />
              <Line type="monotone" dataKey="ventas" stroke="#10b981" strokeWidth={2} name="Ventas" />
              <Line type="monotone" dataKey="utilidad" stroke="#3b82f6" strokeWidth={2} name="Utilidad" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Distribución de Clientes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={clientesPorTipo}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ tipo, cantidad }) => `${tipo}: ${cantidad}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="cantidad"
              >
                {clientesPorTipo.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Servicios */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Servicios Más Vendidos</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topServicios} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
            <YAxis type="category" dataKey="servicio" width={150} />
            <Tooltip formatter={(value) => `$${value.toLocaleString('es-CL')}`} />
            <Bar dataKey="ventas" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* KPIs Detallados */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-4">
          <h3 className="text-xl font-semibold">Indicadores de Desempeño (KPIs)</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {kpisAnuales.map((kpi, index) => (
              <div key={index} className="border-b border-slate-200 pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-800">{kpi.indicador}</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-slate-800">{kpi.valor}</span>
                    <span className="text-sm text-slate-500 ml-2">/ {kpi.meta}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        kpi.cumplimiento >= 100 ? 'bg-green-500' : 
                        kpi.cumplimiento >= 80 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(kpi.cumplimiento, 100)}%` }}
                    ></div>
                  </div>
                  <span className={`font-semibold ${
                    kpi.cumplimiento >= 100 ? 'text-green-600' : 
                    kpi.cumplimiento >= 80 ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {kpi.cumplimiento}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resumen Ejecutivo */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4">📊 Resumen Ejecutivo</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">✅ Fortalezas Identificadas:</h4>
            <ul className="space-y-1 text-sm opacity-95">
              <li>• Crecimiento sostenido del 18% en ventas</li>
              <li>• Alta tasa de clientes recurrentes (105% de meta)</li>
              <li>• Margen de utilidad saludable (53.5%)</li>
              <li>• Satisfacción del cliente cercana a meta (94%)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">📊 Métricas Clave:</h4>
            <ul className="space-y-1 text-sm opacity-95">
              <li>• ROI promedio: 245% en eventos corporativos</li>
              <li>• Tiempo de respuesta promedio: 24 horas</li>
              <li>• Eventos completados: 98% sin incidencias</li>
              <li>• NPS (Net Promoter Score): 87 puntos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportesModule;
