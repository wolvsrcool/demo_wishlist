import { useEffect, useRef, useState } from "react";
import { useWishlist } from "../contexts/WishlistContext";

interface Props {
  selectObj: Select;
  value: string;
  setValue: (value: "desc" | "asc") => void;
}

export interface Select {
  name: string;
  attributeName: string;
  options: SelectOption[];
}

interface SelectOption {
  value: string;
  displayText: string;
}

export function Select({ selectObj, value, setValue }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    activeSort: { field: sortedBy },
  } = useWishlist();

  const { name, attributeName, options } = selectObj;

  const selectCont = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectCont.current &&
        !selectCont.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (selectedValue: string) => {
    if (selectedValue === "desc" || selectedValue === "asc") {
      setValue(selectedValue);
      setIsOpen(false);
    } else {
      setValue("desc");
    }
  };

  return (
    <div className="select-cont flex gap-1 items-center bg-blue-100 rounded-md text-neutral-800 pl-2 outline-offset-2">
      <div
        className="whitespace-nowrap"
        style={{
          textDecoration: sortedBy === attributeName ? "underline" : "1",
        }}
      >
        {name}
      </div>
      <div className="relative" ref={selectCont}>
        <div
          onClick={() => setIsOpen((cur) => !cur)}
          className="px-2 py-1 bg-blue-200 text-neutral-800 rounded-md cursor-pointer w-26"
        >
          {options.find((option) => option.value === value)?.displayText}
        </div>
        <div
          className="origin-top transition duration-200 absolute z-10 min-w-fit
          top-0 left-0 translate-y-10 flex flex-col
          "
          style={{ transform: `scaleY(${isOpen ? "1" : "0"})` }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="px-2 py-1 whitespace-nowrap hover:underline bg-blue-100 text-neutral-800 cursor-pointer rounded-md"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.displayText}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
