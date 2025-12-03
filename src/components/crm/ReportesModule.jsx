import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { API_URL } from '../../config';

const ReportesModule = () => {
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

        setEventos(eventosData);
        setCotizaciones(cotizacionesData);
        setVentas(ventasData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching report data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Cálculos Dinámicos ---

  // 1. Ventas Anuales (Últimos 6 meses)
  const ventasAnuales = Array.from({ length: 6 }, (_, i) => {
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

    // Estimación de gastos (50% de ventas) y utilidad
    const gastos = ventasTotal * 0.5;
    const utilidad = ventasTotal - gastos;

    return { mes: monthName, ventas: ventasTotal, gastos, utilidad };
  });

  // 2. Clientes por Tipo (Basado en Eventos)
  const clientesPorTipoData = eventos.reduce((acc, curr) => {
    const tipo = ['corporativo'].includes(curr.tipo) ? 'Corporativos' : 'Particulares';
    acc[tipo] = (acc[tipo] || 0) + 1;
    return acc;
  }, {});

  const clientesPorTipo = Object.keys(clientesPorTipoData).map(tipo => ({
    tipo,
    cantidad: clientesPorTipoData[tipo],
    color: tipo === 'Corporativos' ? '#3b82f6' : '#10b981'
  }));

  // 3. Top Servicios (Basado en Cotizaciones Aprobadas)
  const preciosServicios = {
    catering: 15000, // Precio base referencial
    decoracion: 500000,
    mobiliario: 300000,
    personal: 800000,
    sonido: 400000,
    fotografia: 600000,
  };

  const serviciosCount = cotizaciones
    .filter(c => c.estado === 'Aprobada' && c.servicios)
    .reduce((acc, curr) => {
      Object.keys(curr.servicios).forEach(servicio => {
        if (curr.servicios[servicio]) {
          acc[servicio] = (acc[servicio] || 0) + 1;
        }
      });
      return acc;
    }, {});

  const topServicios = Object.keys(serviciosCount).map(servicio => ({
    servicio: servicio.charAt(0).toUpperCase() + servicio.slice(1),
    ventas: serviciosCount[servicio] * (preciosServicios[servicio] || 0)
  })).sort((a, b) => b.ventas - a.ventas);

  // 4. KPIs
  const totalCotizaciones = cotizaciones.length;
  const cotizacionesAprobadas = cotizaciones.filter(c => c.estado === 'Aprobada').length;
  const tasaConversion = totalCotizaciones > 0 ? Math.round((cotizacionesAprobadas / totalCotizaciones) * 100) : 0;

  // Clientes recurrentes
  const clientesCount = eventos.reduce((acc, curr) => {
    acc[curr.cliente] = (acc[curr.cliente] || 0) + 1;
    return acc;
  }, {});
  const clientesRecurrentes = Object.values(clientesCount).filter(count => count > 1).length;

  const kpisAnuales = [
    { indicador: 'Cotizaciones Generadas', valor: totalCotizaciones, meta: 50, cumplimiento: Math.min(Math.round((totalCotizaciones / 50) * 100), 100) },
    { indicador: 'Tasa de Conversión', valor: tasaConversion, meta: 30, cumplimiento: Math.min(Math.round((tasaConversion / 30) * 100), 100) },
    { indicador: 'Clientes Recurrentes', valor: clientesRecurrentes, meta: 10, cumplimiento: Math.min(Math.round((clientesRecurrentes / 10) * 100), 100) },
    { indicador: 'Satisfacción Cliente', valor: 95, meta: 95, cumplimiento: 100 }, // Placeholder
  ];

  const totalVentas = ventasAnuales.reduce((sum, m) => sum + m.ventas, 0);
  const totalUtilidad = ventasAnuales.reduce((sum, m) => sum + m.utilidad, 0);
  const margenPromedio = totalVentas > 0 ? ((totalUtilidad / totalVentas) * 100).toFixed(1) : 0;

  const exportarPDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString('es-CL');

    doc.setFontSize(18);
    doc.text('Reporte Financiero y Operativo', 14, 22);
    doc.setFontSize(11);
    doc.text(`Fecha de emisión: ${date}`, 14, 30);

    // 1. Ventas Anuales
    doc.setFontSize(14);
    doc.text('Ventas Anuales (Últimos 6 meses)', 14, 40);
    
    const ventasColumns = ["Mes", "Ventas", "Gastos (Est.)", "Utilidad (Est.)"];
    const ventasRows = ventasAnuales.map(item => [
      item.mes,
      `$${item.ventas.toLocaleString('es-CL')}`,
      `$${item.gastos.toLocaleString('es-CL')}`,
      `$${item.utilidad.toLocaleString('es-CL')}`
    ]);

    doc.autoTable({
      startY: 45,
      head: [ventasColumns],
      body: ventasRows,
    });

    // 2. Top Servicios
    let finalY = doc.lastAutoTable.finalY + 10;
    doc.text('Servicios Más Vendidos', 14, finalY);

    const serviciosColumns = ["Servicio", "Ventas Estimadas"];
    const serviciosRows = topServicios.map(item => [
      item.servicio,
      `$${item.ventas.toLocaleString('es-CL')}`
    ]);

    doc.autoTable({
      startY: finalY + 5,
      head: [serviciosColumns],
      body: serviciosRows,
    });

    // 3. KPIs
    finalY = doc.lastAutoTable.finalY + 10;
    doc.text('Indicadores de Desempeño (KPIs)', 14, finalY);

    const kpiColumns = ["Indicador", "Valor Actual", "Meta", "Cumplimiento"];
    const kpiRows = kpisAnuales.map(item => [
      item.indicador,
      item.valor,
      item.meta,
      `${item.cumplimiento}%`
    ]);

    doc.autoTable({
      startY: finalY + 5,
      head: [kpiColumns],
      body: kpiRows,
    });

    doc.save(`reporte_financiero_${new Date().toISOString().slice(0,10)}.pdf`);
  };

  const exportarExcel = () => {
    const wb = XLSX.utils.book_new();

    // Hoja 1: Ventas Anuales
    const wsVentas = XLSX.utils.json_to_sheet(ventasAnuales.map(v => ({
      Mes: v.mes,
      Ventas: v.ventas,
      Gastos: v.gastos,
      Utilidad: v.utilidad
    })));
    XLSX.utils.book_append_sheet(wb, wsVentas, "Ventas Anuales");

    // Hoja 2: Top Servicios
    const wsServicios = XLSX.utils.json_to_sheet(topServicios.map(s => ({
      Servicio: s.servicio,
      Ventas: s.ventas
    })));
    XLSX.utils.book_append_sheet(wb, wsServicios, "Top Servicios");

    // Hoja 3: KPIs
    const wsKPIs = XLSX.utils.json_to_sheet(kpisAnuales.map(k => ({
      Indicador: k.indicador,
      Valor: k.valor,
      Meta: k.meta,
      Cumplimiento: `${k.cumplimiento}%`
    })));
    XLSX.utils.book_append_sheet(wb, wsKPIs, "KPIs");

    XLSX.writeFile(wb, `reporte_financiero_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  if (loading) {
    return <div className="text-center py-10">Cargando reportes...</div>;
  }

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
          <div className="text-xs opacity-75 mt-1">Basado en cotizaciones aprobadas</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
          <div className="text-sm opacity-90 mb-2">Utilidad Estimada</div>
          <div className="text-3xl font-bold">${(totalUtilidad / 1000000).toFixed(1)}M</div>
          <div className="text-xs opacity-75 mt-1">Margen estimado del 50%</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
          <div className="text-sm opacity-90 mb-2">Margen Promedio</div>
          <div className="text-3xl font-bold">{margenPromedio}%</div>
          <div className="text-xs opacity-75 mt-1">Meta: 50%</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl p-6">
          <div className="text-sm opacity-90 mb-2">Total Clientes</div>
          <div className="text-3xl font-bold">{Object.keys(clientesCount).length}</div>
          <div className="text-xs opacity-75 mt-1">Clientes únicos</div>
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
              <Line type="monotone" dataKey="utilidad" stroke="#3b82f6" strokeWidth={2} name="Utilidad Est." />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Distribución de Clientes</h3>
          {clientesPorTipo.length > 0 ? (
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
          ) : (
            <div className="h-[300px] flex items-center justify-center text-slate-400">
              No hay datos de clientes
            </div>
          )}
        </div>
      </div>

      {/* Top Servicios */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Servicios Más Vendidos (Estimado)</h3>
        {topServicios.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topServicios} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <YAxis type="category" dataKey="servicio" width={150} />
              <Tooltip formatter={(value) => `$${value.toLocaleString('es-CL')}`} />
              <Bar dataKey="ventas" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-slate-400">
            No hay datos de servicios vendidos
          </div>
        )}
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
                    <span className="text-sm text-slate-500 ml-2">/ {kpi.meta} (Meta)</span>
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
            <h4 className="font-semibold mb-2">✅ Estado Actual:</h4>
            <ul className="space-y-1 text-sm opacity-95">
              <li>• Tasa de conversión actual: {tasaConversion}%</li>
              <li>• Clientes recurrentes: {clientesRecurrentes}</li>
              <li>• Total cotizaciones generadas: {totalCotizaciones}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">📊 Proyección:</h4>
            <p className="text-sm opacity-95">
              Basado en los datos actuales, se observa una tendencia {ventasAnuales[ventasAnuales.length - 1]?.ventas > ventasAnuales[ventasAnuales.length - 2]?.ventas ? 'positiva' : 'estable'} en las ventas del último mes.
              Se recomienda enfocar esfuerzos en aumentar la tasa de conversión de cotizaciones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportesModule;
