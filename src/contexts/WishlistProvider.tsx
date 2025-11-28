import { useCallback, useEffect, useState } from "react";
import {
  WishlistContext,
  type WishlistContextType,
  type Wish,
} from "./WishlistContext";
import { useApi } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export interface ActiveSortType {
  field: "price" | "createdAt";
  value: "desc" | "asc";
}

export function WishlistProvider({ children }: Props) {
  const [wishlist, setWishlist] = useState<Wish[]>([]);

  const [dateSortOrder, setDateSortOrder] = useState<string>("desc");
  const [priceSortOrder, setPriceSortOrder] = useState<string>("desc");
  const [activeSort, setActiveSort] = useState<ActiveSortType>({
    field: "price",
    value: "desc",
  });

  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const { get, del, put, post, isLoading, error } = useApi();

  function handleDateSortChange(value: "desc" | "asc") {
    setActiveSort({ field: "createdAt", value: value });
    setDateSortOrder(value);
    setPage(1);
  }

  function handlePriceSortChange(value: "desc" | "asc") {
    setActiveSort({ field: "price", value: value });
    setPriceSortOrder(value);
    setPage(1);
  }

  async function deleteWish(id: string) {
    navigate("/");
    await del(`wishlist/${id}`);
    setPage(1);
    getWishlistSortedPaginated();
  }

  const getWishlistSortedPaginated = useCallback(
    async function () {
      const sortStr = `_sort=${activeSort.value === "desc" ? "-" : ""}${
        activeSort.field
      }`;

      const data = await get(`wishlist?${sortStr}&_page=${page}&_per_page=10`);
      setWishlist(data.data);
      setTotalPages(data.pages);
    },
    [get, activeSort, page]
  );

  const getWishById = useCallback(
    async function (id: string) {
      return await get(`wishlist/${id}`);
    },
    [get]
  );

  async function addWish(newWish: Wish) {
    await post("wishlist", newWish);
    getWishlistSortedPaginated();
  }

  const editWish = useCallback(
    async function (id: string, newWish: Wish) {
      await put(`wishlist/${id}`, newWish);
      getWishlistSortedPaginated();
    },
    [put, getWishlistSortedPaginated]
  );

  useEffect(() => {
    getWishlistSortedPaginated();
  }, [getWishlistSortedPaginated]);

  const values: WishlistContextType = {
    wishlist,
    isLoading,
    error,
    deleteWish,
    editWish,
    getWishById,
    addWish,
    getWishlistSortedPaginated,
    page,
    totalPages,
    setPage,
    priceSortOrder,
    setPriceSortOrder: handlePriceSortChange,
    dateSortOrder,
    setDateSortOrder: handleDateSortChange,
    activeSort,
  };

  return (
    <WishlistContext.Provider value={values}>
      {children}
    </WishlistContext.Provider>
  );
}
