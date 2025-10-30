import React from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";
import Spinner from "./Spinner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  quantidade: Yup.number()
    .typeError("Informe um número válido")
    .integer("Informe um número inteiro")
    .min(1, "Quantidade mínima é 1")
    .required("Informe a quantidade"),
});

export default function BookingForm({ flight, onSuccess }) {
  return (
    <Formik
      initialValues={{ quantidade: 1 }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setStatus("");
        try {
          const precoTotal = Number(flight?.preco || 0) * Number(values.quantidade || 0);
          const { data } = await api.post("/bookings", {
            flightId: flight.id,
            quantidade: Number(values.quantidade),
            precoTotal,
          });
          toast.success("Reserva criada com sucesso!");
          onSuccess?.(data);
        } catch (e) {
          const msg = e?.response?.data?.error || "Não foi possível criar a reserva";
          setStatus(msg);
          toast.error(msg);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, isSubmitting, status }) => {
        const precoTotal = Number(flight?.preco || 0) * Number(values.quantidade || 0);
        return (
          <Form className="space-y-4">
            {status && <div className="text-sm text-red-600">{status}</div>}
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
              <Field
                as="input"
                type="number"
                min={1}
                name="quantidade"
                className="border p-2 rounded w-32"
              />
              <ErrorMessage
                name="quantidade"
                component="div"
                className="text-xs text-red-600 mt-1"
              />
            </div>
            <div className="font-semibold">Total: R$ {precoTotal.toFixed(2)}</div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-60 inline-flex items-center gap-2"
            >
              {isSubmitting && <Spinner size={16} />}
              {isSubmitting ? "Reservando…" : "Confirmar Reserva"}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
