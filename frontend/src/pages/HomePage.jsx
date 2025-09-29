// src/pages/HomePage.jsx
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          Bem-vindo ao FasTravel ✈️
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Encontre os melhores voos com rapidez e facilidade.
        </p>
        <a
          href="/flights"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Explorar Voos
        </a>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="font-semibold text-xl mb-2">Rápido</h2>
          <p className="text-gray-600">Encontre voos em segundos sem complicação.</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="font-semibold text-xl mb-2">Seguro</h2>
          <p className="text-gray-600">Confiança e segurança na sua reserva.</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="font-semibold text-xl mb-2">Fácil</h2>
          <p className="text-gray-600">Interface simples e intuitiva para todos.</p>
        </div>
      </section>
    </div>
  );
}
