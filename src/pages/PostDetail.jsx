import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/apiClient";
import { useAuth } from "../context/AuthContext";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const { user } = useAuth();

  const load = async () => {
    try {
      const [pRes, cRes] = await Promise.all([
        api.get(`/publicaciones/${id}`),
        api.get(`/comentarios/publicacion/${id}`),
      ]);
      setPost(pRes.data);
      setComentarios(cRes.data);
    } catch (e) {
      console.error(e);
    }
  };

useEffect(() => {
  let cancelled = false;

  const load = async () => {
    try {
      const [pRes, cRes] = await Promise.all([
        api.get(`/publicaciones/${id}`),
        api.get(`/comentarios/publicacion/${id}`),
      ]);
      if (!cancelled) {
        setPost(pRes.data);
        setComentarios(cRes.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  load();

  return () => {
    cancelled = true;
  };
}, [id]);


  const handleComment = async (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;
    try {
      await api.post("/comentarios", {
        texto: nuevoComentario,
        idPublicacion: id,
      });
      setNuevoComentario("");
      load();
    } catch (e) {
      console.error(e);
    }
  };

  if (!post) {
    return (
      <div className="flex justify-center mt-10 text-gray-600">
        Cargando publicación...
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="bg-white mt-10 rounded-xl shadow-sm border border-gray-200 w-full max-w-3xl flex flex-col md:flex-row">
        {/* Imagen */}
        <div className="md:w-1/2 bg-black">
          {post.imagenUrl && (
            <img
              src={post.imagenUrl}
              alt={post.descripcion}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Info + comentarios */}
        <div className="md:w-1/2 flex flex-col">
          <div className="flex items-center gap-3 px-4 py-3 border-b">
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm">
              {post.idAutor?.nombreUsuario?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="font-semibold text-sm">
              {post.idAutor?.nombreUsuario}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 text-sm">
            <p className="mb-3">
              <span className="font-semibold mr-1">
                {post.idAutor?.nombreUsuario}
              </span>
              {post.descripcion}
            </p>
            <hr className="mb-3" />
            {comentarios.map((c) => (
              <div key={c._id} className="mb-2">
                <span className="font-semibold mr-1">
                  {c.idAutor?.nombreUsuario}
                </span>
                <span>{c.texto}</span>
              </div>
            ))}
          </div>

          {user && (
            <form
              onSubmit={handleComment}
              className="border-t px-4 py-3 flex items-center gap-2"
            >
              <input
                className="flex-1 border rounded-md px-3 py-2 text-sm"
                placeholder="Añade un comentario..."
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
              />
              <button
                type="submit"
                className="text-sm text-purple-600 font-semibold"
              >
                Publicar
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
