# Gojom Tech Test - Orlando Briceño.

![Preview del Proyecto](https://github.com/OrlandoBricenoB/gojom-tech-test/blob/main/src/docs/preview.png)

## Descripción

"GoJom requiere mostrar en un mapa de Google Maps una lista de inmuebles y poder ver sus detalles."

Al principio me emocioné al ver que debía construir toda la aplicación en Vanilla JavaScript, llevaba unos meses sin trabajar en proyectos de esta manera debido al trabajo, pero siempre me ha encantado.

Me llevó un tiempo conocer la API de Google Maps, pero al final, la pude comprender en gran medida, considero que este proyecto me ha hecho crecer y darme cuenta de lo mucho que he mejorado este año.

Sin más, espero respuesta de su parte, muchas gracias por la oportunidad.

## Retos del proyecto

Al llevar un tiempo acostumbrado a la reactividad de Svelte o React, no había pensado una manera de crear reactividad en Vanilla.

Pero, ya había trabajado con esto antes, en Svelte para crear contextos personalizados o para crear **hooks reactivos** para el manejo de una base de datos local con React Native.

Así que hice uso del patrón de diseño **Observer**, este lo utilicé tanto en reactividad para filtrar los inmuebles en el mapa, como para abrir el drawer y enviarle la data por medio del *callback* del *suscriptor*.

Por otro lado, instalé ESLint al finalizar los aspectos más importantes de la prueba porque quería evaluar qué tan acostumbrado a las reglas estaba (tenía esto en mente hace tiempo), llevaba tiempo sin programar sin linter.

## Instalación

Instalar el proyecto es muy sencillo, sea el gestor de paquetes que utilices bastará con ejecutar en el directorio:
```
# yarn
yarn

# npm
npm i
```

## Scripts del proyecto

Para montar el servidor de desarrollo
```bash
yarn dev
npm run dev
```

Para compilar el proyecto a producción.
```bash
yarn build
npm run build
```

Visualizar el proyecto compilado para producción
```bash
yarn preview
npm run preview
```

## Extensiones recomendadas de VSCode.

- ESLint: Para correr el linter del proyecto.
- Better Comments: Para resaltar los comentarios.
- Error Lens: Para visualizar los errores en cada línea.
- Git Lens: Para un manejo de git visual desde el editor y también muestra el commit que añadió la línea de código seleccionada.

## Reglas de commits

Seguí las reglas de los [commits convencionales](https://www.conventionalcommits.org/es/v1.0.0-beta.2/).

Con los tipos de commits:
- **build**: Cambios que afectan el sistema de compilación o las dependencias externas (en nuestro caso: yarn)
- **ci**: Cambios en nuestros scripts y archivos de configuración de CI (ámbitos de ejemplo: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Solo cambios en la documentación
- **feat**: Una nueva característica
- **fix**: Un bugfix
- **perf**: Un cambio de código que mejora el rendimiento
- **refactor**: Un cambio de código que no corrige un error ni agrega una característica
- **style**: Cambios que no afectan el significado del código (espacios en blanco, formato, puntos y coma innecesarios, etc.)
- **test**: Adición de pruebas faltantes o corrección de pruebas existentes
