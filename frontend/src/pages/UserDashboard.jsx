import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function UserDashboard() {
  const { user, updateUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [nome, setNome] = useState(user?.nome || "");
  const [email, setEmail] = useState(user?.email || "");
  const [saving, setSaving] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toCancel, setToCancel] = useState(null);
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

      {/* Card de perfil */}
      <div className="bg-white shadow rounded p-4 mb-6">
        {!editing ? (
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{user?.nome}</div>
              <div className="text-sm text-slate-600">{user?.email}</div>
            </div>
            <button
              className="px-3 py-1 border rounded hover:bg-slate-50"
              onClick={() => setEditing(true)}
            >
              Editar dados pessoais
            </button>
          </div>
        ) : (
          <Formik
            initialValues={{ nome, email }}
            validationSchema={Yup.object({
              nome: Yup.string().required("Informe seu nome"),
              email: Yup.string().email("E-mail inválido").required("Informe o e-mail"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              setSaving(true);
              try {
                await api.put(`/users/${user.id}`, values);
                updateUser(values);
                setEditing(false);
                toast.success("Dados atualizados");
              } catch (e) {
                const msg = e?.response?.data?.error || "Não foi possível atualizar os dados.";
                toast.error(msg);
              } finally {
                setSaving(false);
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                <div>
                  <label className="text-sm block">Nome</label>
                  <Field name="nome" className="border rounded p-2 w-full" />
                  <ErrorMessage name="nome" component="div" className="text-xs text-red-600" />
                </div>
                <div>
                  <label className="text-sm block">E-mail</label>
                  <Field name="email" className="border rounded p-2 w-full" />
                  <ErrorMessage name="email" component="div" className="text-xs text-red-600" />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || saving}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {saving ? "Salvando…" : "Salvar"}
                  </button>
                  <button
                    type="button"
                    className="px-3 py-2 border rounded"
                    onClick={() => setEditing(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>

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
                  <td className="p-3 flex gap-3">
                    <Link
                      to={`/checkout/${b.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Ver
                    </Link>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => {
                        setToCancel(b);
                        setConfirmOpen(true);
                      }}
                    >
                      Cancelar
                    </button>
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

      {/* Modal de confirmação de cancelamento */}
      <Modal
        title="Cancelar reserva"
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      >
        <div className="space-y-4">
          <p>
            Tem certeza que deseja cancelar a reserva
            {toCancel ? ` #${toCancel.id}` : ""}? Esta ação não pode ser
            desfeita.
          </p>
          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-2 border rounded"
              onClick={() => setConfirmOpen(false)}
            >
              Voltar
            </button>
            <button
              className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              onClick={async () => {
                if (!toCancel) return;
                try {
                  await api.delete(`/bookings/${toCancel.id}`);
                  toast.success("Reserva cancelada");
                  setConfirmOpen(false);
                  setToCancel(null);
                  // Se removemos o último item da página e há páginas anteriores, voltamos uma página
                  const wasLastItemOnPage = bookings.length === 1 && page > 1;
                  if (wasLastItemOnPage) {
                    setPage((p) => Math.max(1, p - 1));
                  } else {
                    load(page);
                  }
                } catch (e) {
                  const msg =
                    e?.response?.data?.error ||
                    "Não foi possível cancelar a reserva.";
                  toast.error(msg);
                }
              }}
            >
              Confirmar cancelamento
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
