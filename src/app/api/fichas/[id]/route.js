import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const handleErrors = (error) => {
  return new NextResponse(error.message, { status: 500 });
};

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const ficha = await prisma.fichas.findUnique({
      where: { codigo: parseInt(id) },
      include: {
        Programas: true, // Incluir relación con Programas si es necesario
      },
    });
    if (!ficha) {
      return new NextResponse("Ficha not found", { status: 404 });
    }
    return NextResponse.json({ datos: ficha }, { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const data = await request.json();
    const updatedFicha = await prisma.fichas.update({
      where: { codigo: parseInt(id) },
      data: {
        inicio_fecha: new Date(data.inicio_fecha),
        fin_lectiva: new Date(data.fin_lectiva),
        fin_ficha: new Date(data.fin_ficha),
        programa: data.programa,
        sede: data.sede,
        estado: data.estado,
      },
    });
    return new NextResponse(JSON.stringify(updatedFicha), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return handleErrors(error);
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await prisma.fichas.delete({
      where: { codigo: parseInt(id) },
    });
    return new NextResponse("Ficha deleted", { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}

