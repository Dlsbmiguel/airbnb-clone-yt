import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    price,
    location,
    category,
    imageSrc,
    roomCount,
    guestCount,
    bathroomCount,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      price: parseInt(price, 10),
      locationValue: location.value,
      category,
      imageSrc,
      roomCount,
      guessCount: guestCount,
      bathroomCount,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
