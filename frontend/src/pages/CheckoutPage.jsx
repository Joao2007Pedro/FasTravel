import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-hot-toast";
import Spinner from "../components/Spinner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";

export default function CheckoutPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [method, setMethod] = useState("card");
  const [successMsg, setSuccessMsg] = useState("");

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
        <div>
          <strong>Status atual:</strong> {booking.status}
        </div>
      </div>

      <div className="bg-white rounded shadow p-4 mt-4">
        <h2 className="font-semibold mb-3">Forma de pagamento</h2>
        <Formik
          initialValues={{
            method: method,
            cardNumber: "",
            cardName: "",
            cardExpiry: "",
            cardCvv: "",
          }}
          enableReinitialize
          validationSchema={Yup.object({
            method: Yup.string().oneOf(["card", "pix"]).required(),
            cardNumber: Yup.string().when("method", {
              is: "card",
              then: (s) => s.required("Informe o número do cartão").matches(/^[0-9 ]{19}$/g, "Número inválido"),
              otherwise: (s) => s.notRequired(),
            }),
            cardName: Yup.string().when("method", {
              is: "card",
              then: (s) => s.required("Informe o nome impresso no cartão"),
              otherwise: (s) => s.notRequired(),
            }),
            cardExpiry: Yup.string().when("method", {
              is: "card",
              then: (s) => s.required("Informe a validade").matches(/^(0[1-9]|1[0-2])\/(\d{2})$/, "Use MM/AA"),
              otherwise: (s) => s.notRequired(),
            }),
            cardCvv: Yup.string().when("method", {
              is: "card",
              then: (s) => s.required("Informe o CVV").matches(/^\d{3}$/g, "CVV inválido"),
              otherwise: (s) => s.notRequired(),
            }),
          })}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            setError("");
            setSuccessMsg("");
            setStatus("");
            try {
              const { data } = await api.patch(`/bookings/${id}/status`, {
                status: "paid",
              });
              setBooking(data);
              setSuccessMsg("Pagamento confirmado! Sua reserva está paga.");
              toast.success("Pagamento confirmado!");
            } catch (e) {
              const msg = e?.response?.data?.error || "Não foi possível confirmar o pagamento.";
              setError(msg);
              setStatus(msg);
              toast.error(msg);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="space-y-3">
              <div className="flex gap-6 mb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Field
                    type="radio"
                    name="method"
                    value="card"
                    checked={values.method === "card"}
                    onChange={() => {
                      setFieldValue("method", "card");
                      setMethod("card");
                    }}
                  />
                  Cartão de crédito (simulado)
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Field
                    type="radio"
                    name="method"
                    value="pix"
                    checked={values.method === "pix"}
                    onChange={() => {
                      setFieldValue("method", "pix");
                      setMethod("pix");
                    }}
                  />
                  PIX (simulado)
                </label>
              </div>

              {values.method === "card" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-sm mb-1">Número do cartão</label>
                    <Field name="cardNumber">
                      {({ field }) => (
                        <InputMask
                          {...field}
                          mask="9999 9999 9999 9999"
                          placeholder="0000 0000 0000 0000"
                          className="w-full border rounded p-2"
                        />
                      )}
                    </Field>
                    <ErrorMessage name="cardNumber" component="div" className="text-xs text-red-600" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Nome impresso</label>
                    <Field name="cardName" className="w-full border rounded p-2" />
                    <ErrorMessage name="cardName" component="div" className="text-xs text-red-600" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm mb-1">Validade (MM/AA)</label>
                      <Field name="cardExpiry">
                        {({ field }) => (
                          <InputMask
                            {...field}
                            mask="99/99"
                            placeholder="MM/AA"
                            className="w-full border rounded p-2"
                          />
                        )}
                      </Field>
                      <ErrorMessage name="cardExpiry" component="div" className="text-xs text-red-600" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">CVV</label>
                      <Field name="cardCvv">
                        {({ field }) => (
                          <InputMask
                            {...field}
                            mask="999"
                            placeholder="000"
                            className="w-full border rounded p-2"
                          />
                        )}
                      </Field>
                      <ErrorMessage name="cardCvv" component="div" className="text-xs text-red-600" />
                    </div>
                  </div>
                </div>
              )}

              {values.method === "pix" && (
                <div className="text-sm text-slate-600">
                  Use o PIX para confirmar instantaneamente (simulação).
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 rounded bg-emerald-600 text-white py-2 hover:bg-emerald-700 disabled:opacity-60 inline-flex items-center justify-center gap-2"
              >
                {isSubmitting && (
                  <Spinner size={16} className="border-white/60 border-t-white" />
                )}
                {isSubmitting ? "Confirmando…" : "Confirmar pagamento"}
              </button>

              {successMsg && (
                <div className="mt-3 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded p-2">
                  {successMsg}
                </div>
              )}
              {error && (
                <div className="mt-3 text-red-700 bg-red-50 border border-red-200 rounded p-2">
                  {error}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
