
export default function saveFile ({ name = 'download.json', data, type = 'data:application/json' }) {
  if (data != null && navigator.msSaveBlob) {
    return navigator.msSaveBlob(new Blob([data], { type: type }), name)
  }

  let a = document.createElement('a')
  a.style.display = 'none'

  var url = window.URL.createObjectURL(new Blob([data], { type }))
  a.href = url
  a.download = name

  document.body.append(a)
  a.click()

  setTimeout(() => {
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }, 500)
}
