import React from 'react';

const AnalisisFinanciero = () => {
  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b-4 border-emerald-500 pb-2 inline-block">
        Análisis Financiero y ROI
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg p-6">
          <div className="text-center">
            <p className="text-sm opacity-90 mb-2">Inversión Total</p>
            <p className="text-5xl font-bold">$1.500.000</p>
            <p className="text-xs opacity-75 mt-2">CLP</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg p-6">
          <div className="text-center">
            <p className="text-sm opacity-90 mb-2">Beneficios Proyectados (12 meses)</p>
            <p className="text-5xl font-bold">$2.900.000</p>
            <p className="text-xs opacity-75 mt-2">CLP</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Cálculos Financieros</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <span className="text-2xl">📊</span>
            <div className="flex-1">
              <p className="font-semibold text-slate-800 mb-1">Beneficio Neto Anual</p>
              <p className="text-slate-600 text-sm mb-2">
                $2.900.000 − $1.500.000 = <span className="font-bold text-green-600">$1.400.000</span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <span className="text-2xl">📈</span>
            <div className="flex-1">
              <p className="font-semibold text-slate-800 mb-1">Beneficio Neto Mensual Promedio</p>
              <p className="text-slate-600 text-sm mb-2">
                $1.400.000 ÷ 12 = <span className="font-bold text-green-600">$116.667</span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border-l-4 border-amber-500">
            <span className="text-2xl">💰</span>
            <div className="flex-1">
              <p className="font-semibold text-slate-800 mb-1">ROI Mensual</p>
              <p className="text-slate-600 text-sm mb-2">
                ($116.667 ÷ $1.500.000) × 100 = <span className="font-bold text-emerald-600 text-2xl">7,78%</span>
              </p>
              <p className="text-xs text-slate-500 italic">
                Cada mes se recupera un 7,78% de la inversión inicial
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border-l-4 border-emerald-500">
            <span className="text-2xl">🎯</span>
            <div className="flex-1">
              <p className="font-semibold text-slate-800 mb-1">ROI Anual Equivalente</p>
              <p className="text-slate-600 text-sm mb-2">
                7,78% × 12 = <span className="font-bold text-emerald-600 text-3xl">93,3%</span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
            <span className="text-2xl">⏱️</span>
            <div className="flex-1">
              <p className="font-semibold text-slate-800 mb-1">Tiempo de Recuperación (Payback)</p>
              <p className="text-slate-600 text-sm mb-2">
                $1.500.000 ÷ $116.667 ≈ <span className="font-bold text-blue-600 text-2xl">12,86 meses</span>
              </p>
              <p className="text-xs text-slate-500 italic">
                Aproximadamente 12 meses y 25 días
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-3">🎓 Evaluación del Impacto Estratégico</h3>
        <p className="leading-relaxed text-sm opacity-95">
          Ambas propuestas aportan valor estratégico significativo. La digitalización del CRM mejora la competitividad 
          al optimizar tiempos y reducir errores administrativos. La campaña digital sostenible fortalece la percepción 
          de marca y contribuye a la sostenibilidad ambiental mediante el uso responsable de recursos y mensajes coherentes 
          con los valores corporativos.
        </p>
      </div>
    </section>
  );
};

export default AnalisisFinanciero;
