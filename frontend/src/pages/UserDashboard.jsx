import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const limit = 5;

  const load = async (pg = 1) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/bookings", {
        params: { page: pg, limit },
      });
      setBookings(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (e) {
      const msg =
        e?.response?.data?.error || "Não foi possível carregar suas reservas.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Minhas Reservas</h1>

      {loading && <div>Carregando…</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && bookings.length === 0 && (
        <div className="text-gray-600">Você ainda não possui reservas.</div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Reserva</th>
                <th className="p-3">Origem</th>
                <th className="p-3">Destino</th>
                <th className="p-3">Partida</th>
                <th className="p-3">Qtd</th>
                <th className="p-3">Total (R$)</th>
                <th className="p-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t">
                  <td className="p-3">#{b.id}</td>
                  <td className="p-3">{b.flight?.origem || "-"}</td>
                  <td className="p-3">{b.flight?.destino || "-"}</td>
                  <td className="p-3">
                    {b.flight?.partida
                      ? new Date(b.flight.partida).toLocaleString()
                      : "-"}
                  </td>
                  <td className="p-3">{b.quantidade}</td>
                  <td className="p-3">{Number(b.precoTotal).toFixed(2)}</td>
                  <td className="p-3">
                    <Link
                      to={`/checkout/${b.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && totalPages > 1 && (
        <div className="flex items-center gap-3 mt-4">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            Anterior
          </button>
          <span>
            Página {page} de {totalPages}
          </span>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}
