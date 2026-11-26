// Configuración de Karma
// - Jasmine es el framework con el que se ESCRIBEN las pruebas (describe, it, expect).
// - Karma es el programa que las EJECUTA dentro de Chrome.
// - Webpack + Babel traducen el JSX de React para que Chrome lo entienda.
// - karma-coverage mide qué porcentaje del código de src/ recorren las pruebas.
//
//   npm test          -> abre Chrome, muestra los resultados y vuelve a correr si cambias un archivo
//   npm run test:ci   -> corre una sola vez, sin ventana, y deja la cobertura en coverage/index.html

const { existsSync } = require('node:fs');
const { join } = require('node:path');
const { DefinePlugin } = require('webpack');

module.exports = function (config) {
  if (process.platform === 'win32' && !process.env.CHROME_BIN) {
    const carpetas = [process.env.LOCALAPPDATA, process.env.ProgramFiles, process.env['ProgramFiles(x86)']].filter(Boolean);
    const navegadores = ['Google/Chrome/Application/chrome.exe', 'Microsoft/Edge/Application/msedge.exe'];
    const ejecutable = navegadores.flatMap((archivo) => carpetas.map((dir) => join(dir, archivo))).find(existsSync);
    if (ejecutable) process.env.CHROME_BIN = ejecutable;
  }

  config.set({
    frameworks: ['jasmine', 'webpack'],

    // Cada prueba se ejecuta con el entorno preparado por setupTests.js.
    files: [
      { pattern: 'src/test/setupTests.js', watched: false },
      'src/test/**/*.spec.js',
      // imágenes de public/, para que las tarjetas no den error 404
      { pattern: 'public/images/*', included: false, served: true, watched: false },
    ],
    proxies: {
      '/images/': '/base/public/images/',
    },

    preprocessors: {
      'src/test/**/*.js': ['webpack'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      plugins: [new DefinePlugin({ 'import.meta.env.VITE_API_URL': JSON.stringify('') })],
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
          {
            // el proyecto usa "type": "module": esto permite importar sin escribir .jsx
            test: /\.m?jsx?$/,
            resolve: { fullySpecified: false },
          },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                configFile: false,
                presets: [
                  ['@babel/preset-env', { targets: 'last 2 Chrome versions' }],
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                // marca el código de src/ para medir la cobertura (sin contar las pruebas)
                plugins: [['babel-plugin-istanbul', { include: ['src/**'], exclude: ['src/test/**'] }]],
              },
            },
          },
          // los .css no hacen falta en las pruebas y las imágenes se cargan como data URL
          { test: /\.css$/, type: 'asset/source' },
          { test: /\.(svg|png|webp|jpe?g)$/, type: 'asset/inline' },
        ],
      },
    },

    client: {
      jasmine: { random: false },
      clearContext: false,
    },

    reporters: ['spec', 'kjhtml', 'coverage'],
    specReporter: { suppressSkipped: true, showSpecTiming: true },
    coverageReporter: {
      dir: 'coverage',
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }, { type: 'json-summary' }],
    },

    browsers: ['Chrome'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
  });
};
