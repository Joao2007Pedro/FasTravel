import React from "react";

export default function FlightCard({ flight, onReserve }) {
  const partida = new Date(flight.partida);
  const chegada = new Date(flight.chegada);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
      <div className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg text-slate-900">
            {flight.origem} <span className="text-slate-400">→</span>{" "}
            {flight.destino}
          </h2>
          <span className="text-xs rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5 text-slate-600">
            Direto
          </span>
        </div>
        <div className="text-sm text-slate-600">
          <div>Partida: {partida.toLocaleString()}</div>
          <div>Chegada: {chegada.toLocaleString()}</div>
        </div>
        <div className="flex items-end justify-between">
          <div className="text-slate-500 text-xs">a partir de</div>
          <div className="text-2xl font-bold text-slate-900">
            R$ {Number(flight.preco).toFixed(2)}
          </div>
        </div>
        <button
          onClick={() => onReserve?.(flight)}
          className="w-full rounded-lg py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:opacity-90"
        >
          Reservar
        </button>
      </div>
    </div>
  );
}
