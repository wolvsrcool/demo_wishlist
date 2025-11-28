import type { Dispatch, SetStateAction } from "react";
import { Button } from "./Button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface Props {
  length: number;
  curIndex: number;
  setterFunction: Dispatch<SetStateAction<number>>;
  pagginationButton?: React.ReactNode;
}

export function Pagination({
  length,
  curIndex,
  setterFunction,
  pagginationButton,
}: Props) {
  const items = Array(length).fill(-1);

  function handleNext() {
    setterFunction((cur) => (cur + 1 > length ? length : cur + 1));
  }

  function handlePrev() {
    setterFunction((cur) => (cur - 1 < 1 ? 1 : cur - 1));
  }

  function setIndex(index: number) {
    setterFunction(index);
  }

  return (
    <div className="flex items-center justify-between gap-2 p-0">
      {curIndex !== 1 ? (
        <Button onClick={handlePrev} className="bg-blue-400 text-neutral-50">
          <ArrowLeftIcon className="size-6" />
        </Button>
      ) : (
        <div className="p-4"></div>
      )}

      <div className="flex gap-2 items-center justify-center">
        <div className="flex gap-x-2 gap-y-1 flex-wrap items-center justify-center">
          {items.map((_, i) => (
            <div
              key={i}
              className="px-2 cursor-pointer transition duration-300 bg-blue-200 hover:bg-blue-300 text-neutral-50 
              flex items-center justify-center rounded-md"
              style={{
                backgroundColor:
                  curIndex === i + 1 ? "oklch(70.7% 0.165 254.624)" : "",
              }}
              onClick={() => setIndex(i + 1)}
            >
              {i + 1}
            </div>
          ))}
        </div>
        {pagginationButton}
      </div>

      {curIndex !== length ? (
        <Button onClick={handleNext} className="bg-blue-400 text-neutral-50">
          <ArrowRightIcon className="size-6" />
        </Button>
      ) : (
        <div className="p-4"></div>
      )}
    </div>
  );
}
