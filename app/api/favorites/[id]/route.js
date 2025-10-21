import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route.js";
import { prisma } from "@/prisma";

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { id } = params;

  try {
    await prisma.favorite.deleteMany({
      where: { id, userId: session.user.id }, // ensure user owns the favorite
    });

    return new Response(JSON.stringify({ message: "Deleted successfully" }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to delete song" }), {
      status: 500,
    });
  }
}

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { id } = params;
  const { name } = await req.json();

  if (!name?.trim()) {
    return new Response(
      JSON.stringify({ error: "Song name cannot be empty" }),
      { status: 400 }
    );
  }

  try {
    const updated = await prisma.favorite.updateMany({
      where: { id, userId: session.user.id },
      data: { songName: name.trim() },
    });

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to update song" }), {
      status: 500,
    });
  }
}
