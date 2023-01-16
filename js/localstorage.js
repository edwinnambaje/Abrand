// signup
document.getElementById('form_login').addEventListener('submit',(event)=>{
    var email= document.querySelector('.username').value;
    var password= document.querySelector('#input_password').value;

    var admin={
        email:email,
        password:password,
    };
    var json= JSON.stringify(admin)
    window.localStorage.setItem('email',json)
})



//get in touch
localStorage.setItem('queries', JSON.stringify([]))
document.getElementById('contact-form').addEventListener('submit',(event)=>{
    const name= document.querySelector('#name').value;
    const email= document.querySelector('#email').value;
    const message = document.querySelector('#message').value;
    const query={
        name: name,
        email:email,
        message: message,
    };
    const oldQueries = JSON.parse(localStorage.getItem('queries'))
    oldQueries.push(query)
    localStorage.setItem('queries', JSON.stringify(oldQueries))
})