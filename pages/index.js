import { useEffect } from 'react'

export default function Home() {
  // O link para onde será redirecionado
  const redirectUrl = "https://8tihnvjgf4rc1q5pbcup.share.dreamflow.app/"; // Troque pelo link desejado!

  useEffect(() => {
    alert("Bem-vindo ao BigCorps App! Você será redirecionado.");
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 2000);
  }, []);

  return (
    <main style={{textAlign: 'center', marginTop: '40vh'}}>
      <h1>BigCorps App</h1>
      <p>Você será redirecionado em instantes...</p>
    </main>
  )
}
