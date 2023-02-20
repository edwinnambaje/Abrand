const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const passwordRegex= /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
let isEmailValid = false
let isPasswordValid = false

let formError = document.querySelector(".form_error")
const url = 'https://brand-acqz.onrender.com/api/auth/login'
document.querySelector('#form_login').addEventListener('submit', (e) => {
    e.preventDefault()
    const email= e.target.elements['email'].value;
    const password= e.target.elements['password'].value;
    const loginData = {
        email: email,
        password: password
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
    if(isEmailValid && isPasswordValid){
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        })
        .then((response) => response.json())
        .then((data) => {
                const accessToken = data.token; 
                if(data.data.password ===loginData.password && data.data.email === loginData.email){
                if(data.data.role === "admin"){
                localStorage.setItem('mora', JSON.stringify(accessToken))
                localStorage.setItem("isLoggedIn", JSON.stringify(true))
                Swal.fire(
                    'Good job!',
                    'Successfully Logged in as an Admin!',
                    'success'
                );
                setTimeout(()=>{
                    location.replace('../html/dashboard.html')
                    },4000)
                }
                else if(data.data.role === "user"){
                    localStorage.setItem('mora', JSON.stringify(accessToken))
                    Swal.fire(
                        'Good job!',
                        'Successfully Logged in as a User!',
                        'success'
                    );
                    setTimeout(()=>{
                        location.replace('../html/logg.html')
                        },4000)
                    }
                else{
                        alert(data.error)
                        location.reload()
                 }
                }
                else{
                    Swal.fire(
                        'Opps..!',
                        'Invalid credentials!',
                        'error'
                    );
                    setTimeout(()=>{
                        location.reload()
                        },4000)
                    
                }
            })
        .catch((error) => {
            console.error('Error:', error.message);
            formError.textContent = error.message
            setTimeout(() => {
                formError.textContent = ""
            }, 5000)
        });
    }
 }
});

let emailError = document.querySelector(".email_error");

document.getElementById('input_email').addEventListener('input', (e) => {
    const email = e.target.value
    if (e.target.value.match(emailRegex)) {
        isEmailValid = true
        emailError.textContent = ""
    }else if(email.length == 0){
        isEmailValid = false
        emailError.textContent = "Enter your email"
    }else{
        isEmailValid = false
        emailError.textContent = "Email is Invalid"
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
