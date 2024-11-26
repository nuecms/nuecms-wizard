export default {
  vite: {
    build: {
      outDir: 'dist/public',
    }
  },
  // files for variable replacement
  varfile: {
    '/data/config.tpl': '/data/config.ts',
  },
  // variable output cache
  configfile: '/data/config.json',
  // lockfile
  lockfile: '/data/install.lock',
}
