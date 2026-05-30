import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F6F3E4]">
      
      {/* A Navbar é encaixada aqui no topo */}
      <Navbar />

      {/* Conteúdo de teste para a sua Home */}
      <div className="flex flex-col items-center justify-center pt-32 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#171918] mb-6">
          Página Principal da Stock.io
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Se tudo deu certo, a sua Navbar está brilhando lá no topo! Teste passar o mouse por cima dos botões ou ícones para ver os efeitos visuais.
        </p>
      </div>
      
    </div>
  );
}