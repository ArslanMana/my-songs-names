import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/prisma";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { songName } = await req.json();

  if (!songName || !songName.trim()) {
    return new Response(JSON.stringify({ error: "Song name is required" }), { status: 400 });
  }

  try {
    const favorite = await prisma.favorite.create({
      data: {
        songName: songName.trim(),
        userId: session.user.id,
      },
    });

    return new Response(JSON.stringify(favorite), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to add favorite" }), { status: 500 });
  }
}
