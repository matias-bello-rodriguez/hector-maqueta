import React from 'react';

const CartaGantt = () => {
  const actividades = [
    {
      actividad: "Diagnóstico de procesos y selección del CRM",
      duracion: 5,
      responsable: "Encargado TI",
      recursos: "Tiempo y reuniones",
      inicio: 0,
      color: "bg-blue-500"
    },
    {
      actividad: "Instalación del sistema y capacitación",
      duracion: 7,
      responsable: "Proveedor / RR.HH.",
      recursos: "Financiero $800.000",
      inicio: 5,
      color: "bg-purple-500"
    },
    {
      actividad: "Diseño de estrategia digital sostenible",
      duracion: 4,
      responsable: "Encargado Marketing",
      recursos: "Equipo creativo",
      inicio: 12,
      color: "bg-green-500"
    },
    {
      actividad: "Lanzamiento de campaña digital",
      duracion: 6,
      responsable: "Marketing / Comunicación",
      recursos: "Financiero $700.000",
      inicio: 16,
      color: "bg-amber-500"
    },
    {
      actividad: "Evaluación de resultados iniciales",
      duracion: 5,
      responsable: "Gerencia",
      recursos: "Dashboards y KPIs",
      inicio: 22,
      color: "bg-red-500"
    }
  ];

  const totalDias = 27;

  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b-4 border-emerald-500 pb-2 inline-block">
        Carta Gantt de Implementación
      </h2>

      <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
        <h3 className="text-xl font-semibold text-slate-800 mb-4 text-center">
          Cronograma de Actividades
        </h3>
        
        {/* Timeline header */}
        <div className="mb-4">
          <div className="flex gap-1 ml-80">
            {[...Array(totalDias)].map((_, i) => (
              <div key={i} className="flex-1 text-center text-xs text-slate-500 min-w-[20px]">
                {i + 1}
              </div>
            ))}
          </div>
          <div className="text-right text-xs text-slate-400 mt-1">Días</div>
        </div>

        {/* Gantt bars */}
        <div className="space-y-3">
          {actividades.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-72 flex-shrink-0">
                <p className="text-sm font-semibold text-slate-800">{item.actividad}</p>
                <p className="text-xs text-slate-500">{item.responsable}</p>
              </div>
              
              <div className="flex-1 relative h-12 bg-slate-100 rounded">
                <div 
                  className={`absolute ${item.color} h-full rounded flex items-center justify-center text-white text-xs font-semibold shadow-md`}
                  style={{
                    left: `${(item.inicio / totalDias) * 100}%`,
                    width: `${(item.duracion / totalDias) * 100}%`
                  }}
                >
                  {item.duracion} días
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabla resumen */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-700 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Actividad</th>
                <th className="px-4 py-2 text-center">Duración (días)</th>
                <th className="px-4 py-2 text-left">Responsable</th>
                <th className="px-4 py-2 text-left">Recursos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {actividades.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-4 py-2 text-slate-800">{item.actividad}</td>
                  <td className="px-4 py-2 text-center font-semibold text-slate-700">{item.duracion}</td>
                  <td className="px-4 py-2 text-slate-600">{item.responsable}</td>
                  <td className="px-4 py-2 text-slate-600">{item.recursos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CartaGantt;
