import React, { useState } from 'react';

const POSModule = () => {
  const [carrito, setCarrito] = useState([]);
  const [cliente, setCliente] = useState(null);
  const [metodoPago, setMetodoPago] = useState('');
  const [mostrarTicket, setMostrarTicket] = useState(false);
  const [ventaActual, setVentaActual] = useState(null);
  const [busquedaCliente, setBusquedaCliente] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');

  // Clientes disponibles
  const clientes = [
    { id: 1, nombre: 'María González', email: 'maria@email.com', telefono: '+56912345678' },
    { id: 2, nombre: 'Carlos Ramírez', email: 'carlos@email.com', telefono: '+56987654321' },
    { id: 3, nombre: 'Ana Martínez', email: 'ana.m@email.com', telefono: '+56933445566' },
    { id: 4, nombre: 'TechCorp S.A.', email: 'contacto@techcorp.cl', telefono: '+56922334455' },
  ];

  // Productos y servicios disponibles
  const productos = [
    // Menús
    { id: 1, nombre: 'Menú Básico', precio: 15000, categoria: 'menu', unidad: 'persona', stock: 999, descripcion: 'Entrada + Plato principal + Postre' },
    { id: 2, nombre: 'Menú Premium', precio: 25000, categoria: 'menu', unidad: 'persona', stock: 999, descripcion: 'Entrada gourmet + Plato principal + Postre + Bebida' },
    { id: 3, nombre: 'Menú Gourmet', precio: 35000, categoria: 'menu', unidad: 'persona', stock: 999, descripcion: 'Menú completo de alta cocina' },
    { id: 4, nombre: 'Menú Vegetariano', precio: 18000, categoria: 'menu', unidad: 'persona', stock: 999, descripcion: 'Opción 100% vegetariana' },
    { id: 5, nombre: 'Menú Infantil', precio: 10000, categoria: 'menu', unidad: 'niño', stock: 999, descripcion: 'Menú especial para niños' },
    
    // Servicios
    { id: 6, nombre: 'Decoración Completa', precio: 500000, categoria: 'servicio', unidad: 'evento', stock: 10, descripcion: 'Decoración integral del espacio' },
    { id: 7, nombre: 'Mobiliario (100 pax)', precio: 300000, categoria: 'servicio', unidad: 'evento', stock: 15, descripcion: 'Mesas, sillas y mantelería' },
    { id: 8, nombre: 'Personal de Servicio', precio: 800000, categoria: 'servicio', unidad: 'evento', stock: 8, descripcion: 'Equipo completo de meseros' },
    { id: 9, nombre: 'Sonido e Iluminación', precio: 400000, categoria: 'servicio', unidad: 'evento', stock: 12, descripcion: 'Equipo profesional de audio' },
    { id: 10, nombre: 'Fotografía Profesional', precio: 600000, categoria: 'servicio', unidad: 'evento', stock: 6, descripcion: '6 horas de cobertura' },
    
    // Bebidas
    { id: 11, nombre: 'Barra Libre Premium', precio: 450000, categoria: 'bebida', unidad: 'evento', stock: 20, descripcion: 'Licores y cocteles premium' },
    { id: 12, nombre: 'Barra Básica', precio: 250000, categoria: 'bebida', unidad: 'evento', stock: 25, descripcion: 'Bebidas estándar' },
    { id: 13, nombre: 'Vino por Mesa', precio: 15000, categoria: 'bebida', unidad: 'botella', stock: 100, descripcion: 'Vino selección de la casa' },
    { id: 14, nombre: 'Champagne Brindis', precio: 25000, categoria: 'bebida', unidad: 'botella', stock: 50, descripcion: 'Champagne para brindis' },
    
    // Extras
    { id: 15, nombre: 'Torta Personalizada', precio: 150000, categoria: 'extra', unidad: 'unidad', stock: 30, descripcion: 'Torta diseño personalizado' },
    { id: 16, nombre: 'Centro de Mesa Floral', precio: 25000, categoria: 'extra', unidad: 'unidad', stock: 60, descripcion: 'Arreglo floral por mesa' },
    { id: 17, nombre: 'Candy Bar', precio: 200000, categoria: 'extra', unidad: 'evento', stock: 15, descripcion: 'Mesa de dulces completa' },
    { id: 18, nombre: 'Photobooth', precio: 180000, categoria: 'extra', unidad: 'evento', stock: 8, descripcion: 'Cabina de fotos con accesorios' },
  ];

  const categorias = [
    { id: 'todos', nombre: 'Todos', icon: '🎯' },
    { id: 'menu', nombre: 'Menús', icon: '🍽️' },
    { id: 'servicio', nombre: 'Servicios', icon: '🎭' },
    { id: 'bebida', nombre: 'Bebidas', icon: '🍷' },
    { id: 'extra', nombre: 'Extras', icon: '🎁' },
  ];

  const productosFiltrados = categoriaSeleccionada === 'todos' 
    ? productos 
    : productos.filter(p => p.categoria === categoriaSeleccionada);

  const agregarAlCarrito = (producto) => {
    const itemExistente = carrito.find(item => item.id === producto.id);
    if (itemExistente) {
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      setCarrito(carrito.filter(item => item.id !== id));
    } else {
      setCarrito(carrito.map(item =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      ));
    }
  };

  const calcularSubtotal = () => {
    return carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  const calcularIVA = () => {
    return Math.round(calcularSubtotal() * 0.19);
  };

  const calcularTotal = () => {
    return calcularSubtotal() + calcularIVA();
  };

  const procesarVenta = () => {
    if (!cliente) {
      alert('Por favor selecciona un cliente');
      return;
    }
    if (!metodoPago) {
      alert('Por favor selecciona un método de pago');
      return;
    }
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    const venta = {
      id: Date.now(),
      fecha: new Date(),
      cliente: cliente,
      items: carrito,
      subtotal: calcularSubtotal(),
      iva: calcularIVA(),
      total: calcularTotal(),
      metodoPago: metodoPago,
      estado: 'Completada'
    };

    setVentaActual(venta);
    setMostrarTicket(true);
    
    // Limpiar después de la venta
    setTimeout(() => {
      setCarrito([]);
      setCliente(null);
      setMetodoPago('');
      setMostrarTicket(false);
    }, 30000);
  };

  const imprimirTicket = () => {
    window.print();
  };

  const clientesFiltrados = clientes.filter(c => 
    c.nombre.toLowerCase().includes(busquedaCliente.toLowerCase()) ||
    c.email.toLowerCase().includes(busquedaCliente.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Punto de Venta (POS)</h2>
        <div className="text-xs md:text-sm text-slate-600">
          {new Date().toLocaleString('es-CL')}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Panel de productos */}
        <div className="lg:col-span-2 space-y-4">
          {/* Categorías */}
          <div className="bg-white rounded-xl shadow-md p-3 md:p-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categorias.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaSeleccionada(cat.id)}
                  className={`px-3 md:px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all text-xs md:text-sm ${
                    categoriaSeleccionada === cat.id
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span className="mr-1 md:mr-2">{cat.icon}</span>
                  {cat.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de productos */}
          <div className="bg-white rounded-xl shadow-md p-3 md:p-4">
            <h3 className="font-semibold text-slate-800 mb-3 md:mb-4 text-sm md:text-base">Productos y Servicios</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] md:max-h-[600px] overflow-y-auto">
              {productosFiltrados.map(producto => (
                <button
                  key={producto.id}
                  onClick={() => agregarAlCarrito(producto)}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 hover:from-emerald-50 hover:to-emerald-100 border-2 border-slate-200 hover:border-emerald-500 rounded-xl p-3 md:p-4 transition-all text-left"
                >
                  <div className="text-xl md:text-2xl mb-2">
                    {producto.categoria === 'menu' ? '🍽️' :
                     producto.categoria === 'servicio' ? '🎭' :
                     producto.categoria === 'bebida' ? '🍷' : '🎁'}
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1 text-xs md:text-sm">{producto.nombre}</h4>
                  <p className="text-xs text-slate-600 mb-2 line-clamp-2">{producto.descripcion}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-base md:text-lg font-bold text-emerald-600">
                      ${producto.precio.toLocaleString('es-CL')}
                    </span>
                    <span className="text-xs text-slate-500">/{producto.unidad}</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    Stock: {producto.stock}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Panel de carrito y checkout */}
        <div className="space-y-4">
          {/* Selección de cliente */}
          <div className="bg-white rounded-xl shadow-md p-3 md:p-4">
            <h3 className="font-semibold text-slate-800 mb-3 text-sm md:text-base">Cliente</h3>
            {!cliente ? (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="🔍 Buscar cliente..."
                  value={busquedaCliente}
                  onChange={(e) => setBusquedaCliente(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
                <div className="max-h-40 overflow-y-auto space-y-1">
                  {clientesFiltrados.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setCliente(c)}
                      className="w-full text-left px-3 py-2 bg-slate-50 hover:bg-emerald-50 rounded-lg transition-colors text-sm"
                    >
                      <div className="font-semibold text-slate-800">{c.nombre}</div>
                      <div className="text-xs text-slate-500">{c.email}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-r-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-slate-800">{cliente.nombre}</div>
                    <div className="text-xs text-slate-600">{cliente.email}</div>
                    <div className="text-xs text-slate-600">{cliente.telefono}</div>
                  </div>
                  <button
                    onClick={() => setCliente(null)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Carrito */}
          <div className="bg-white rounded-xl shadow-md p-3 md:p-4">
            <h3 className="font-semibold text-slate-800 mb-3 text-sm md:text-base">Carrito ({carrito.length})</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
              {carrito.length === 0 ? (
                <div className="text-center py-6 md:py-8 text-slate-400">
                  <div className="text-3xl md:text-4xl mb-2">🛒</div>
                  <p className="text-xs md:text-sm">Carrito vacío</p>
                </div>
              ) : (
                carrito.map(item => (
                  <div key={item.id} className="bg-slate-50 rounded-lg p-2 md:p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-semibold text-xs md:text-sm text-slate-800">{item.nombre}</div>
                        <div className="text-xs text-slate-500">${item.precio.toLocaleString('es-CL')} / {item.unidad}</div>
                      </div>
                      <button
                        onClick={() => actualizarCantidad(item.id, 0)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          className="bg-slate-200 hover:bg-slate-300 text-slate-700 w-6 h-6 md:w-7 md:h-7 rounded-lg font-bold text-sm"
                        >
                          −
                        </button>
                        <span className="text-xs md:text-sm font-semibold w-6 md:w-8 text-center">{item.cantidad}</span>
                        <button
                          onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white w-6 h-6 md:w-7 md:h-7 rounded-lg font-bold text-sm"
                        >
                          +
                        </button>
                      </div>
                      <div className="font-bold text-emerald-600 text-xs md:text-sm">
                        ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Totales */}
            <div className="border-t border-slate-200 pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Subtotal:</span>
                <span className="font-semibold">${calcularSubtotal().toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">IVA (19%):</span>
                <span className="font-semibold">${calcularIVA().toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span className="text-emerald-600">${calcularTotal().toLocaleString('es-CL')}</span>
              </div>
            </div>

            {/* Método de pago */}
            <div className="mt-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Método de Pago</label>
              <select
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Seleccionar...</option>
                <option value="efectivo">💵 Efectivo</option>
                <option value="tarjeta_debito">💳 Tarjeta de Débito</option>
                <option value="tarjeta_credito">💳 Tarjeta de Crédito</option>
                <option value="transferencia">🏦 Transferencia</option>
                <option value="credito_30">📄 Crédito 30 días</option>
              </select>
            </div>

            {/* Botones de acción */}
            <div className="mt-4 space-y-2">
              <button
                onClick={procesarVenta}
                disabled={carrito.length === 0 || !cliente || !metodoPago}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold transition-colors shadow-md text-sm md:text-base"
              >
                💰 Procesar Venta
              </button>
              <button
                onClick={() => setCarrito([])}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base"
              >
                🗑️ Vaciar Carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Ticket de Venta */}
      {mostrarTicket && ventaActual && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" id="ticket">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 md:p-6 rounded-t-xl text-center">
              <div className="text-4xl md:text-6xl mb-2">✅</div>
              <h3 className="text-xl md:text-2xl font-bold">¡Venta Exitosa!</h3>
              <p className="text-xs md:text-sm opacity-90 mt-1">Ticket #{ventaActual.id}</p>
            </div>

            <div className="p-4 md:p-6 space-y-3 md:space-y-4">
              {/* Info empresa */}
              <div className="text-center border-b border-slate-200 pb-3 md:pb-4">
                <h4 className="font-bold text-base md:text-lg text-slate-800">Nativa Eventos</h4>
                <p className="text-xs md:text-sm text-slate-600">RUT: 76.XXX.XXX-X</p>
                <p className="text-xs md:text-sm text-slate-600">Región del Biobío, Chile</p>
                <p className="text-xs text-slate-500 mt-2">
                  {ventaActual.fecha.toLocaleString('es-CL')}
                </p>
              </div>

              {/* Cliente */}
              <div className="border-b border-slate-200 pb-3">
                <p className="text-xs text-slate-500 mb-1">Cliente:</p>
                <p className="font-semibold text-sm md:text-base text-slate-800">{ventaActual.cliente.nombre}</p>
                <p className="text-xs md:text-sm text-slate-600">{ventaActual.cliente.email}</p>
              </div>

              {/* Items */}
              <div className="border-b border-slate-200 pb-3">
                <p className="text-xs text-slate-500 mb-2">Detalle:</p>
                <div className="space-y-2">
                  {ventaActual.items.map(item => (
                    <div key={item.id} className="flex justify-between text-xs md:text-sm">
                      <div className="flex-1">
                        <div className="font-medium text-slate-800">{item.nombre}</div>
                        <div className="text-xs text-slate-500">
                          {item.cantidad} × ${item.precio.toLocaleString('es-CL')}
                        </div>
                      </div>
                      <div className="font-semibold text-slate-800">
                        ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totales */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-slate-600">Subtotal:</span>
                  <span className="font-semibold">${ventaActual.subtotal.toLocaleString('es-CL')}</span>
                </div>
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-slate-600">IVA (19%):</span>
                  <span className="font-semibold">${ventaActual.iva.toLocaleString('es-CL')}</span>
                </div>
                <div className="flex justify-between text-base md:text-lg font-bold border-t pt-2">
                  <span>TOTAL:</span>
                  <span className="text-emerald-600">${ventaActual.total.toLocaleString('es-CL')}</span>
                </div>
              </div>

              {/* Método de pago */}
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <p className="text-xs text-slate-500 mb-1">Método de Pago</p>
                <p className="font-bold text-sm md:text-base text-slate-800 capitalize">{ventaActual.metodoPago.replace('_', ' ')}</p>
              </div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={imprimirTicket}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  🖨️ Imprimir
                </button>
                <button
                  onClick={() => setMostrarTicket(false)}
                  className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-800 px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  ✕ Cerrar
                </button>
              </div>

              <p className="text-center text-xs text-slate-400 mt-4">
                ¡Gracias por confiar en Nativa Eventos! 🎉
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POSModule;
