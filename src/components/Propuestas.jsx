import React from 'react';

const Propuestas = () => {
  const propuestas = [
    {
      tipo: "Técnica",
      descripcion: "Implementación de un sistema digital de gestión de eventos (CRM especializado) que automatice cotizaciones, control de clientes y seguimiento post-evento.",
      objetivo: "Optimizar los procesos administrativos y mejorar la eficiencia operativa.",
      icon: "💻",
      color: "from-blue-500 to-blue-600"
    },
    {
      tipo: "Estratégica",
      descripcion: "Desarrollo de una campaña de marketing digital sostenible para posicionar la marca como líder en eventos eco-amigables y personalizados.",
      objetivo: "Aumentar la visibilidad, captar nuevos clientes y fortalecer la imagen de sostenibilidad de la empresa.",
      icon: "🌱",
      color: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b-4 border-emerald-500 pb-2 inline-block">
        Propuestas de Mejora
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {propuestas.map((propuesta, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className={`bg-gradient-to-r ${propuesta.color} text-white p-4`}>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{propuesta.icon}</span>
                <h3 className="text-2xl font-bold">Propuesta {propuesta.tipo}</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h4 className="font-semibold text-slate-700 mb-2">Descripción:</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{propuesta.descripcion}</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Objetivo:</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{propuesta.objetivo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-l-4 border-amber-500">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Desarrollo Técnico</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-slate-700 mb-2">🔹 CRM de Gestión de Eventos:</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Actualmente, los registros de cotización y seguimiento se realizan de manera manual. El nuevo sistema 
              permitirá automatizar los procesos, reducir tiempos de respuesta, centralizar la información y mejorar 
              la trazabilidad de cada cliente. Se requiere capacitación básica para el equipo administrativo, un 
              software en la nube (por ejemplo, Bitrix24 o HubSpot Free) y soporte inicial por parte del proveedor.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 mb-2">🔹 Marketing Digital Sostenible:</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Se desarrollará una estrategia de marketing digital basada en redes sociales y contenido visual que 
              refleje la identidad sostenible de Nativa Eventos. Incluye la creación de un calendario de publicaciones, 
              sesiones fotográficas, publicidad pagada segmentada y diseño de piezas gráficas con herramientas como 
              Canva o Meta Ads.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Propuestas;
