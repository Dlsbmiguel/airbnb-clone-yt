import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import { MouseEvent, useCallback, useMemo } from "react";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = () => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  };

  const toggleFavorite = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasFavorited()) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }

      await request();
      router.refresh();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
