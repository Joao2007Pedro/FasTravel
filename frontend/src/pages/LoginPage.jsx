import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../src/context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  email: Yup.string().email("E-mail inválido").required("Informe o e-mail"),
  senha: Yup.string().min(6, "Mínimo 6 caracteres").required("Informe a senha"),
});

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Entrar</h1>
      <Formik
        initialValues={{ email: "", senha: "" }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setStatus("");
          try {
            await login(values.email, values.senha);
            navigate(from, { replace: true });
          } catch (e) {
            setStatus("Credenciais inválidas ou erro no servidor");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form className="space-y-4">
            {status && <div className="text-red-600 text-sm">{status}</div>}
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
              {isSubmitting ? "Entrando…" : "Entrar"}
            </button>
            <p className="text-sm text-center mt-2">
              Não tem conta?{" "}
              <Link to="/register" className="text-blue-600">
                Cadastre-se
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
