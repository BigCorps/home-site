import { useEffect } from 'react'

export default function Home() {
  // O link para onde será redirecionado
  const redirectUrl = "https://www.bigcorps.com.br/login/iapos"; // Troque pelo link desejado!

  useEffect(() => {
    alert("Clique nos 3 pontinhos do seu navegador e instale o app.");
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 2000);
  }, []);

  return (
    <main style={{textAlign: 'center', marginTop: '40vh'}}>
      <h1>BigCorps Dashboard App</h1>
      <p>Caso tenha esquecido a senha, solicite ao suporte.</p>
      <p>Você será redirecionado em instantes...</p>
    </main>
  )
}
