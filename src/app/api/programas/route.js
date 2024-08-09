import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const handleErrors = (error) => {
  return new NextResponse(error.message, { status: 500 });
};

export async function GET() {
  try {
    const programas = await prisma.programas.findMany();
    return NextResponse.json({ datos: programas }, { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const programa = await prisma.programas.create({
      data: {
        nombre_programa: data.nombre_programa,
        sigla: data.sigla,
        nivel: data.nivel,
        estado: data.estado,
      },
    });
    return new NextResponse(JSON.stringify(programa), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    return handleErrors(error);
  }
}
