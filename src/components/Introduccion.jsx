import React from 'react';

const Introduccion = () => {
  return (
    <section className="bg-white rounded-xl shadow-md p-8 mb-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-4 border-b-4 border-emerald-500 pb-2 inline-block">
        Introducción
      </h2>
      <p className="text-slate-700 leading-relaxed text-justify">
        Este informe corresponde a la <strong>Unidad 2 del Proyecto de Título Profesional</strong>, en el marco de la 
        asignatura GAIT02. Su propósito es diseñar e implementar propuestas técnicas y estratégicas de mejora para la 
        empresa <strong>Nativa Eventos</strong>, considerando su contexto, análisis FODA y diagnóstico previo. La empresa 
        se dedica a la producción de eventos gastronómicos y servicios de banquetería en la <strong>Región del Biobío</strong>. 
        Las propuestas buscan optimizar procesos internos, incorporar sostenibilidad y fortalecer la posición competitiva 
        de la empresa en el mercado regional.
      </p>
    </section>
  );
};

export default Introduccion;
