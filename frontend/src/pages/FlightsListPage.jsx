// src/pages/FlightsPage.jsx
export default function FlightsPage() {
  // Dados de teste
  const flights = [
    { id: 1, from: "São Paulo", to: "Rio de Janeiro", time: "08:00", price: "R$250" },
    { id: 2, from: "São Paulo", to: "Brasília", time: "12:30", price: "R$320" },
    { id: 3, from: "São Paulo", to: "Salvador", time: "16:45", price: "R$450" },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">Voos Disponíveis</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {flights.map((flight) => (
          <div key={flight.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="font-semibold text-xl mb-2">
              {flight.from} → {flight.to}
            </h2>
            <p className="text-gray-600 mb-1">Horário: {flight.time}</p>
            <p className="text-gray-800 font-semibold">Preço: {flight.price}</p>
            <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Reservar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
