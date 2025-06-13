import { useEffect } from 'react'

export default function Home() {
  // O link para onde será redirecionado
  const redirectUrl = "https://O_SEU_LINK_AQUI.com.br"; // Troque pelo link desejado!

  useEffect(() => {
    // Mensagem antes de redirecionar
    alert("Bem-vindo ao BigCorps App! Você será redirecionado.");
    // Redireciona após 2 segundos
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 2000);
  }, []);

  return (
    <>
      <head>
        <title>BigCorps App</title>
        <meta name="theme-color" content="#317EFB"/>
        <meta name="description" content="Acesse rapidamente pelo app do BigCorps!"/>
        <link rel="manifest" href="/manifest.json"/>
        <link rel="icon" href="/icons/icon-192.png"/>
      </head>
      <main style={{textAlign: 'center', marginTop: '40vh'}}>
        <h1>BigCorps App</h1>
        <p>Você será redirecionado em instantes...</p>
      </main>
    </>
  )
}
