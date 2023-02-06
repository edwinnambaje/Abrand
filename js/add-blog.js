
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
    
    // console.log(title);
    // console.log(desc);
    // console.log(image);
    //Validation
    // const title = e.target.elements['title'].value;
    // const description = e.target.elements['description'].value;
    //     if (title.match(textRegex)) {
    //     document.querySelector(".title_error").textContent = ""
    //     console.log(title)
        
    // } else if(title.length == 0){
    //     document.querySelector(".title_error").textContent = "Enter The title"
    // }else{
    //     document.querySelector(".title_error").textContent = "Title is Invalid"
    // }

    //     if (description.length-required>0) {
    //     document.querySelector(".description_error").textContent = ""
    //     console.log(description)
        
    // } else if(description.length==0){
    //     document.querySelector(".description_error").textContent = "Enter your description, Minimum 100 characters "
    // } else {
    //     document.querySelector(".description_error").textContent = " description is Invalid, Minimum 100 characters";
    // }
    //Add blog to dashboard

    // const date = Date.parse(new Date());
    // console.log(date)
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
                // location.reload()
                alert('Blog Created Successfully')
                location.assign(`/html/viewblog.html?id=${data._id}`)
            })
        .catch(error => console.error(error));
        
    }
    // e.target.elements['title'].value = ""
    // e.target.elements['desc'].value = ""
    // e.target.elements['image'].value = ""
})
