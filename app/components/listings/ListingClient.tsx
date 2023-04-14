"use client";
import { FC } from "react";
import { SafeListing, SafeUser } from "../../types";
import { Reservation } from "@prisma/client";
import { categories } from "@/constants/categories";
import Container from "../Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  reservation?: Reservation[];
  currentUser?: SafeUser | null;
}

const ListingClient: FC<ListingClientProps> = ({
  listing,
  reservation,
  currentUser,
}) => {
  const category = categories.find((c) => c.label === listing.category);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 mt-6 md:grid-cols-7 md:gap-10">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guessCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
