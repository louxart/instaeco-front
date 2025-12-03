import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/apiClient";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    nombreUsuario: "",
    correo: "",
    contrasena: "",
    nombre: "",
    biografia: "",
    fotoPerfil: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/register", form);
      login(res.data.token, res.data.usuario);
      navigate("/");
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "Error al registrarse");
    }
  };

  return (
    <div className="flex justify-center color-bg">
      <div className="bg-white mt-16 p-8 rounded-xl shadow-sm border border-gray-200 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Crear cuenta en PlantGram
        </h1>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Nombre de usuario</label>
            <input
              name="nombreUsuario"
              value={form.nombreUsuario}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Correo</label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={form.contrasena}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Nombre (opcional)</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Biografía</label>
            <textarea
              name="biografia"
              value={form.biografia}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
              rows="2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Foto de perfil (URL)</label>
            <input
              name="fotoPerfil"
              value={form.fotoPerfil}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-purple-700"
          >
            Registrarme
          </button>
        </form>
        <p className="text-center text-xs text-gray-500 mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-purple-600 font-semibold">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
