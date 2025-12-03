import { useState } from "react";
import api from "../api/apiClient";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
  const [form, setForm] = useState({
    imagenUrl: "",
    descripcion: "",
    etiquetas: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        imagenUrl: form.imagenUrl,
        descripcion: form.descripcion,
        etiquetas: form.etiquetas
          .split(" ")
          .filter((t) => t.startsWith("#"))
          .map((t) => t.replace("#", "")),
      };
      await api.post("/publicaciones", payload);
      navigate("/");
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "Error al crear publicación");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white mt-16 p-8 rounded-xl shadow-sm border border-gray-200 w-full max-w-xl">
        <h1 className="text-xl font-semibold mb-4">Nueva publicación</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Imagen (URL)</label>
            <input
              name="imagenUrl"
              value={form.imagenUrl}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
              rows="3"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">
              Etiquetas (ej: #suculenta #aloevera)
            </label>
            <input
              name="etiquetas"
              value={form.etiquetas}
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
            Subir
          </button>
        </form>
      </div>
    </div>
  );
}
