import * as pages from './page'

const call = function () {
  const config = arguments[0]
  if (typeof config === 'function') {
    config()
  }
  if (Object.prototype.toString.call(config) === '[object Object]' && typeof config.init === 'function') {
    config.init(config)
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  const scriptAreaElement = document.getElementById('scriptArea')
  const pageId = scriptAreaElement ? scriptAreaElement.dataset.pageId : 'index'
  const conf: Function = pages[pageId]
  if (conf) {
    if (typeof conf === 'function') {
      conf().then(function () {
        call()
      }).catch(function (err: Error) {
        console.error(err)
      })
    }
  }
})
