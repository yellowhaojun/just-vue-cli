import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    autoprefixer({ overrideBrowserslist: ['last 2 versions'] })
  ]
}
