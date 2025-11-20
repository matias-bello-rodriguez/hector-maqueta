import React, { useState } from 'react';
import Dashboard from './components/crm/Dashboard';
import ClientesModule from './components/crm/ClientesModule';
import CotizacionesModule from './components/crm/CotizacionesModule';
import EventosModule from './components/crm/EventosModule';
import CalendarioModule from './components/crm/CalendarioModule';
import ReportesModule from './components/crm/ReportesModule';
import POSModule from './components/crm/POSModule';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'pos', name: 'Punto de Venta', icon: '💰' },
    { id: 'clientes', name: 'Clientes', icon: '👥' },
    { id: 'cotizaciones', name: 'Cotizaciones', icon: '📝' },
    { id: 'eventos', name: 'Eventos', icon: '🎉' },
    { id: 'calendario', name: 'Calendario', icon: '📅' },
    { id: 'reportes', name: 'Reportes', icon: '📈' },
  ];

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'pos':
        return <POSModule />;
      case 'clientes':
        return <ClientesModule />;
      case 'cotizaciones':
        return <CotizacionesModule />;
      case 'eventos':
        return <EventosModule />;
      case 'calendario':
        return <CalendarioModule />;
      case 'reportes':
        return <ReportesModule />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Nativa Eventos CRM</h1>
              <p className="text-sm opacity-90 mt-1">Sistema de Gestión de Eventos y Banquetería</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Región del Biobío</p>
              <p className="text-xs opacity-75">Proyecto de Título GAIT02</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                    activeModule === module.id
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-2xl">{module.icon}</span>
                  <span className="font-medium">{module.name}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderModule()}
        </main>
      </div>
    </div>
  );
}

export default App;

