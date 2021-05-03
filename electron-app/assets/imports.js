import { initializeSearchElements } from "./search.js";

const links = document.querySelectorAll('link[rel="import"]')

async function runAllImports() {
  var promises = []
  console.log(links.length)
  for(let i = 0; i < links.length; i++) {
    promises.push(new Promise((resolve, reject) => {
      fetch(links[i].href)
      .then(response => { if(!response.ok) throw Error(response.statusText); return response.text() })
      .then(text => {
        console.log('import link', links[i].href)
        const div = document.createElement('replaced')
        div.innerHTML = text
        let template = div.querySelector('.task-template')
        let clone = document.importNode(template.content, true)
        document.querySelector('.content').appendChild(clone)
        resolve()
      })
      .catch(error => {
        console.log(error)
        reject()
      });
    }))
  }

    Promise.all(promises).then((results) => {
      initializeSearchElements()
    })

  // await Array.prototype.forEach.call(links, (link) => {
  //   fetch(link.href)
  //   .then(response => { if(!response.ok) throw Error(response.statusText); return response.text() })
  //   .then(text => {
  //     console.log('import link', link.href)
  //     const div = document.createElement('replaced')
  //     div.innerHTML = text
  //     let template = div.querySelector('.task-template')
  //     let clone = document.importNode(template.content, true)
  //     document.querySelector('.content').appendChild(clone)
  //   })
  //   .catch(error => console.log(error) );
  // })
  
  


  
}


runAllImports()