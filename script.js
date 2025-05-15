let isLogin = false;

function toggleForm() {
  isLogin = !isLogin;
  document.getElementById("form-title").innerText = isLogin ? "Login" : "Cadastro";
  document.querySelector("button").innerText = isLogin ? "Entrar" : "Cadastrar";
  document.getElementById("message").innerText = "";
}

function submitForm() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (!username || !password) {
    message.innerText = "Preencha todos os campos!";
    return;
  }

  if (isLogin) {
    // Modo Login
    const storedUser = localStorage.getItem(username);

    if (!storedUser) {
      message.innerText = "Usuário não encontrado!";
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.password === password) {
      message.style.color = "green";
      message.innerText = "Login realizado com sucesso!";
       window.location.href = "home.html";
    } else {
      message.style.color = "red";
      message.innerText = "Senha incorreta!";
    }
  } else {
    // Modo Cadastro
    if (localStorage.getItem(username)) {
      message.innerText = "Usuário já existe!";
      return;
    }

    const newUser = {
      username,
      password
    };

    localStorage.setItem(username, JSON.stringify(newUser));
    message.style.color = "green";
    message.innerText = "Cadastro realizado com sucesso!";
  }
}
