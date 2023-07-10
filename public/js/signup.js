const emailEl = document.getElementById('email');
const passEl = document.getElementById('password');
const submitEl = document.getElementById('sign-up-btn');

const signUpHandler = async function(event){
  event.preventDefault();

  const response = await fetch('/api/user/',{
    method:'POST',
    body:JSON.stringify({
      email:emailEl.value,
      password:passEl.value,
    }),
    headers:{
      'Content-Type':'application/json'
    }
  });

  // handle response
}

submitEl.addEventListener('click', signUpHandler);