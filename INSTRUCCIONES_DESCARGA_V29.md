# 📥 INSTRUCCIONES PARA CREAR SISTEMA V29 MANUALMENTE

## 🚨 PROBLEMA: Download Code no funciona
El botón "Download Code" de v0 a veces falla. Aquí tienes la solución completa.

## 📁 ESTRUCTURA DE CARPETAS A CREAR

\`\`\`
universidad-v29/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── estudiantes/
│   │   ├── page.tsx
│   │   └── nuevo/
│   │       └── page.tsx
│   ├── api/
│   │   ├── estudiantes/
│   │   │   └── route.ts
│   │   ├── aspirantes/
│   │   │   └── route.ts
│   │   └── auth/
│   │       └── login/
│   │           └── route.ts
│   └── dashboard/
│       └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── badge.tsx
│   │   ├── select.tsx
│   │   ├── textarea.tsx
│   │   ├── tabs.tsx
│   │   ├── dialog.tsx
│   │   ├── progress.tsx
│   │   └── checkbox.tsx
│   └── auth-provider.tsx
├── lib/
│   ├── database-local.ts
│   ├── utils.ts
│   └── sqlite-client.ts
├── scripts/
│   ├── complete-setup-v29.bat
│   ├── init-production.js
│   ├── setup-university.js
│   ├── install-check.js
│   ├── backup-database.js
│   └── create-admin.js
├── hooks/
│   └── use-mobile.tsx
├── public/
│   └── placeholder.svg
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── components.json
└── README_V29.md
\`\`\`

## 🛠️ PASOS PARA CREAR MANUALMENTE

### Paso 1: Crear carpeta principal
\`\`\`cmd
mkdir C:\universidad-v29
cd C:\universidad-v29
\`\`\`

### Paso 2: Crear estructura de carpetas
\`\`\`cmd
mkdir app
mkdir app\api
mkdir app\api\estudiantes
mkdir app\api\aspirantes
mkdir app\api\auth
mkdir app\api\auth\login
mkdir app\estudiantes
mkdir app\estudiantes\nuevo
mkdir app\dashboard
mkdir components
mkdir components\ui
mkdir lib
mkdir scripts
mkdir hooks
mkdir public
\`\`\`

### Paso 3: Copiar archivos desde v0
1. Ve a cada archivo en el chat de v0
2. Copia el contenido completo
3. Pega en un archivo nuevo con el nombre correcto
4. Guarda en la carpeta correspondiente

### Paso 4: Archivos principales a copiar
- ✅ package.json (con dependencias V29)
- ✅ app/page.tsx (página principal V29)
- ✅ app/layout.tsx (layout principal)
- ✅ lib/database-local.ts (base de datos SQLite)
- ✅ scripts/complete-setup-v29.bat (instalación)
- ✅ Todos los componentes UI de shadcn

### Paso 5: Ejecutar instalación
\`\`\`cmd
cd C:\universidad-v29
scripts\complete-setup-v29.bat
\`\`\`

## 🎯 ALTERNATIVA: ARCHIVOS INDIVIDUALES
Si prefieres, puedo darte cada archivo por separado para que los copies uno por uno.

## 📞 SOPORTE
Si tienes problemas, dime qué archivo específico necesitas y te lo proporciono completo.
