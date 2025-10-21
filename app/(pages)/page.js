// app/favorites/page.jsx
import FavoriteList from "../_components/FavoriteList";
import AddSongForm from "../_components/AddSongForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route.js";
import { prisma } from "@/prisma";

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);

  // Fetch user favorites directly from Prisma
  const songs = await prisma.favorite.findMany({
    where: { userId: session.user.id },
  });

  return (
    <div className="min-h-screen pt-20 px-4 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🎧 My Favorite Songs
        </h2>

        {/* List of favorites */}
        <FavoriteList songs={songs} />

        {/* Add song form (client-side component) */}
        <AddSongForm />
      </div>
    </div>
  );
}
