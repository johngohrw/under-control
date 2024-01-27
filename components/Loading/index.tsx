import { cn } from "@/lib/utils";
import { ReactGenericHTMLElementProps } from "@/types";

export const Loading = ({
  type = "spinner",
  className = "",
  ...props
}: { type?: "spinner" | "dots" } & ReactGenericHTMLElementProps) => {
  return (
    <>
      <div
        className={cn(
          "flex items-center justify-center w-full h-full",
          className
        )}
        {...props}
      >
        <span className={`__loading-${type}`} />
      </div>
    </>
  );
};
