import { NextResponse } from "next/server";
import { prisma } from '../../../../prisma.js'

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // ⚠ For production, hash passwords!
      },
    });

    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
