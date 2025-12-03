import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/apiClient";
import { useState } from "react";

export default function PostCard({ post, onRefresh }) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes ?? 0);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (!user) return;
    try {
      if (!liked) {
        await api.post("/reacciones", { idPublicacion: post._id });
        setLikes((prev) => prev + 1);
      } else {
        // Para simplificar, recargas el feed con onRefresh, si lo pasas
        if (onRefresh) onRefresh();
      }
      setLiked(!liked);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 max-w-xl mx-auto mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold">
          {post.idAutor?.nombreUsuario?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <Link
            to={`/profile/${post.idAutor?._id}`}
            className="font-semibold text-sm"
          >
            {post.idAutor?.nombreUsuario || "Usuario"}
          </Link>
          <div className="text-xs text-gray-500">
            {post.descripcion?.slice(0, 30)}
          </div>
        </div>
      </div>

      {/* Imagen */}
      {post.imagenUrl && (
        <div className="bg-black">
          <img
            src={post.imagenUrl}
            alt={post.descripcion}
            className="w-full max-h-[500px] object-cover"
          />
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 text-sm ${
            liked ? "text-red-500" : "text-gray-700"
          }`}
        >
          <span>♥</span>
          <span>{likes} likes</span>
        </button>

        <div className="mt-2 text-sm">
          <span className="font-semibold mr-1">
            {post.idAutor?.nombreUsuario}
          </span>
          <span>{post.descripcion}</span>
        </div>

        <Link
          to={`/post/${post._id}`}
          className="block mt-2 text-xs text-gray-500"
        >
          Ver comentarios
        </Link>
      </div>
    </div>
  );
}
