let url=location.href
let id= url.split('=')[1]

const apiUrl = `http://localhost:3000/api/posts/${id}`;

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


//like 
// const likeButton = document.querySelector('#like-btn');
// likeButton.addEventListener('click', () =>{
// fetch(`http://localhost:3000/api/posts/${id}/like`, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
// })
// .then((response) => response.json())
// .then((data) => {
//     console.log(data);
// })
// .catch((error) => {
//     console.error('Error:', error.message);
// });
// })

