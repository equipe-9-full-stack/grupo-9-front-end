import { LucideIcon } from "lucide-react";

interface Category {
  name: string;
  icon: LucideIcon;
}

export default function Carrossel({ categories }: { categories: Category[] }) {
  return (
    <section className="mb-12 overflow-x-auto separation-class"> 
      <h2 className="text-xl font-bold mb-5 tracking-tight text-zinc-900">Categoria</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <div key={index} className="flex flex-col items-center justify-center bg-white border border-zinc-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer min-w-[100px] aspect-square group">
              <div className="text-[#5D2CFF] group-hover:scale-110 transition-transform mb-2">
                <Icon size={24} strokeWidth={1.8} />
              </div>
              <span className="text-[11px] font-semibold text-zinc-500 text-center tracking-tight">{cat.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}