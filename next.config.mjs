import nextConfig from './next.config.js';

const config = {
  ...nextConfig,
  srcDir: 'src', // Tell Next to use /src as the base
};

export default config;

