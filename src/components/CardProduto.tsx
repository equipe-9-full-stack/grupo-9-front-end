interface Product {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  imageUrl?: string;
}

interface Props {
  product: Product;
}

export default function CardProduto({ product }: Props) {
  const disponivel = product.estoque > 0;

  return (
    <div className="bg-white rounded-[45px] p-8 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center group cursor-pointer border border-transparent hover:border-gray-100">
      
      {/* Imagem */}
      <div className="h-36 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.nome}
            className="max-h-full object-contain"
          />
        ) : (
          <span className="text-5xl">📦</span>
        )}
      </div>

      {/* Nome */}
      <h3 className="font-bold text-lg mb-2 text-gray-800">
        {product.nome}
      </h3>

      {/* Preço */}
      <p className="font-black text-2xl mb-3">
        R${product.preco.toFixed(2).replace(".", ",")}
      </p>

      {/* Status */}
      <span
        className={`text-[11px] font-black tracking-[0.2em] ${
          disponivel ? "text-[#CCFF00]" : "text-red-500"
        }`}
      >
        {disponivel ? "DISPONÍVEL" : "INDISPONÍVEL"}
      </span>
    </div>
  );
}
