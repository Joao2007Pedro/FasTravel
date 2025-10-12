import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const schema = Yup.object({
  nome: Yup.string().required("Informe seu nome"),
  email: Yup.string().email("E-mail inválido").required("Informe o e-mail"),
  senha: Yup.string().min(6, "Mínimo 6 caracteres").required("Informe a senha"),
});

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Cadastrar</h1>
      <Formik
        initialValues={{ nome: "", email: "", senha: "" }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setStatus("");
          try {
            await api.post("/users", values);
            // login automático após cadastro
            await login(values.email, values.senha);
            navigate("/dashboard", { replace: true });
          } catch (e) {
            const msg =
              e?.response?.data?.error ||
              "Não foi possível cadastrar. Tente outro e-mail.";
            setStatus(msg);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form className="space-y-4">
            {status && <div className="text-red-600 text-sm">{status}</div>}
            <div>
              <label className="block text-sm mb-1">Nome</label>
              <Field
                name="nome"
                type="text"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="nome"
                component="div"
                className="text-xs text-red-600"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">E-mail</label>
              <Field
                name="email"
                type="email"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-xs text-red-600"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Senha</label>
              <Field
                name="senha"
                type="password"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="senha"
                component="div"
                className="text-xs text-red-600"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isSubmitting ? "Cadastrando…" : "Cadastrar"}
            </button>
            <p className="text-sm text-center mt-2">
              Já tem conta?{" "}
              <Link to="/login" className="text-blue-600">
                Entrar
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
