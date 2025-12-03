import { useEffect, useState } from "react";
import api from "../api/apiClient";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const res = await api.get("/publicaciones");
      // opcional: añadir campo likes si no viene
      const mapped = res.data.map((p) => ({
        ...p,
        likes: p.likes ?? p.reacciones?.length ?? 0,
      }));
      setPosts(mapped);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-10 text-gray-600">
        Cargando publicaciones...
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl flex justify-center">
        <div className="w-full max-w-xl">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No hay publicaciones todavía.
            </p>
          ) : (
            posts.map((post) => (
              <PostCard key={post._id} post={post} onRefresh={loadPosts} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
