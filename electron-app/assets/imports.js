const links = document.querySelectorAll('link[rel="import"]')

Array.prototype.forEach.call(links, (link) => {
  fetch(link.href).
  then(response => { if(!response.ok) throw Error(response.statusText); return response.text() }).
  then(text => {
    const div = document.createElement('replaced')
    div.innerHTML = text
    let template = div.querySelector('.task-template')
    let clone = document.importNode(template.content, true)
    document.querySelector('.content').appendChild(clone)
  }).
  catch(error => console.log(error) );
});