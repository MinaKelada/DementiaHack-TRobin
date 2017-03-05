var config = {
  local: {
    mode: 'local',
    port: 11030,
    connstr: 'mongodb://localhost:27017/hack',
    secret: 'secret' // will change location to somewhere hidden and encrypted when needed
  },
  staging: {
    mode: 'staging',
    port: 11040,
    connstr: 'mongodb://localhost:27017/hack',
    secret: 'secret'
  },
  production: {
    mode: 'production',
    port: 11050,
    connstr: 'mongodb://localhost:27017/hack',
    secret: 'secret'
  }
}

module.exports = function(mode) {
  return config[ mode || process.argv[2] || 'local' ] || config.local;
}
