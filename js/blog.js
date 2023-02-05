
const renderArticles = (articles) => {

    const box_container = document.querySelector('.box-container');
    box_container.innerHTML = ''
    for (const article of articles) {
        console.log(article);
        const box = document.createElement('div')
        box.setAttribute('class', 'box shadow')
        const id= document.createElement('span')
        id.setAttribute('class','hidden')    
        id.textContent=article._id
        const imgDiv = document.createElement('div')
        imgDiv.setAttribute('class', 'image')
        const img = document.createElement('img')
        img.setAttribute('src', article.image)
        const h3Likes = document.createElement('h3')
        const icon = document.createElement('i')
        icon.setAttribute('class', 'fas fa-heart')
        h3Likes.appendChild(icon)
        h3Likes.textContent = '43'
        imgDiv.appendChild(img)
        imgDiv.appendChild(h3Likes)
        const content = document.createElement('div')
        content.setAttribute('class', 'content')
        const h3Content = document.createElement('h3')
        h3Content.textContent = article.title
        const p = document.createElement('p')
        p.textContent= article.desc
        const anchor = document.createElement('a')
        anchor.setAttribute('class', 'btn')
        anchor.setAttribute('href', './viewblog.html?id='+article._id)
        anchor.textContent = 'read more'
        content.appendChild(h3Content)
        content.appendChild(p)
        content.appendChild(anchor)
        box.appendChild(id)
        box.appendChild(imgDiv)
        box.appendChild(content)
        box_container.appendChild(box)
    }
}
fetch("https://brand-acqz.onrender.com/api/posts/all")
.then((res)=>res.json())
.then((data)=>{
    renderArticles(data)
})