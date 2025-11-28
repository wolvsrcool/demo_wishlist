import { Link, useOutletContext, useParams } from "react-router-dom";
import { useWishlist, type Wish } from "../contexts/WishlistContext";
import { useEffect, useState } from "react";
import {
  ArrowUturnLeftIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./Button";
import type { OutletContextType } from "./Container";

export function WishPage() {
  const [wish, setWish] = useState<Wish>();
  const { id } = useParams();
  const { getWishById, isLoading } = useWishlist();
  const { setWishToEdit, setWishToDelete, refetchWish, setRefetchWish } =
    useOutletContext<OutletContextType>();

  useEffect(() => {
    async function fetchWish() {
      setWish(await getWishById(id!));
    }
    fetchWish();
  }, [id, getWishById]);

  useEffect(() => {
    if (refetchWish) {
      async function refetchWishData() {
        setWish(await getWishById(id!));
        setRefetchWish(false);
      }
      refetchWishData();
    }
  }, [refetchWish, id, getWishById, setRefetchWish]);

  return (
    <div className="p-6 bg-stone-100 min-h-screen flex flex-col gap-6">
      <Link to="/" className="w-fit group">
        <div className="flex items-center gap-2 px-2 py-1 rounded-md transition">
          <ArrowUturnLeftIcon className="size-6 group-hover:scale-110 group-hover:rotate-2 duration-300" />
          <span className="text-neutral-700 group-hover:text-neutral-900 transition">
            Back to Dashboard
          </span>
        </div>
      </Link>

      <div className="flex flex-col gap-4 flex-1">
        {isLoading ? (
          <p>Loading...</p>
        ) : !wish ? (
          `No wish with id ${id} found.`
        ) : (
          <>
            <p className="bg-blue-50 border border-blue-400 text-neutral-800 px-3 py-1 rounded-md flex gap-2 items-center w-fit shadow-sm">
              <CalendarIcon className="size-6" />
              Added on{" "}
              {wish?.createdAt
                ? new Date(wish.createdAt).toLocaleDateString("en-US")
                : "...actually we don't know."}
            </p>

            <div className="flex flex-row gap-4 items-start w-full max-[56em]:flex-col">
              <div className="w-full max-w-200 bg-blue-100 rounded-md overflow-hidden shadow-[0_0_4px_rgba(0,0,0,0.1)]">
                <div className="w-full">
                  <img
                    className="w-full aspect-auto object-cover"
                    src={wish?.imgSrc}
                    alt=""
                  />
                </div>
                <div className="bg-blue-300 text-neutral-50 px-2 py-2 flex items-center gap-1">
                  <CurrencyDollarIcon className="size-6 shrink-0" />
                  <p className="truncate">
                    {wish?.price.toLocaleString("en-US")}
                  </p>
                </div>
              </div>

              <div className="flex flex-col max-w-full flex-1 min-w-100 bg-blue-100 rounded-md shadow-[0_0_4px_rgba(0,0,0,0.1)] overflow-hidden border border-blue-300 max-[56em]:min-w-full">
                <div className="bg-blue-400 text-neutral-50 px-3 py-2">
                  <p className="text-xl font-semibold wrap-break-word">
                    {wish?.title}
                  </p>
                </div>
                <div className="p-3 flex-1 bg-blue-50">
                  <p className="wrap-break-word min-h-20 bg-blue-100 rounded-md p-3 text-neutral-900">
                    {wish?.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-auto">
              <Button
                onClick={() => setWishToDelete(wish ?? null)}
                className="w-full bg-red-400 text-neutral-50 text-lg py-2"
                icon="trash"
              >
                Delete
              </Button>

              <Button
                onClick={() => setWishToEdit(wish ?? null)}
                className="w-full bg-yellow-400 text-neutral-700 text-lg py-2"
                icon="pencil"
              >
                Update
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
