import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/apiClient";

export default function Notifications() {
  const { user } = useAuth();
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/notificaciones/${user._id}`);
        setNotifs(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    if (user) load();
  }, [user]);

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-xl font-semibold mb-4">Notificaciones</h1>
      {notifs.length === 0 ? (
        <p className="text-sm text-gray-500">Sin notificaciones.</p>
      ) : (
        <ul className="space-y-3">
          {notifs.map((n) => (
            <li
              key={n._id}
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm"
            >
              <span className="font-semibold">
                {n.origen?.nombreUsuario || "Alguien"}
              </span>{" "}
              {n.tipo === "like" && "le dio like a tu publicación"}
              {n.tipo === "comentario" && "comentó tu publicación"}
              {n.tipo === "seguido" && "empezó a seguirte"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
