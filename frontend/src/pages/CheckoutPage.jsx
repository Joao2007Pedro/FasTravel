import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function CheckoutPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/bookings/${id}`);
        setBooking(data);
      } catch (e) {
        setError("Não foi possível carregar a reserva");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="p-6">Carregando…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!booking) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="bg-white rounded shadow p-4 space-y-2">
        <div>
          <strong>Reserva:</strong> #{booking.id}
        </div>
        <div>
          <strong>Origem:</strong> {booking.flight?.origem}
        </div>
        <div>
          <strong>Destino:</strong> {booking.flight?.destino}
        </div>
        <div>
          <strong>Partida:</strong>{" "}
          {new Date(booking.flight?.partida).toLocaleString()}
        </div>
        <div>
          <strong>Quantidade:</strong> {booking.quantidade}
        </div>
        <div>
          <strong>Total:</strong> R$ {Number(booking.precoTotal).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
