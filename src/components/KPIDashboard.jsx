import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

const KPIDashboard = () => {
  const kpis = [
    {
      kpi: "% Cotizaciones digitalizadas",
      meta: "100% en 3 meses",
      frecuencia: "Mensual",
      responsable: "Encargado TI",
      accion: "Reentrenamiento del equipo",
      valor: 100
    },
    {
      kpi: "% Reducción de tiempos administrativos",
      meta: "30%",
      frecuencia: "Mensual",
      responsable: "Gerencia",
      accion: "Optimizar flujo de tareas",
      valor: 30
    },
    {
      kpi: "% Aumento de clientes recurrentes",
      meta: "15%",
      frecuencia: "Trimestral",
      responsable: "CRM Manager",
      accion: "Campañas de fidelización",
      valor: 15
    },
    {
      kpi: "% Alcance digital en redes",
      meta: "20% incremento mensual",
      frecuencia: "Mensual",
      responsable: "Marketing",
      accion: "Ajustar contenidos y horarios",
      valor: 20
    },
    {
      kpi: "% Satisfacción del cliente",
      meta: "95%",
      frecuencia: "Trimestral",
      responsable: "Calidad / Marketing",
      accion: "Evaluación y seguimiento personalizado",
      valor: 95
    }
  ];

  const radarData = kpis.map(kpi => ({
    subject: kpi.kpi.split(' ').slice(1, 3).join(' '),
    value: kpi.valor,
    fullMark: 100
  }));

  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b-4 border-emerald-500 pb-2 inline-block">
        Plan de Evaluación y KPIs SMART
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Radar Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4 text-center">
            Dashboard de KPIs
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#cbd5e1" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#64748b' }} />
              <Radar name="Meta %" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
          <p className="text-center text-xs text-slate-500 mt-2 italic">
            Visualización de metas de desempeño por KPI
          </p>
        </div>

        {/* KPI Cards */}
        <div className="space-y-3">
          {kpis.slice(0, 3).map((kpi, index) => (
            <div key={index} className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg p-4 shadow-md">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-xs opacity-80 mb-1">{kpi.kpi}</p>
                  <p className="text-2xl font-bold">{kpi.meta}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">{kpi.frecuencia}</span>
                </div>
              </div>
              <p className="text-xs mt-2 opacity-90">👤 {kpi.responsable}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabla completa de KPIs */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-4">
          <h3 className="text-xl font-semibold">Indicadores de Desempeño (KPIs SMART)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">KPI</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Meta</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Frecuencia</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Responsable</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Acción Correctiva</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {kpis.map((kpi, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-800 font-medium">{kpi.kpi}</td>
                  <td className="px-4 py-3 text-emerald-600 font-semibold">{kpi.meta}</td>
                  <td className="px-4 py-3 text-slate-600">{kpi.frecuencia}</td>
                  <td className="px-4 py-3 text-slate-600">{kpi.responsable}</td>
                  <td className="px-4 py-3 text-slate-600">{kpi.accion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conclusiones */}
      <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4">📋 Conclusiones</h3>
        <p className="leading-relaxed mb-4">
          Las propuestas planteadas son <strong>viables, rentables y sostenibles</strong>. La implementación del CRM 
          permitirá mejorar la gestión interna y la calidad del servicio, mientras que la estrategia digital sostenible 
          potenciará el posicionamiento de Nativa Eventos como empresa innovadora y responsable con el entorno.
        </p>
        <p className="leading-relaxed">
          Ambas acciones contribuyen a consolidar su <strong>liderazgo en el mercado regional</strong> y a generar una 
          ventaja competitiva duradera.
        </p>
      </div>
    </section>
  );
};

export default KPIDashboard;
