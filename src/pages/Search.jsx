import { useState } from "react";
import api from "../api/apiClient";
import { Link } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [posts, setPosts] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(`/buscar?q=${encodeURIComponent(query)}`);
      setUsuarios(res.data.usuarios);
      setPosts(res.data.publicaciones);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <form className="flex mb-6" onSubmit={handleSearch}>
        <input
          className="flex-1 border rounded-l-md px-3 py-2 text-sm"
          placeholder="Busca usuarios o plantas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 bg-purple-600 text-white text-sm font-semibold rounded-r-md"
        >
          Buscar
        </button>
      </form>

      <div className="mb-6">
        <h2 className="font-semibold mb-2 text-sm text-gray-700">Usuarios</h2>
        {usuarios.length === 0 && (
          <p className="text-xs text-gray-500">Sin resultados.</p>
        )}
        <ul className="space-y-2">
          {usuarios.map((u) => (
            <li key={u._id}>
              <Link
                to={`/profile/${u._id}`}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm">
                  {u.nombreUsuario?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {u.nombreUsuario}
                  </div>
                  <div className="text-xs text-gray-500">{u.nombre}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-semibold mb-2 text-sm text-gray-700">
          Publicaciones
        </h2>
        {posts.length === 0 && (
          <p className="text-xs text-gray-500">Sin resultados.</p>
        )}
        <div className="grid grid-cols-3 gap-2">
          {posts.map((p) => (
            <Link
              key={p._id}
              to={`/post/${p._id}`}
              className="aspect-square bg-gray-200 overflow-hidden"
            >
              {p.imagenUrl && (
                <img
                  src={p.imagenUrl}
                  alt={p.descripcion}
                  className="w-full h-full object-cover"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
