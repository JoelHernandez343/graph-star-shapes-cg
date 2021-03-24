# Grafica de figuras estrelladas
## Descripción
Este programa permite graficar polígonos y polígonos estrellados dado un conjunto de puntos.

### Actualización 23 de Marzo 2021

Valida si el conjunto de puntos ordenados producen un polígono simple o no.

### Posible actualización

Falta el cálculo del Kernel de la figura para comprobar si una figura es estrellada o no, y graficar automáticamente su versión extrellada.

## Requisitos - ambiente de desarrollo
- [Nodejs](https://nodejs.org/en/) v.15.12.0 o más actual.
- NPM, viene con nodejs
- Conexión a internet para la instalación de dependencias.

## Uso - ambiente de desarrollo

Clonación del repositorio:
```bash
git clone https://github.com/JoelHernandez343/graph-star-shapes-cg.git
cd graph-star-shapes-cg
```

Se instalan las dependencias:
```bash
npm i
```

Se inicia el servidor de desarrollo (automáticamente abre el navegador)
```bash
npm start
```

Para construir la versión de producción:
```bash
npm run build
```

## Uso - sin necesidad de nodejs
Cuidado, puede que el archivo .zip contenga una versión antigua del proyecto.

Descargue el archivo [`dist.zip`](https://drive.google.com/drive/folders/1RDfikT-g2usCdKXhdH8udqDQb8f5OwMX?usp=sharing) alojado en Google Drive.

Descomprímalo y abra `index.html` con su navegador de preferencia.

## Capturas
Polígono simple:
![screenshot01](./docs/images/sc01.png)

Polígono no simple:
![screenshot02](./docs/images/sc02.png)
