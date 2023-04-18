"use client";
import { SafeListing, SafeUser } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import Container from "../Container";
import Heading from "../Heading";
import ListingCard from "../listings/ListingCard";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = async (id: string) => {
    setDeletingId(id);
    axios
      .delete(`/api/listings/${id}`)
      .then(() => {
        toast.success("Listing deleted");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setDeletingId("");
      });
  };
  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            key={listing.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
