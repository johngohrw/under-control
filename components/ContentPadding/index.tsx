import { cn } from "@/lib/utils";
import { ReactGenericHTMLElementProps } from "@/types";

export function ContentPadding({
  children,
  className,
  ...props
}: ReactGenericHTMLElementProps) {
  return (
    <div className={cn("p-2", className)} {...props}>
      {children}
    </div>
  );
}
