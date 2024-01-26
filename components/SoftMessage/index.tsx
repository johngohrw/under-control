import { cn } from "@/lib/utils";
import { ReactGenericHTMLElementProps } from "@/types";

export function SoftMessage({
  className,
  children,
  ...props
}: ReactGenericHTMLElementProps) {
  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center",
        "text-md font-semibold tracking-wide text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
