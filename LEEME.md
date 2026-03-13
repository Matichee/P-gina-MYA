# MyA Tecnoservice — Deploy en Netlify

## Estructura
```
netlify-mya/
├── index.html                  ← la página web
├── netlify.toml                ← configuración de Netlify
└── netlify/
    └── functions/
        └── chat.js             ← backend seguro del bot (usa Gemini)
```

## Pasos para subir a Netlify

### 1. Obtener la API Key de Gemini (gratis)
- Entrá a https://aistudio.google.com
- Iniciá sesión con tu cuenta de Google
- Hacé click en "Get API Key" y copiala

### 2. Crear cuenta en Netlify
Entrá a https://netlify.com y creá una cuenta gratis.

### 3. Subir la carpeta
- En el dashboard de Netlify, hacé click en "Add new site" → "Deploy manually"
- Arrastrá la carpeta `netlify-mya` completa al área que te muestra

### 4. Agregar la API Key
- Andá a: Site configuration → Environment variables
- Hacé click en "Add a variable"
- Nombre: GEMINI_API_KEY
- Valor: tu API key de Gemini

### 5. Redeploy
- Andá a Deploys y hacé click en "Trigger deploy"

¡Listo! El bot funciona gratis con Gemini.
