import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  nameClass?: string;
  modalName: string;
  maxWidthClassName: string;
}

export function ModalContainer({
  children,
  nameClass,
  modalName,
  maxWidthClassName,
}: Props) {
  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-neutral-900/90 flex overflow-auto z-10 p-4">
      <div
        className={twMerge(
          "bg-stone-100 m-auto rounded-sm overflow-hidden w-full",
          maxWidthClassName
        )}
      >
        <p
          className={twMerge(
            "text-neutral-100 text-lg text-start p-2 px-4 wrap-break-word",
            nameClass
          )}
        >
          {modalName}
        </p>
        <div className={"w-full p-4 flex flex-col gap-4 flex-1"}>
          {children}
        </div>
      </div>
    </div>
  );
}
