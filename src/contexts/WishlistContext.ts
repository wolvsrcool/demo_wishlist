import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { ActiveSortType } from "./WishlistProvider";

export interface Wish {
  id?: string;
  imgSrc: string;
  title: string;
  description: string;
  price: number;
  createdAt?: number;
}

export interface WishlistContextType {
  wishlist: Wish[];
  isLoading: boolean;
  error: string | null;
  deleteWish: (id: string) => void;
  editWish: (id: string, newWish: Wish) => void;
  getWishById: (id: string) => Promise<Wish | undefined>;
  addWish: (newWish: Wish) => void;
  getWishlistSortedPaginated: () => void;
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
  priceSortOrder: string;
  dateSortOrder: string;
  setPriceSortOrder: (value: "desc" | "asc") => void;
  setDateSortOrder: (value: "desc" | "asc") => void;
  activeSort: ActiveSortType;
}

export const WishlistContext = createContext<WishlistContextType | null>(null);

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("WhishlistContext was used outside of WhishlistProvider!");
  return context;
}
