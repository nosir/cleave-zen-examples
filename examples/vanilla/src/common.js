// eslint-disable-next-line no-unused-vars
const log = x => {
  document.querySelector('.logger').innerHTML += `<div>${JSON.stringify(
    x,
    null,
    4
  )}</div>`
}
