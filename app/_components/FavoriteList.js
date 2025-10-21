"use client";
import FavoriteItem from "./FavoriteItem";
export default function FavoriteList({ songs, onEdit, onDelete }) {
  if (songs.length === 0)
    return (
      <p className="text-center text-gray-500 py-6">
        No favorite songs yet 🎵 Add one below!
      </p>
    );

  return (
    <div className="space-y-3">
      {songs.map((song) => (
        <FavoriteItem
          key={song.id}
          song={song}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
