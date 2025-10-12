import React, { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [data, setData] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch?.({
      origem: origem || undefined,
      destino: destino || undefined,
      data: data || undefined,
    });
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
      <input
        value={origem}
        onChange={(e) => setOrigem(e.target.value)}
        placeholder="Origem"
        className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <input
        value={destino}
        onChange={(e) => setDestino(e.target.value)}
        placeholder="Destino"
        className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <button className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg px-4 hover:opacity-90">
        Buscar
      </button>
    </form>
  );
}
