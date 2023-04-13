"use client";
import useCountries from "@/app/hooks/useCountires";
import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC, MouseEvent } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) return;

    onAction?.(actionId);
  };

  const price = () => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  };

  const reservationDate = () => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}}`;
  };

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col w-full gap-2">
        <div className="relative w-full overflow-hidden aspect-square rounded-xl">
          <Image
            alt="Listing"
            src={data.imageSrc}
            className="object-cover w-full h-full transition group-hover:scale-110"
            fill
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <p className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </p>
        <p className="font-light text-neutral-500">
          {reservationDate() || data.category}
        </p>
        <div className="flex flex-row items-center gap-1">
          <p className="font-semibold">$ {price()}</p>
          {!reservation && <p className="font-light"> night</p>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
