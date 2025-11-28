import {
  InformationCircleIcon,
  PencilSquareIcon,
  SparklesIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";

interface Props {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  icon?: string;
}

export function Button({
  onClick,
  className,
  children,
  type = "button",
  icon,
}: Props) {
  return (
    <button
      className={twMerge(
        `transition duration-300 cursor-pointer rounded-sm p-1 opacity-80 group hover:opacity-100
        flex items-center justify-center gap-2`,
        className
      )}
      type={type}
      onClick={onClick}
    >
      {icon === "trash" && (
        <TrashIcon className="size-4 group-hover:scale-125 transition duration-300" />
      )}
      {icon === "pencil" && (
        <PencilSquareIcon className="size-4 group-hover:scale-125 transition duration-300" />
      )}
      {icon === "info" && (
        <InformationCircleIcon className="size-4 group-hover:scale-125 transition duration-300" />
      )}
      {icon === "cancel" && (
        <XMarkIcon className="size-4 group-hover:scale-125 transition duration-300" />
      )}
      {icon === "sparkles" && (
        <SparklesIcon className="size-4 group-hover:scale-125 group-hover:text-yellow-200 transition duration-300" />
      )}
      {children}
    </button>
  );
}
