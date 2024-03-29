let usersData = [];

setDisplay('login-ctrl', 'block');

function loginn(event) {
    form = document.querySelector('form');
    event.preventDefault();
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }
    const userName = document.querySelector("#name").value;
    const password = document.querySelector("#pswd").value;
    const loginData = {usrnm : userName, pwd : password};

    const usersDataText = localStorage.getItem('usersData');

    const user = localStorage.setItem('user', userName);

    if (usersDataText) {
        usersData = JSON.parse(usersDataText);
    }

    usersData.push(loginData);

    localStorage.setItem('usersData', JSON.stringify(usersData));
    window.location.href = "deck.html";
    
}

async function login(event) {
    loginOrCreate(`/api/auth/login`, event);
}
  
  async function create(event) {
    loginOrCreate(`/api/auth/create`, event);
}

function filled(event) {
    form = document.querySelector('form');
    event.preventDefault();
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }
    return true;
}
async function loginOrCreate(endpoint, event) {
    if (!filled(event)) {
        console.log("error");
        return;
    }

    const userName = document.querySelector('#userName')?.value;
    const password = document.querySelector('#pswd')?.value;
    try{
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ user: userName, pswd: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  
    if (response.ok) {
      localStorage.setItem('userName', userName);
      window.location.href = 'deck.html';
    } else {
      const body = await response.json();
      const modalEl = document.querySelector('#msgModal');
      modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
      const msgModal = new bootstrap.Modal(modalEl, {});
      msgModal.show();
    }
    } catch(error) {
        console.error('Fetch error:', error);
    }
}

function setDisplay(controlId, display) {
    const playControlEl = document.querySelector(`#${controlId}`);
    if (playControlEl) {
      playControlEl.style.display = display;
    }
  }
  