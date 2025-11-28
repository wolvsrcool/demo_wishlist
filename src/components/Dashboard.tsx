import { FunnelIcon } from "@heroicons/react/24/outline";
import { useWishlist } from "../contexts/WishlistContext";
import { WishCard } from "./WishCard";
import { Select } from "./Select";
import { Button } from "./Button";
import { useOutletContext } from "react-router-dom";
import type { OutletContextType } from "./Container";
import { Pagination } from "./Pagination";

const dateSortSelectObj: Select = {
  name: "By adding date",
  attributeName: "createdAt",
  options: [
    {
      value: "asc",
      displayText: "Oldest first",
    },
    {
      value: "desc",
      displayText: "Newest first",
    },
  ],
};

const priceSortSelectObj: Select = {
  name: "By price",
  attributeName: "price",
  options: [
    {
      value: "asc",
      displayText: "Low to High",
    },
    {
      value: "desc",
      displayText: "High to Low",
    },
  ],
};

export function Dashboard() {
  const {
    wishlist,
    page,
    totalPages,
    isLoading,
    priceSortOrder,
    dateSortOrder,
    setDateSortOrder,
    setPriceSortOrder,
    setPage,
  } = useWishlist();

  const { setCreatingWish } = useOutletContext<OutletContextType>();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 flex flex-col gap-12 max-[40em]:p-4">
      <div
        className="flex gap-2 items-start
      max-[27em]:flex-col-reverse max-[27em]:gap-6"
      >
        <div
          className="flex gap-2 text-blue-400 transition duration-300 px-2 rounded-md py-1 group
        max-[40em]:flex-col"
        >
          <div className="flex items-center gap-2">
            <FunnelIcon className="size-6 group-hover:scale-120 transition duration-300" />
            <Select
              selectObj={priceSortSelectObj}
              value={priceSortOrder}
              setValue={setPriceSortOrder}
            />
          </div>
          <Select
            selectObj={dateSortSelectObj}
            value={dateSortOrder}
            setValue={setDateSortOrder}
          />
        </div>
        <Button
          className="ml-auto bg-blue-400 text-neutral-50 px-3 whitespace-nowrap max-[27em]:ml-0 h-10"
          onClick={() => setCreatingWish(true)}
          icon="sparkles"
        >
          Make a Wish
        </Button>
      </div>
      <div className="max-w-400 m-auto justify-center flex flex-wrap gap-12 max-[56em]:grid-cols-3">
        {wishlist.length > 0 ? (
          wishlist.map((wish) => <WishCard key={wish.id} wish={wish} />)
        ) : (
          <p>Start by adding a wish!</p>
        )}
        <div className="w-full">
          {totalPages > 1 && (
            <Pagination
              length={totalPages}
              curIndex={page}
              setterFunction={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
