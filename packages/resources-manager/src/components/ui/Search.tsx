import { IconSearch } from "@tabler/icons-react";
import * as React from "@theia/core/shared/react";
import { cn } from "../../utils/clsx";

export default function Search({
  className,
  placeHolder,
  HandleChange,
}: {
  className: string;
  placeHolder: string;
  HandleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative dark:text-zinc-50 text-zinc-700 text-xs">
      {" "}
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
        <IconSearch size={16} stroke={1.5} strokeLinejoin="miter" />
      </span>
      <input
        placeholder="Search"
        onChange={HandleChange}
        className={cn(
          className,
          "rounded-full w-full  pl-8 bg-zinc-50 dark:bg-zinc-900  h-8 text-left border  focus:outline-none focus:ring-[.5px] dark:focus:ring-zinc-700 focus:ring-zinc-400 border-zinc-300 dark:border-zinc-800"
        )}
      />
    </div>
  );
}
