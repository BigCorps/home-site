<!DOCTYPE html>
  <html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <title>Login BigCorps</title>
  <style>
      body {
      font-family: 'Arial', sans-serif;
        background: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
}
    .card {
      background: #fff;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            width: 360px;
    }
    .title {
      text-align: center;
            margin-bottom: 1.5rem;
    }
    .title h1 {
      margin: 0;
            color: #ff5c2a;
            font-size: 1.8rem;
    }
    .title p {
      color: #555;
            margin: 0;
    }
    .input-group {
            margin-bottom: 1rem;
            position: relative;
    }
    .input-group input {
      width: 100%;
            padding: 0.75rem 2.5rem 0.75rem 0.75rem;
            border: 1px solid #ccc;
            border-radius: 10px;
            font-size: 1rem;
    }
    .input-group .toggle-password {
      position: absolute;
            top: 50%;
            right: 0.75rem;
            transform: translateY(-50%);
            cursor: pointer;
            color: #999;
    }
    .error {
      color: red;
            background: #ffe5e5;
            padding: 0.5rem;
            border-radius: 10px;
            margin-bottom: 1rem;
            display: none;
            font-size: 0.9rem;
    }
    button {
      width: 100%;
            background: #ff5c2a;
            color: white;
            border: none;
            padding: 0.75rem;
            font-size: 1rem;
            border-radius: 10px;
            cursor: pointer;
    }
    .footer {
      text-align: center;
            margin-top: 1rem;
            color: #aaa;
            font-size: 0.85rem;
    }
</style>
  </head>
<body>
    <div class="card">
      <div class="title">
        <h1>BigCorps</h1>
      <p>Dashboard Corporativo</p>
  </div>

    <div class="error" id="errorMsg">Usuário ou senha incorretos</div>

    <div class="input-group">
        <input type="text" id="username" placeholder="Usuário">
  </div>

    <div class="input-group">
        <input type="password" id="password" placeholder="Senha">
        <span class="toggle-password" onclick="togglePassword()">👁️</span>
  </div>

    <button onclick="login()">Entrar</button>

    <div class="footer">Acesso seguro e criptografado</div>
  </div>

  <script>
      const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS-eP2GbntM7UpS2PN12PPoRYavGlmYUgoWue4TsjwgFHeaXWrcNl5kZ13FcM7z9PKPD4B6ssxk3pYc/pub?output=csv';

    async function login() {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const errorMsg = document.getElementById('errorMsg');
            errorMsg.style.display = 'none';

      if (!username || !password) {
                errorMsg.textContent = 'Preencha todos os campos.';
                errorMsg.style.display = 'block';
                return;
      }

      try {
                const response = await fetch(csvUrl);
                const data = await response.text();
                const rows = data.trim().split('\n').slice(1).map(r => r.split(',')); // Ignora cabeçalho

              const match = rows.find(row => row[0] === username && row[1] === password);
                if (match) {
                            window.open(match[2], '_blank');
                } else {
                            errorMsg.textContent = 'Usuário ou senha incorretos';
                            errorMsg.style.display = 'block';
                }
      } catch (error) {
                errorMsg.textContent = 'Erro ao acessar os dados.';
                errorMsg.style.display = 'block';
      }
    }

    function togglePassword() {
            const pass = document.getElementById('password');
            pass.type = pass.type === 'password' ? 'text' : 'password';
    }

    document.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                      login();
            }
    });
</script>
  </body>
  </html>
