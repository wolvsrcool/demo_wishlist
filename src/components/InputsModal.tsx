import { useState, type Dispatch, type SetStateAction } from "react";
import { useWishlist, type Wish } from "../contexts/WishlistContext";
import { Button } from "./Button";
import { ModalContainer } from "./ModalContainer";

interface requiredProps {
  modalType: "edit" | "addNew";
}

interface AddNewProps extends requiredProps {
  wishSetterFunc: Dispatch<SetStateAction<boolean>>;
  wish: boolean;
  modalType: "addNew";
  setRefetchWish?: null;
}

interface EidtProps extends requiredProps {
  wishSetterFunc: Dispatch<SetStateAction<Wish | null>>;
  wish: Wish;
  modalType: "edit";
  setRefetchWish: Dispatch<SetStateAction<boolean>>;
}

type Props = EidtProps | AddNewProps;

export function InputsModal({
  wishSetterFunc,
  wish,
  modalType,
  setRefetchWish,
}: Props) {
  const { editWish, addWish } = useWishlist();

  const [title, setTitle] = useState<string>(
    modalType === "edit" ? wish.title : ""
  );
  const [imgSrc, setImgSrc] = useState<string>(
    modalType === "edit" ? wish.imgSrc : ""
  );
  const [description, setDescription] = useState<string>(
    modalType === "edit" ? wish.description : ""
  );
  const [price, setPrice] = useState<string>(
    String(modalType === "edit" ? wish.price : "")
  );

  const [error, setError] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !price.trim()) {
      setError(`All fields are required!`);
      return;
    }

    if (title.trim().length > 150) {
      setError(`Max title length is 150 characters!`);
      return;
    }
    if (description.trim().length > 750) {
      setError(`Max description length is 750 characters!`);
      return;
    }
    if (price.length > 15) {
      setError(`Max price length is 15 characters!`);
      return;
    }

    if (modalType === "edit") {
      editWish(wish.id!, {
        title: title.trim(),
        imgSrc,
        description: description.trim(),
        price: Number(price),
        createdAt: wish.createdAt,
      });
      wishSetterFunc(null);
      setRefetchWish(true);
    }

    if (modalType === "addNew") {
      addWish({
        title: title.trim(),
        imgSrc,
        description: description.trim(),
        price: Number(price),
        createdAt: Date.now(),
      });
      wishSetterFunc(false);
    }
  }

  return (
    <ModalContainer
      nameClass={
        modalType === "edit"
          ? "bg-yellow-400 text-neutral-700"
          : "bg-blue-400 text-neutral-50"
      }
      maxWidthClassName="max-w-150"
      modalName={modalType === "edit" ? "Update your wish" : "Make a Wish"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {error.includes(`All fields`) && (
          <p className="text-red-400">All fields are required!</p>
        )}
        <div className="flex flex-col gap-1">
          <label className="flex flex-col gap-1">
            <p className="text-neutral-600">Image source</p>
            <input
              type="text"
              onFocus={() => {
                if (error.includes(`All fields`)) setError("");
              }}
              value={imgSrc}
              name="wishImgSrc"
              placeholder="Link to an image..."
              onChange={(e) => setImgSrc(e.target.value)}
              className="w-full border border-neutral-300 rounded-sm px-2 py-1 bg-neutral-50"
            />
          </label>
          <div className=" border aspect-video border-neutral-300 rounded-sm flex justify-center max-w-80 max-h-45">
            {imgSrc ? (
              <img
                src={imgSrc}
                className="max-w-80 w-full aspect-video object-contain"
                alt=""
              />
            ) : null}
          </div>
        </div>

        <label className="flex flex-col gap-1">
          <div
            className="flex gap-2 
          max-[27em]:flex-col-reverse max-[27em]:gap-0"
          >
            <p className="text-neutral-600">Title</p>
            <p className="text-red-400">
              {error.includes(`title`) ? error : null}
            </p>
          </div>
          <input
            type="text"
            name="wishTitle"
            placeholder="What are you wishing for...?"
            onFocus={() => {
              if (error.includes(`All fields`)) setError("");
            }}
            value={title}
            onChange={(e) => {
              if (
                error.includes(`title`) &&
                e.target.value.trim().length <= 150
              ) {
                setError(``);
              }
              setTitle(e.target.value);
            }}
            className="w-full border border-neutral-300 rounded-sm px-2 py-1 bg-neutral-50"
          />
        </label>

        <label className="flex flex-col gap-1">
          <div className="flex gap-2 max-[27em]:flex-col-reverse max-[27em]:gap-0">
            <p className="text-neutral-600">Description</p>
            <p className="text-red-400">
              {error.includes(`description`) ? error : null}
            </p>
          </div>
          <textarea
            rows={5}
            value={description}
            name="wishdescription"
            placeholder="More details about your wish..."
            onFocus={() => {
              if (error.includes(`All fields`)) setError("");
            }}
            onChange={(e) => {
              if (
                error.includes(`description`) &&
                e.target.value.trim().length <= 750
              ) {
                setError(``);
              }
              setDescription(e.target.value);
            }}
            className="w-full border border-neutral-300 rounded-sm px-2 py-1 resize-none bg-neutral-50"
          />
        </label>

        <p className="text-red-400 -mb-2">
          {error.includes(`price`) ? error : null}
        </p>
        <label className="flex gap-2 items-center">
          <p className="text-neutral-600">Price</p>
          <input
            type="number"
            value={price}
            onFocus={() => {
              if (error.includes(`All fields`)) setError("");
            }}
            name="wishPrice"
            placeholder="How pricy it is..."
            onChange={(e) => {
              if (error.includes(`price`) && price.length <= 15) {
                setError(``);
              }
              setPrice(e.target.value);
            }}
            className="w-full border border-neutral-300 rounded-sm px-2 py-1 resize-none bg-neutral-50"
          />
        </label>

        <div className="flex gap-4">
          <Button
            onClick={() => {
              if (modalType === "edit") {
                wishSetterFunc(null);
              } else {
                wishSetterFunc(false);
              }
            }}
            className="w-full text-neutral-900 border opacity-60 p-2"
            icon="cancel"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className={`w-full border p-2 whitespace-nowrap
              ${
                modalType === "edit"
                  ? "border-yellow-400 bg-yellow-400 text-neutral-800"
                  : "border-blue-400 bg-blue-400 text-neutral-50"
              }`}
            icon={modalType === "edit" ? "pencil" : "sparkles"}
          >
            {modalType === "edit" ? "Save changes" : "Add"}
          </Button>
        </div>
      </form>
    </ModalContainer>
  );
}
