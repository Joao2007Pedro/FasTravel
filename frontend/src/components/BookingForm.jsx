import React, { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function BookingForm({ flight, onSuccess }) {
  const [quantidade, setQuantidade] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const precoTotal = Number(flight?.preco || 0) * Number(quantidade || 0);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/bookings", {
        flightId: flight.id,
        quantidade: Number(quantidade),
        precoTotal,
      });
      onSuccess?.(data);
    } catch (e) {
      const msg =
        e?.response?.data?.error || "Não foi possível criar a reserva";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-gray-600">Origem</div>
          <div className="font-semibold">{flight.origem}</div>
        </div>
        <div>
          <div className="text-gray-600">Destino</div>
          <div className="font-semibold">{flight.destino}</div>
        </div>
        <div>
          <div className="text-gray-600">Partida</div>
          <div>{new Date(flight.partida).toLocaleString()}</div>
        </div>
        <div>
          <div className="text-gray-600">Preço</div>
          <div>R$ {Number(flight.preco).toFixed(2)}</div>
        </div>
      </div>
      <div>
        <label className="block text-sm mb-1">Quantidade de passagens</label>
        <input
          type="number"
          min={1}
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          className="border p-2 rounded w-32"
        />
      </div>
      <div className="font-semibold">Total: R$ {precoTotal.toFixed(2)}</div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Reservando…" : "Confirmar Reserva"}
      </button>
    </form>
  );
}
