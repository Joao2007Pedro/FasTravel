import React from "react";
import { Link } from "react-router-dom";
import { ClockIcon, ArrowRightIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

export default function FlightCard({ flight, onReserve }) {
  const partida = new Date(flight.partida);
  const chegada = new Date(flight.chegada);

  return (
  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition">
      <div className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg text-slate-900 flex items-center gap-2">
            {flight.origem}
            <ArrowRightIcon className="h-4 w-4 text-slate-400" />
            {flight.destino}
          </h2>
          <span className="text-xs rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5 text-slate-600">Direto</span>
        </div>
        <div className="text-sm text-slate-600 grid grid-cols-1 gap-1">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4" /> Partida: {partida.toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4" /> Chegada: {chegada.toLocaleString()}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="text-slate-500 text-xs">a partir de</div>
          <div className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <CurrencyDollarIcon className="h-6 w-6 text-emerald-600" /> R$ {Number(flight.preco).toFixed(2)}
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onReserve?.(flight)}
            className="flex-1 rounded-lg py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:opacity-90"
          >
            Reservar
          </button>
          <Link
            to={`/flights/${flight.id}`}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}
