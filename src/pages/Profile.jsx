import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/apiClient";

export default function Profile() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [uRes, pRes] = await Promise.all([
          api.get(`/usuarios/${id}`),
          api.get(`/publicaciones/usuario/${id}`),
        ]);
        setUsuario(uRes.data);
        setPosts(pRes.data);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, [id]);

  if (!usuario) {
    return (
      <div className="flex justify-center mt-10 text-gray-600">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center text-3xl text-white">
          {usuario.nombreUsuario?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <h1 className="text-xl font-semibold">{usuario.nombreUsuario}</h1>
          <p className="text-sm text-gray-700">{usuario.nombre}</p>
          <p className="text-sm text-gray-600 mt-1">{usuario.biografia}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {posts.map((p) => (
          <div key={p._id} className="aspect-square bg-gray-200 overflow-hidden">
            {p.imagenUrl && (
              <img
                src={p.imagenUrl}
                alt={p.descripcion}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
