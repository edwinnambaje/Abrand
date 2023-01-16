let submitBtn = document.querySelector('.submit-btn'); 
// submit

submitBtn.addEventListener('click', ()=>{
// inputs

let name = document.getElementById('name').value;
let Email = document.getElementById('email').value;
let message = document.getElementById('message').value;

let contact = JSON.parse(localStorage.getItem('queries')) || [];

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
    contact.push({name,Email,message });
    localStorage.setItem('queries', JSON.stringify(contact));
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
