import type { Dispatch, SetStateAction } from "react";
import { useWishlist, type Wish } from "../contexts/WishlistContext";
import { Button } from "./Button";
import { ModalContainer } from "./ModalContainer";

interface Props {
  setWishToDelete: Dispatch<SetStateAction<Wish | null>>;
  wish: Wish;
}

export function DeleteModal({ setWishToDelete, wish }: Props) {
  const { deleteWish } = useWishlist();

  return (
    <ModalContainer
      maxWidthClassName="max-w-90"
      nameClass="bg-red-400"
      modalName={`Delete ${wish.title}?`}
    >
      {/* <p className="wrap-break-word">{wish.title}</p> */}
      <img src={wish.imgSrc} className="rounded-md" alt="" />
      <div className="flex gap-4">
        <Button
          onClick={() => setWishToDelete(null)}
          className="w-full border text-neutral-900 opacity-60 p-2"
          icon="cancel"
        >
          No
        </Button>

        <Button
          onClick={() => {
            deleteWish(wish.id!);
            setWishToDelete(null);
          }}
          className="w-full border border-red-400 bg-red-400 text-neutral-50 p-2"
          icon="trash"
        >
          Yes
        </Button>
      </div>
    </ModalContainer>
  );
}
