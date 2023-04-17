"use client";
import { FC, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "@/app/types";
import Container from "../Container";
import Heading from "../Heading";
import ListingCard from "../listings/ListingCard";
interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser;
}

const ReservationsClient: FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = (id: string) => {
    setDeletingId(id);

    axios
      .delete(`/api/reservations/${id}`)
      .then((res) => {
        toast.success("Reservation canceled");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong");
        setDeletingId("");
      })
      .finally(() => {
        setDeletingId("");
      });
  };
  return (
    <Container>
      <Heading title="Reservations" subtitle="Booking on your properties" />
      <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
