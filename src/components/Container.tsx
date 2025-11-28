import { Outlet } from "react-router-dom";
import { DeleteModal } from "./DeleteModal";
import { InputsModal } from "./InputsModal";
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useWishlist, type Wish } from "../contexts/WishlistContext";

export interface OutletContextType {
  setWishToDelete: Dispatch<SetStateAction<Wish | null>>;
  setWishToEdit: Dispatch<SetStateAction<Wish | null>>;
  setCreatingWish: Dispatch<SetStateAction<boolean>>;
  wishToEdit: Wish | null;
  refetchWish: boolean;
  setRefetchWish: Dispatch<SetStateAction<boolean>>;
}

export function Container() {
  const [wishToDelete, setWishToDelete] = useState<Wish | null>(null);
  const [wishToEdit, setWishToEdit] = useState<Wish | null>(null);
  const [creatingWish, setCreatingWish] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const [refetchWish, setRefetchWish] = useState<boolean>(true);

  const { isLoading, error } = useWishlist();

  const closeSnackbarTimeout = useRef<number>(undefined);

  useEffect(() => {
    if (isLoading === false) {
      setTimeout(() => {
        setShowSnackbar(true);
        clearTimeout(closeSnackbarTimeout.current);

        closeSnackbarTimeout.current = setTimeout(() => {
          setShowSnackbar(false);
        }, 1500);
      }, 0);
    }
  }, [isLoading]);

  return (
    <div className="max-w-480 m-auto">
      <Outlet
        context={{
          setWishToDelete,
          setWishToEdit,
          setCreatingWish,
          wishToEdit,
          refetchWish,
          setRefetchWish,
        }}
      />
      {wishToDelete && (
        <DeleteModal setWishToDelete={setWishToDelete} wish={wishToDelete} />
      )}
      {wishToEdit && (
        <InputsModal
          wishSetterFunc={setWishToEdit}
          wish={wishToEdit}
          modalType="edit"
          setRefetchWish={setRefetchWish}
        />
      )}
      {creatingWish && (
        <InputsModal
          wishSetterFunc={setCreatingWish}
          wish={creatingWish}
          modalType="addNew"
        />
      )}
      <div
        className="fixed left-2 bottom-2 opacity-80 text-neutral-50 p-2 rounded-md transition duration-300"
        style={{
          opacity: showSnackbar ? "1" : "0",
          transform: `translateY(${showSnackbar ? "0" : "100%"})`,
          backgroundColor:
            error !== null ? "oklch(70.4% 0.191 22.216)" : "#05df72",
        }}
      >
        {error ? `${error}` : "Request successfull!"}
      </div>
    </div>
  );
}
