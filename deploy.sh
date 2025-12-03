#!/bin/bash

echo "🚀 Preparando deploy de Nativa Eventos (Full Stack)..."

# Verificar que estamos en un repositorio git
if [ ! -d .git ]; then
    echo "📦 Inicializando repositorio Git..."
    git init
    git add .
    git commit -m "Initial commit: Proyecto Nativa Eventos Full Stack"
    echo "✅ Repositorio Git creado"
else
    echo "✅ Repositorio Git ya existe"
fi

echo "📋 Instrucciones para Deploy en Render (Blueprint):"
echo "1. Ve a https://dashboard.render.com/blueprints"
echo "2. Click en 'New Blueprint Instance'"
echo "3. Conecta tu repositorio de GitHub"
echo "4. Render detectará automáticamente el archivo 'render.yaml'"
echo "5. Necesitarás configurar la variable de entorno 'FIREBASE_SERVICE_ACCOUNT' para el servicio backend."
echo ""
echo "🔑 Para obtener el valor de FIREBASE_SERVICE_ACCOUNT:"
echo "   Ejecuta este comando en Node para compactar tu JSON:"
echo "   node -e 'console.log(JSON.stringify(require(\"./backend/config/serviceAccountKey.json\")))'"
echo "   (Copia todo el output y pégalo como valor en Render)"
echo ""
echo "✨ El Blueprint creará automáticamente:"
echo "   - 1 Web Service (Backend Node.js)"
echo "   - 1 Static Site (Frontend React)"
echo "   - Configurará la URL del backend en el frontend automáticamente"

echo ""
echo "🔨 Probando build local del frontend..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build del frontend exitoso!"
else
    echo "❌ Error en el build del frontend."
    exit 1
fi

