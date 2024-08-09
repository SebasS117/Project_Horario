import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const ambientes = await prisma.ambientes.findMany();
    return NextResponse.json(ambientes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const nuevoAmbiente = await prisma.ambientes.create({ data });
    return NextResponse.json(nuevoAmbiente, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
