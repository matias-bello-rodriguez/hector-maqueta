#!/bin/bash

echo "🚀 Preparando deploy de Nativa Eventos..."

# Verificar que estamos en un repositorio git
if [ ! -d .git ]; then
    echo "📦 Inicializando repositorio Git..."
    git init
    git add .
    git commit -m "Initial commit: Proyecto Nativa Eventos"
    echo "✅ Repositorio Git creado"
    echo ""
    echo "📝 Próximos pasos:"
    echo "1. Crea un repositorio en GitHub"
    echo "2. Ejecuta: git remote add origin <tu-url-de-github>"
    echo "3. Ejecuta: git branch -M main"
    echo "4. Ejecuta: git push -u origin main"
    echo ""
else
    echo "✅ Repositorio Git ya existe"
fi

echo "🔨 Probando build local..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build exitoso!"
    echo ""
    echo "🌐 Instrucciones para deploy en Render:"
    echo "1. Ve a https://render.com y crea una cuenta"
    echo "2. Click en 'New +' → 'Static Site'"
    echo "3. Conecta tu repositorio de GitHub"
    echo "4. Usa estos valores:"
    echo "   - Build Command: npm install && npm run build"
    echo "   - Publish Directory: dist"
    echo "5. Click en 'Create Static Site'"
    echo ""
    echo "✨ Tu aplicación estará disponible en pocos minutos!"
else
    echo "❌ Error en el build. Revisa los errores arriba."
    exit 1
fi
