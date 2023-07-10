const emailEl = document.getElementById('email');
const passEl = document.getElementById('password');
const signInEl = document.getElementById('sign-in-btn');

const loginHandler = async function(event){
  event.preventDefault();

  const response = await fetch('/api/user/login', {
    method:'POST',
    body: JSON.stringify({
      email: emailEl.value,
      password: passEl.value,
    }),
    headers:{
      'Content-Type':'application/json'
    }
  });

  // handle response here. I don't know what we want to do here
}

signInEl.addEventListener('click', loginHandler);
