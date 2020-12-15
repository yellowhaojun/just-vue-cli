// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    autoprefixer({ overrideBrowserslist: ['last 2 versions'] })
  ]
}
