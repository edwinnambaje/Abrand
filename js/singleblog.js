let url=location.href
let id= url.split('=')[1]

const apiUrl = `https://brand-acqz.onrender.com/api/posts/${id}`;

const renderArticle = (article) => {
    document.querySelector('.box-container').innerHTML = `
    <div class="image">
        <img src="${article.image}" alt="">
    </div>              
    <div class="content">
        <h3 >${article.title}</h3>
        <p>${article.desc}</p> 
    </div> `
    document.querySelector('#likes').innerHTML = `${article.likes}`
    document.querySelector('#comments').innerHTML = `${article.comments.length}`

    let comments = '';
    for (const comment of article.comments) {
        comments = comments + `<h3>${comment.name}</h3><p>${comment.comment}</p>
        <hr>`
    }
    console.log(article.comments)
    document.querySelector('.comments').innerHTML = comments
}

fetch(apiUrl, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
.then((response) => response.json())
.then((data) => {
        renderArticle(data)
})
.catch((error) => {
    console.error('Error:', error.message);
});

const likeButton = document.querySelector('#like-btn');
likeButton.addEventListener('click', () =>{
fetch(`https://brand-acqz.onrender.com/api/posts/${id}/like`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
})
.then((response) => response.json())
.then((data) => {
    console.log(data);
    location.reload();
})
.catch((error) => {
    console.error('Error:', error.message);
});
})

