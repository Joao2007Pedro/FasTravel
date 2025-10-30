import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Modal from "../components/Modal";
import BookingForm from "../components/BookingForm";
import { useAuth } from "../context/AuthContext";
import {
  ArrowRightIcon,
  ClockIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

export default function FlightDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await api.get(`/flights/${id}`);
        if (mounted) setFlight(data);
      } catch (e) {
        setError("Voo não encontrado ou erro ao carregar.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading)
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="h-6 w-24 bg-slate-200 rounded animate-pulse mb-4" />
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <div className="h-6 bg-slate-200 rounded animate-pulse w-2/3" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-14 bg-slate-100 rounded animate-pulse" />
            ))}
          </div>
          <div className="h-10 bg-slate-200 rounded animate-pulse" />
        </div>
      </div>
    );
  if (error)
    return <div className="p-6 text-red-600">{error || "Erro"}</div>;
  if (!flight) return null;

  const partida = new Date(flight.partida);
  const chegada = new Date(flight.chegada);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Hero compacto */}
      <div className="mb-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4 shadow">
        <div className="font-semibold flex items-center gap-2">
          {flight.origem}
          <ArrowRightIcon className="h-5 w-5 text-white/80" />
          {flight.destino}
        </div>
        <div className="text-sm text-white/80">{partida.toLocaleString()} • {chegada.toLocaleString()}</div>
      </div>
      <button
        className="mb-4 text-sm text-slate-600 hover:underline"
        onClick={() => navigate(-1)}
      >
        ← Voltar
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            {flight.origem}
            <ArrowRightIcon className="h-5 w-5 text-slate-400" />
            {flight.destino}
          </h1>
          <span className="text-xs rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5 text-slate-600">Direto</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5" />
            <div>
              <div className="text-sm text-slate-500">Partida</div>
              <div className="font-medium">{partida.toLocaleString()}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5" />
            <div>
              <div className="text-sm text-slate-500">Chegada</div>
              <div className="font-medium">{chegada.toLocaleString()}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BuildingOfficeIcon className="h-5 w-5" />
            <div>
              <div className="text-sm text-slate-500">Companhia</div>
              <div className="font-medium">{flight.companhia || "-"}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BuildingOfficeIcon className="h-5 w-5" />
            <div>
              <div className="text-sm text-slate-500">Assentos</div>
              <div className="font-medium">{flight.assentos || "-"}</div>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="text-slate-500 text-sm">Preço por pessoa</div>
          <div className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <CurrencyDollarIcon className="h-7 w-7 text-emerald-600" /> R$ {Number(flight.preco).toFixed(2)}
          </div>
        </div>

        <div className="pt-2">
          <button
            className="w-full rounded-lg py-3 bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => {
              if (!isAuth) {
                navigate("/login", { state: { from: { pathname: `/flights/${id}` } } });
                return;
              }
              setOpen(true);
            }}
          >
            Reservar
          </button>
        </div>
      </div>

      <Modal title="Confirmar Reserva" open={open} onClose={() => setOpen(false)}>
        {open && (
          <BookingForm
            flight={flight}
            onSuccess={(booking) => {
              setOpen(false);
              navigate(`/checkout/${booking.id}`);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
