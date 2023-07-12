// add logout html
const buttonEl = document.getElementById('sign-out');

const logoutHandler = async function(event){
  event.preventDefault();

  const response = await fetch('/api/users/logout',{ 
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    }

  });

  if(response.ok){
    document.location.replace('/');
  } else {
    alert('Failed to sign out!');
  }
}

buttonEl.addEventListener('click', logoutHandler);