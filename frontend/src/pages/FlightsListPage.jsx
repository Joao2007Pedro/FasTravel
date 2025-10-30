import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import SearchForm from "../components/SearchForm";
import FlightCard from "../components/FlightCard";
import Modal from "../components/Modal";
import BookingForm from "../components/BookingForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SkeletonCard from "../components/SkeletonCard";

export default function FlightsListPage() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  const initialParams = useMemo(() => {
    const sp = new URLSearchParams(window.location.search);
    const params = {};
    if (sp.get("origem")) params.origem = sp.get("origem");
    if (sp.get("destino")) params.destino = sp.get("destino");
    if (sp.get("data")) params.data = sp.get("data");
    return params;
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await api.get("/flights", { params: initialParams });
        if (mounted) setFlights(data);
      } catch (e) {
        setError("Não foi possível carregar os voos.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [initialParams]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
  <h1 className="text-3xl font-bold text-center mb-6">Voos disponíveis</h1>
      <div className="bg-white rounded-xl shadow p-4 sticky top-20 z-30 mb-6">
        <SearchForm
          onSearch={async (filters) => {
            setLoading(true);
            setError("");
            try {
              const { data } = await api.get("/flights", { params: filters });
              setFlights(data);
            } catch (e) {
              setError("Não foi possível carregar os voos.");
            } finally {
              setLoading(false);
            }
          }}
        />
      </div>
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flights.map((f) => (
            <FlightCard
              key={f.id}
              flight={f}
              onReserve={(flight) => {
                if (!isAuth) {
                  navigate("/login", {
                    state: { from: { pathname: "/flights" } },
                  });
                  return;
                }
                setSelected(flight);
              }}
            />
          ))}
          {flights.length === 0 && (
            <p className="col-span-full text-center text-gray-600">
              Nenhum voo encontrado.
            </p>
          )}
        </div>
      )}

      <Modal
        title="Confirmar Reserva"
        open={!!selected}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <BookingForm
            flight={selected}
            onSuccess={(booking) => {
              setSelected(null);
              navigate(`/checkout/${booking.id}`);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
