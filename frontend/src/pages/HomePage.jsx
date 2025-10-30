// src/pages/HomePage.jsx
import { Link, useNavigate } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import { getAsset, getHeroUrl } from "../services/assets";

export default function HomePage() {
  const navigate = useNavigate();
  const heroImage = getHeroUrl();
  const destinos = [
    { nome: "Rio de Janeiro", path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScs3RfBZzBa15XrsBJFv-Y65vIb687K4f4tQ&s" },
    { nome: "São Paulo", path: "https://visitesaopaulo.com/wp-content/uploads/2023/05/banner-i.jpg" },
    { nome: "Londres", path: "https://www.visitlondon.com/-/media/images/london/visit/general-london/westminster-at-dusk-london-1280x720.jpg?rev=3c05b9713c4b4405a7ab61aaeba53636&mw=800&hash=061A930869789795BC82B1A060E14562" },
    { nome: "Paris", path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS38xkOxYxBNjMVcCrzGk53UxalgO74vL23Pg&s" },
  ].map((d) => ({ ...d, img: getAsset(d.path) }));

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 items-center gap-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Encontre seu próximo destino com facilidade
          </h1>
          <p className="text-slate-600 mt-4">
            Compare preços, horários e reserve seus voos com poucos cliques.
          </p>
          <Link
            to="/flights"
            className="inline-flex mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow"
          >
            Buscar Voos
          </Link>

          {/* Destaques (opcional) */}
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3 py-1">
              Rápido
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3 py-1">
              Seguro
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3 py-1">
              Intuitivo
            </span>
          </div>

          {/* Busca rápida */}
          <div className="mt-10 bg-white/80 backdrop-blur rounded-xl border border-slate-200 p-4 shadow-sm">
            <p className="text-sm text-slate-500 mb-3">Busque voos agora</p>
            <SearchForm
              onSearch={(filters) => {
                const params = new URLSearchParams();
                if (filters.origem) params.set("origem", filters.origem);
                if (filters.destino) params.set("destino", filters.destino);
                if (filters.data) params.set("data", filters.data);
                navigate(`/flights?${params.toString()}`);
              }}
            />
          </div>
        </div>

        {/* Imagem */}
        <div className="hidden md:block">
          <img
            src={heroImage}
            alt="Destino em destaque"
            loading="lazy"
            className="h-64 md:h-80 w-full object-cover rounded-2xl shadow"
          />
        </div>
      </div>

      {/* Destinos populares */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Destinos populares
          </h2>
          <Link
            to="/flights"
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            Ver todos
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {destinos.map((d) => (
            <button
              key={d.nome}
              onClick={() =>
                navigate(`/flights?destino=${encodeURIComponent(d.nome)}`)
              }
              className="group relative h-36 rounded-xl overflow-hidden focus:outline-none border border-slate-200 bg-slate-100"
            >
              <img
                src={d.img}
                alt={d.nome}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <span className="absolute bottom-2 left-3 text-white font-semibold drop-shadow">
                {d.nome}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Como funciona */}
      <div className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-14 grid sm:grid-cols-3 gap-6">
          {[
            {
              t: "Busque",
              d: "Encontre voos por origem, destino e data",
              i: "🔎",
            },
            { t: "Compare", d: "Veja horários e valores em segundos", i: "🧭" },
            {
              t: "Reserve",
              d: "Finalize em poucos cliques com segurança",
              i: "🛫",
            },
          ].map((s) => (
            <div
              key={s.t}
              className="bg-slate-50 rounded-xl border border-slate-200 p-5"
            >
              <div className="text-3xl mb-2">{s.i}</div>
              <div className="font-semibold text-slate-900">{s.t}</div>
              <div className="text-sm text-slate-600">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
