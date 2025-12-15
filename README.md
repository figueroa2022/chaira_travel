# Chaira Travel - Sitio Web

Sitio web informativo para la agencia de viajes Chaira Travel ubicada en Cartagena Del Chairá, Caquetá.

## Características

- ✅ Diseño responsive y adaptable para móviles
- ✅ Modal de video al inicio con botón de cerrar
- ✅ Navegación con menú hamburguesa para móviles
- ✅ Secciones: Inicio, Acerca de Nosotros, Mapa Ruta, Paquetes, Testimonios, Contáctenos
- ✅ Botón flotante de WhatsApp
- ✅ Integración con redes sociales (Facebook, Instagram, TikTok)
- ✅ Aviso legal según Ley 679 de 2001
- ✅ Animaciones y efectos visuales
- ✅ Logo animado
- ✅ Formulario de contacto que redirige a WhatsApp

## Colores Utilizados

- **Morado Principal**: #54287f
- **Azul Secundario**: #59b4e1
- **Verde Acento**: #53b838

## Tipografía

- **Fuente Principal**: Poppins (similar a Arista Pro Alternate)
- La fuente se carga desde Google Fonts

## Archivos del Proyecto

- `index.html` - Estructura principal de la página
- `styles.css` - Estilos y animaciones
- `script.js` - Funcionalidades interactivas

## Cómo Personalizar

### 1. Agregar el Video de Inicio

Edita el archivo `index.html` y en la línea del video modal, agrega la ruta de tu video:

```html
<video id="introVideo" controls autoplay>
    <source src="ruta/a/tu/video.mp4" type="video/mp4">
</video>
```

### 2. Agregar Imágenes

Reemplaza los espacios marcados como "image-placeholder" con tus imágenes:

- Imagen principal del hero
- Imagen de "Acerca de Nosotros"
- Imagen del mapa de ruta
- Imágenes de los paquetes turísticos

### 3. Agregar Paquetes Turísticos

Puedes agregar los paquetes de dos formas:

**Opción 1: Editar directamente el HTML**
Busca la sección de paquetes y agrega más tarjetas de paquetes.

**Opción 2: Usar JavaScript**
En el archivo `script.js`, descomenta y completa la función `loadPackages()` con los datos del documento RTour Bocana.

### 4. Agregar Poster PDF

En la sección de "Promociones Especiales", puedes:
- Incrustar el PDF directamente usando un iframe
- O convertir el PDF a imagen y agregarlo como imagen

Ejemplo con iframe:
```html
<iframe src="ruta/al/poster.pdf" width="100%" height="600px"></iframe>
```

### 5. Agregar Videos de TikTok

En la sección de testimonios, puedes:
- Incrustar los videos usando el código embed de TikTok
- O usar la función `loadTikTokVideos()` en el JavaScript

### 6. Actualizar Enlaces de Redes Sociales

En el archivo `index.html`, busca los enlaces de redes sociales y actualiza los atributos `href` con las URLs reales:

```html
<a href="TU_URL_DE_FACEBOOK" class="social-link facebook" target="_blank">
<a href="TU_URL_DE_INSTAGRAM" class="social-link instagram" target="_blank">
<a href="TU_URL_DE_TIKTOK" class="social-link tiktok" target="_blank">
```

## Información de Contacto

- **Teléfono**: +57 319-398-1055
- **Email**: chairatravel2024@gmail.com
- **Ubicación**: Cartagena Del Chairá, Caquetá, Colombia
- **WhatsApp**: +57 319-398-1055

## Notas Importantes

- El modal de video solo se muestra una vez por sesión (usa sessionStorage)
- Todos los botones de WhatsApp están configurados con el número +57 319-398-1055
- El diseño es completamente responsive y se adapta a diferentes tamaños de pantalla
- Las animaciones se activan al hacer scroll

## Próximos Pasos

1. Agregar el video de inicio
2. Agregar todas las imágenes
3. Completar los paquetes turísticos del documento RTour Bocana
4. Agregar el poster PDF
5. Incrustar los videos de TikTok en testimonios
6. Actualizar los enlaces de redes sociales
7. Probar en diferentes dispositivos

## Soporte

Para cualquier pregunta o modificación, puedes contactar al desarrollador.

