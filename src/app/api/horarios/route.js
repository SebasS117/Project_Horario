import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const handleErrors = (error) => {
  return new NextResponse(error.message, { status: 500 });
};

export async function GET() {
  try {
    const horarios = await prisma.horarios.findMany({
      include: {
        fichas: true,
        ambientes: true,
        vinculacion: true,
      },
    });
    return NextResponse.json({ datos: horarios }, { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const horario = await prisma.horarios.create({
      data: {
        fecha_inicio: new Date(data.fecha_inicio),
        hora_inicio: data.hora_inicio,
        fecha_fin: new Date(data.fecha_fin),
        hora_fin: data.hora_fin,
        dia: data.dia,
        cantidad_horas: data.cantidad_horas,
        instructor: data.instructor,
        ficha: data.ficha,
        ambiente: data.ambiente,
        estado: data.estado || 'aprobado', // Valor por defecto para estado
      },
    });
    return new NextResponse(JSON.stringify(horario), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    return handleErrors(error);
  }
}
