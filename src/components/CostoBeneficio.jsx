import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const CostoBeneficio = () => {
  const data = [
    {
      propuesta: 'CRM Eventos',
      costo: 800000,
      beneficio: 1500000,
    },
    {
      propuesta: 'Marketing Digital',
      costo: 700000,
      beneficio: 1400000,
    },
  ];

  const riesgos = [
    {
      propuesta: "CRM de gestión de eventos",
      costo: "$800.000",
      beneficio: "$1.500.000",
      riesgo: "Resistencia del personal al cambio",
      mitigacion: "Capacitación y acompañamiento continuo"
    },
    {
      propuesta: "Marketing digital sostenible",
      costo: "$700.000",
      beneficio: "$1.400.000",
      riesgo: "Baja interacción digital",
      mitigacion: "Ajuste periódico y monitoreo de métricas"
    }
  ];

  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b-4 border-emerald-500 pb-2 inline-block">
        Análisis Costo-Beneficio
      </h2>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4 text-center">
          Comparación Costo-Beneficio (CLP)
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="propuesta" />
            <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip 
              formatter={(value) => `$${value.toLocaleString('es-CL')}`}
              contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1' }}
            />
            <Legend />
            <Bar dataKey="costo" name="Costo" fill="#ef4444" />
            <Bar dataKey="beneficio" name="Beneficio" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-center text-sm text-slate-600 mt-4 italic">
          Los beneficios proyectados superan ampliamente los costos de inversión
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-4">
          <h3 className="text-xl font-semibold">Matriz Costo-Beneficio y Mitigación de Riesgos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Propuesta</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Costo Estimado</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Beneficio Estimado</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Riesgos</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Medidas de Mitigación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {riesgos.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-800 font-medium">{item.propuesta}</td>
                  <td className="px-4 py-3 text-sm text-red-600 font-semibold">{item.costo}</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-semibold">{item.beneficio}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{item.riesgo}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{item.mitigacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CostoBeneficio;
