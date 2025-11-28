import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { type Wish } from "../contexts/WishlistContext";
import { Button } from "./Button";
import { Link, useOutletContext } from "react-router-dom";
import type { OutletContextType } from "./Container";

interface Props {
  wish: Wish;
}

export function WishCard({ wish }: Props) {
  const { setWishToEdit, setWishToDelete } =
    useOutletContext<OutletContextType>();

  return (
    <div
      className="w-full max-w-70 flex flex-col bg-blue-100 text-neutral-900 
      shadow-[0_-3px_6px_rgba(0,0,0,0.1)] rounded-md overflow-hidden"
    >
      <div className="flex max-h-35 h-full">
        <img
          className="w-full aspect-video object-cover"
          src={wish.imgSrc}
          alt=""
        />
      </div>
      <div className="bg-blue-300 text-neutral-50 px-1 justify-start flex items-center">
        <CurrencyDollarIcon className="size-6 shrink-0" />
        <p className="truncate">{wish.price.toLocaleString("en-US")}</p>
      </div>
      <p className="text-lg bg-blue-400 text-neutral-100 px-2 py-1 truncate">
        {wish.title}
      </p>
      <div className="border border-blue-400 border-t-0 rounded-b-md">
        <div className="p-2 max-h-24.5">
          <p className="bg-blue-50 min-h-19.5 px-2 py-1 flex-1 wrap-break-word line-clamp-3 rounded-sm">
            {wish.description}
          </p>
        </div>
        <div className="flex flex-col  gap-2 p-2 pt-0 text-neutral-50">
          <Link to={`wish/${wish.id}`}>
            <Button className="bg-blue-400 w-full" icon="info">
              Details
            </Button>
          </Link>
          <div className="flex flex-1 gap-2">
            <Button
              onClick={() => setWishToDelete(wish)}
              className="w-full bg-red-400"
              icon="trash"
            >
              Delete
            </Button>
            <Button
              onClick={() => setWishToEdit(wish)}
              className="w-full bg-yellow-400 text-neutral-700"
              icon="pencil"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
