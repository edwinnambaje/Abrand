let submitBtn = document.querySelector('.submit-btn'); 
// submit

submitBtn.addEventListener('click', ()=>{
// inputs
let name = document.getElementById('name');
let Email = document.getElementById('email');
let message = document.getElementById('message');
const url='http://localhost:3000/api/messages/create';
const query={
    username: name.value ,
    email: Email.value,
    message: message.value
};

if(name == ""){
    Swal.fire(
        'Opps..!',
        'Name is Empty!',
        'error'
    );
}
else if(Email == ""){
    Swal.fire(
        'Opps..!',
        'Email is Empty!',
        'error'
    );
}
else if(message == ""){
    Swal.fire(
        'Opps..!',
        'Message is Empty!',
        'error'
    );
}
else
{
    fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })
     Swal.fire(
            'Good job!',
            'Message Sent!',
            'success'
        );
        setTimeout(()=>{
            location.reload();
            },4000)
}
})
