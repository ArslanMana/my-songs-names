"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function FavoriteItem({ song }) {
  const [isEditing, setIsEditing] = useState(false);
  const [songName, setSongName] = useState(song.songName);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this song?")) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/favorites/${song.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Song deleted!");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Error deleting song");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!isEditing) return setIsEditing(true);

    if (!songName.trim()) {
      toast.error("Song name cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/favorites/${song.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: songName }),
      });

      if (!res.ok) throw new Error("Failed to update");
      toast.success("Song updated!");
      setIsEditing(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Error updating song");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSongName(song.songName); // revert
  };

  return (
    <div className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 mt-2">
      {isEditing ? (
        <input
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        <p className="text-gray-800 font-medium">{songName}</p>
      )}

      <div className="flex gap-2">
        <button
          onClick={isEditing ? handleEdit : () => setIsEditing(true)}
          disabled={loading}
          className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition disabled:opacity-50"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        {isEditing && (
          <button
            onClick={handleCancel}
            disabled={loading}
            className="text-gray-500 hover:text-gray-700 text-sm font-semibold"
          >
            ✕
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-red-500 hover:text-red-700 text-sm font-semibold transition disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
