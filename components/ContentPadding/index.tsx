import { cn } from "@/lib/utils";
import { ReactGenericHTMLElementProps } from "@/types";

export function ContentPadding({
  children,
  className,
  innerClassName = "",
  ...props
}: { innerClassName?: string } & ReactGenericHTMLElementProps) {
  return (
    <div
      className={cn("p-4 md:px-8 flex flex-col items-center w-full", className)}
      {...props}
    >
      <div className={cn("max-w-[1600px] w-full", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
