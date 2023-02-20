
let formError = document.querySelector(".form_error")
const passwordRegex= /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const url = 'https://brand-acqz.onrender.com/api/auth/register'
document.querySelector('#form_login').addEventListener('submit', (e) => {
    e.preventDefault()
    const username= e.target.elements['username'].value;
    const email= e.target.elements['email'].value;
    const password= e.target.elements['password'].value;
    const loginData = {
        username:username,
        email: email,
        password: password
    }
    if(loginData.username === ""){
        Swal.fire(
            'Opps..!',
            'Username is Empty!',
            'error'
        );
    }
    if(loginData.email === ""){
        Swal.fire(
            'Opps..!',
            'Email is Empty!',
            'error'
        );
    }
    else if(loginData.password === ""){
        Swal.fire(
            'Opps..!',
            'Password is Empty!',
            'error'
        );
    }
    else{
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        })
        .then((response) => response.json())
        .then((data) => {
                console.log(data)
                if(data.status==="success"){
                Swal.fire(
                    'Good job!',
                    'Successfully Created an Account!',
                    'success'
                );
                setTimeout(()=>{
                    location.replace('../html/signin.html')
                    },4000)
                }
                else{
                    Swal.fire(
                        'Opps..!',
                        'Something is wrong!',
                        'error'
                    );
                }
        })
 }
});
let passwordError = document.querySelector(".password_error")

document.getElementById('input_password').addEventListener('input', (e) => {
    const password = e.target.value
    if (password.match(passwordRegex)) {
        isPasswordValid = true
        passwordError.textContent = "";
    } else if(password.length == 0){
        isPasswordValid = false
        passwordError.textContent = "Enter your password, Minimum 8 characters with at least one letter,one digit and one special character ";
    } else {
        isPasswordValid = false
        passwordError.textContent = " Password is Invalid";
    }
})
