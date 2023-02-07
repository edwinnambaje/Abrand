const nameRegex= /^[a-zA-Z]+ [a-zA-Z]+$/;
const required= 10;

document.querySelector('#comment-form').addEventListener('submit', (event) => {
    event.preventDefault() 
    const user1= document.getElementById('user')
    const comment1= document.getElementById('comment')
    let user= document.getElementById('user').value;
    let comment= document.getElementById('comment').value;

    const commentData={
        name:user,
        comment:comment

    }
    fetch(`https://brand-acqz.onrender.com/api/posts/${id}/comment`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
            alert('Comment Added Successfully')
               location.reload()
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });
    
        user1.value= "";
        comment1.value ="";
})