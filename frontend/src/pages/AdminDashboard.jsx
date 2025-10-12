import { useEffect, useState } from "react";
import api from "../services/api";

const initialForm = {
  origem: "",
  destino: "",
  partida: "",
  chegada: "",
  preco: "",
};

export default function AdminDashboard() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(null); // flight id ou null
  const [submitting, setSubmitting] = useState(false);

  const loadFlights = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/flights");
      setFlights(data);
    } catch (e) {
      const msg = e?.response?.data?.error || "Não foi possível carregar voos.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFlights();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditing(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        origem: form.origem,
        destino: form.destino,
        partida: form.partida
          ? new Date(form.partida).toISOString()
          : undefined,
        chegada: form.chegada
          ? new Date(form.chegada).toISOString()
          : undefined,
        preco: form.preco ? Number(form.preco) : undefined,
      };
      if (editing) {
        await api.put(`/flights/${editing}`, payload);
      } else {
        await api.post("/flights", payload);
      }
      await loadFlights();
      resetForm();
    } catch (e) {
      const msg = e?.response?.data?.error || "Erro ao salvar voo.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const onEdit = (flight) => {
    setEditing(flight.id);
    setForm({
      origem: flight.origem,
      destino: flight.destino,
      partida: flight.partida
        ? new Date(flight.partida).toISOString().slice(0, 16)
        : "",
      chegada: flight.chegada
        ? new Date(flight.chegada).toISOString().slice(0, 16)
        : "",
      preco: flight.preco,
    });
  };

  const onDelete = async (id) => {
    if (!window.confirm("Deseja remover este voo?")) return;
    try {
      await api.delete(`/flights/${id}`);
      await loadFlights();
    } catch (e) {
      const msg = e?.response?.data?.error || "Erro ao excluir voo.";
      setError(msg);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin - Gerenciar Voos</h1>

      <form
        onSubmit={submit}
        className="bg-white shadow rounded p-4 grid grid-cols-1 md:grid-cols-6 gap-3"
      >
        {error && <div className="md:col-span-6 text-red-600">{error}</div>}
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Origem</label>
          <input
            name="origem"
            value={form.origem}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Destino</label>
          <input
            name="destino"
            value={form.destino}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Partida</label>
          <input
            type="datetime-local"
            name="partida"
            value={form.partida}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required={!editing}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Chegada</label>
          <input
            type="datetime-local"
            name="chegada"
            value={form.chegada}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required={!editing}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Preço</label>
          <input
            type="number"
            min="0"
            step="0.01"
            name="preco"
            value={form.preco}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required={!editing}
          />
        </div>
        <div className="md:col-span-6 flex gap-2">
          <button
            disabled={submitting}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editing ? "Atualizar" : "Criar"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border rounded"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="bg-white shadow rounded overflow-x-auto">
        {loading ? (
          <div className="p-4">Carregando…</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Origem</th>
                <th className="p-3">Destino</th>
                <th className="p-3">Partida</th>
                <th className="p-3">Chegada</th>
                <th className="p-3">Preço</th>
                <th className="p-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((f) => (
                <tr key={f.id} className="border-t">
                  <td className="p-3">{f.id}</td>
                  <td className="p-3">{f.origem}</td>
                  <td className="p-3">{f.destino}</td>
                  <td className="p-3">
                    {new Date(f.partida).toLocaleString()}
                  </td>
                  <td className="p-3">
                    {new Date(f.chegada).toLocaleString()}
                  </td>
                  <td className="p-3">{Number(f.preco).toFixed(2)}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => onEdit(f)}
                      className="px-2 py-1 border rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(f.id)}
                      className="px-2 py-1 border rounded text-red-600"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
              {flights.length === 0 && (
                <tr>
                  <td className="p-4" colSpan={7}>
                    Nenhum voo cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
