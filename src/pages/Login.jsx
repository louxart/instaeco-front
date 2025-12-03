import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/apiClient";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { correo, contrasena });
      login(res.data.token, res.data.usuario);
      navigate("/");
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white mt-16 p-8 rounded-xl shadow-sm border border-gray-200 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">PlantGram</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Correo</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Contraseña</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-purple-700"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="text-center text-xs text-gray-500 mt-4">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-purple-600 font-semibold">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
