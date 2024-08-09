import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();
    const updatedAmbiente = await prisma.ambientes.update({
      where: { id_ambiente: id },
      data,
    });
    return NextResponse.json(updatedAmbiente, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    await prisma.ambientes.delete({ where: { id_ambiente: id } });
    return NextResponse.json({ message: 'Ambiente deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
