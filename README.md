# Nativa Eventos - Sistema CRM

Sistema de Gestión de Relaciones con Clientes (CRM) para **Nativa Eventos**, empresa dedicada a la producción de eventos gastronómicos y servicios de banquetería en la Región del Biobío.

## 🎯 Sobre el Proyecto

Este CRM implementa las **propuestas de mejora técnicas** del Proyecto de Título Profesional de Administración Gastronómica (GAIT02), automatizando la gestión de clientes, cotizaciones y eventos.

### Integrantes
- Francisca Sepúlveda
- Héctor Silva

### Institución
Área Académica de Gastronomía - Octubre 2025

## ✨ Características del CRM

### 📊 Dashboard
- KPIs en tiempo real (clientes activos, eventos, cotizaciones, ingresos)
- Gráficos de ventas mensuales
- Distribución de tipos de eventos
- Lista de próximos eventos

### 👥 Gestión de Clientes
- CRUD completo de clientes
- Búsqueda y filtrado avanzado
- Historial de eventos por cliente
- Clasificación: Particulares y Corporativos

### 💰 Sistema de Cotizaciones
- Generador automático de cotizaciones
- Cálculo de precios por servicio y menú
- Gestión de estados (Pendiente, Aprobada, Rechazada)
- Exportación a PDF (en desarrollo)

### 🎉 Gestión de Eventos
- Seguimiento de eventos con estados
- Sistema de tareas y checklist
- Barra de progreso por evento
- Detalles completos de cada evento

### 📅 Calendario
- Vista mensual de eventos
- Codificación por colores según tipo
- Lista de próximos eventos
- Estadísticas mensuales

### 📈 Reportes y Métricas
- Análisis de ventas y utilidades
- KPIs de desempeño
- Servicios más vendidos
- Exportación a PDF y Excel (en desarrollo)

## 🚀 Tecnologías

- **React 19** - Framework frontend
- **Vite** - Build tool
- **Tailwind CSS 3** - Estilos
- **Recharts** - Gráficos interactivos
- **PostCSS** - Procesamiento CSS

## 📦 Instalación Local

```bash
# Clonar el repositorio
git clone <tu-repo>
cd hector-maqueta

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa del build
npm run preview
```

La aplicación estará disponible en `http://localhost:5173`

## 🌐 Deploy en Render

### Opción 1: Deploy Automático con render.yaml

1. **Sube tu código a GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: CRM Nativa Eventos"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

2. **Conecta con Render:**
   - Ve a [Render.com](https://render.com) y crea una cuenta
   - Click en "New +" → "Static Site"
   - Conecta tu repositorio de GitHub
   - Render detectará automáticamente el archivo `render.yaml`
   - Click en "Create Static Site"

### Opción 2: Configuración Manual

1. En Render, selecciona "New Static Site"
2. Conecta tu repositorio
3. Configura:
   - **Name**: `nativa-eventos-crm`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Click en "Create Static Site"

### Deploy Automático
Cada push a `main` desplegará automáticamente la nueva versión.

## 📝 Estructura del Proyecto

```
src/
├── components/
│   └── crm/
│       ├── Dashboard.jsx          # Dashboard principal con KPIs
│       ├── ClientesModule.jsx     # Gestión de clientes
│       ├── CotizacionesModule.jsx # Sistema de cotizaciones
│       ├── EventosModule.jsx      # Gestión de eventos
│       ├── CalendarioModule.jsx   # Calendario de eventos
│       └── ReportesModule.jsx     # Reportes y métricas
├── App.jsx                        # Componente principal
├── main.jsx                       # Entry point
└── index.css                      # Estilos globales
```

## 💡 Uso del Sistema

1. **Dashboard**: Vista general de métricas y próximos eventos
2. **Clientes**: Agregar, editar y gestionar base de clientes
3. **Cotizaciones**: Crear cotizaciones automáticas con cálculo de precios
4. **Eventos**: Seguimiento de eventos con tareas y progreso
5. **Calendario**: Visualización mensual de eventos programados
6. **Reportes**: Análisis de ventas, KPIs y exportación de datos

## 🔧 Personalización

### Modificar Precios
Edita los precios en `src/components/crm/CotizacionesModule.jsx`:
```javascript
const precios = {
  catering: 15000,
  decoracion: 500000,
  // ...
};
```

### Cambiar Colores
Modifica `tailwind.config.js` para personalizar la paleta de colores.

## 📊 Beneficios del CRM

✅ **Optimización de procesos**: Automatización de cotizaciones y seguimiento
✅ **Centralización**: Toda la información en un solo lugar
✅ **Trazabilidad**: Historial completo de clientes y eventos
✅ **Reportes**: Métricas en tiempo real para toma de decisiones
✅ **Eficiencia**: Reducción de tiempos administrativos en 30%

## 📄 Licencia

Este proyecto es parte de un trabajo académico del Proyecto de Título Profesional GAIT02.

---

**Desarrollado por**: Francisca Sepúlveda y Héctor Silva  
**Institución**: Área Académica de Gastronomía  
**Fecha**: Octubre 2025



## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
