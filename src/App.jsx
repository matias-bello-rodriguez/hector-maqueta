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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            {/* Botón hamburguesa móvil */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            <div className="flex-1 lg:flex-none">
              <h1 className="text-xl md:text-3xl font-bold">Nativa Eventos CRM</h1>
              <p className="text-xs md:text-sm opacity-90 mt-1 hidden sm:block">Sistema de Gestión de Eventos y Banquetería</p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-sm opacity-90">Región del Biobío</p>
              <p className="text-xs opacity-75">Proyecto de Título GAIT02</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Overlay móvil */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white shadow-lg min-h-screen
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <nav className="p-4">
            <div className="space-y-2">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => {
                    setActiveModule(module.id);
                    setSidebarOpen(false);
                  }}
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
        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full">
          {renderModule()}
        </main>
      </div>
    </div>
  );
}

export default App;

