"use client";
import useCountries from "@/app/hooks/useCountires";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { BiSearch } from "react-icons/bi";

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  const params = useSearchParams();
  const { getByValue } = useCountries();
  const searchModal = useSearchModal();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = () => {
    if (locationValue) {
      const country = getByValue(locationValue as string)?.label;
      return country;
    }
    return "Anywhere";
  };

  const durationLabel = () => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }
    return "Any Week";
  };

  const guestLabel = () => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return "Add Guests";
  };
  return (
    <div
      onClick={searchModal.onOpen}
      className="w-full py-2 transition border rounded-full shadow-sm cursor-pointer md:w-auto hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className="px-6 text-sm font-semibold">{locationLabel()}</div>
        <div className="flex-1 hidden px-6 text-sm font-semibold text-center sm:block border-x">
          {durationLabel()}
        </div>
        <div className="flex items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
          <div className="hidden sm:block">{guestLabel()}</div>
          <div className="p-2 text-white rounded-full bg-rose-500">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
