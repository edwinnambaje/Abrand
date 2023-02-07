
const articleId = location.hash.slice(1)
const accessToken = localStorage.getItem('mora')
const isLoggedIn = localStorage.getItem('isLoggedIn')
if(!isLoggedIn && !accessToken){
    window.location.assign('/html/signin.html')
}

let imageUrl = ''

document.querySelector('#picture').addEventListener('change', function () {
    const reader = new FileReader()
    reader.readAsDataURL(this.files[0])
    reader.addEventListener('load', () => {
      imageUrl = reader.result
    })
})

fetch('https://brand-acqz.onrender.com/api/posts/all')
        .then((res) => res.json())
        .then((data) => {
             const articles =data
                console.log(articles);
                if(articleId.length !== 0){
                const foundArticle = articles.filter((article) => {
                    return article._id === articleId 
                })
                console.log(foundArticle);
                data = foundArticle.length !== 0 ? foundArticle[0] : undefined
                
                document.querySelector('.blog-title').value = data.title;
                document.querySelector('#description').value = data.desc;
                imageUrl = data.image
    }
    })
    .catch(error => console.error(error));

articleId.length !== 0 ? document.querySelector('.add').textContent = 'Edit Blog' : document.querySelector('.add').textContent = 'Create Blog'

const formData = new FormData()
const title = document.querySelector('.blog-title');
const desc = document.querySelector('#description');
const image = document.querySelector('#picture')


document.querySelector('#add-blog').addEventListener('submit', (e) => {
    e.preventDefault()
    formData.append("title", title.value);
    formData.append("desc", desc.value);
    formData.append("image", image.files[0] );
    let data
    const isInEditMode = articleId.length !== 0
   
    if (isInEditMode) {
        const url=`https://brand-acqz.onrender.com/api/posts/update/${articleId}`

        fetch(url, {
            method: 'PUT',
            headers: {    
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('mora'))}`,
            },
            
            body: formData
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
                alert('Blog updated Successfully')
                // window.history.back()
                 location.assign(`/html/viewblog.html?id=${articleId}`)
            })
        .catch(error => console.error(error));
        
    } else {
        const url= 'https://brand-acqz.onrender.com/api/posts'

        fetch(url, {
            method: 'POST',
            headers: {   
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('mora'))}`,
            },
            body: formData
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            alert('Blog Created Successfully')
            location.reload()
            })
        .catch(error => console.error(error));
        
    }
})
