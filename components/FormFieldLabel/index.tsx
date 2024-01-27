import { cn } from "@/lib/utils";
import { ReactGenericHTMLElementProps } from "@/types";

export function FormFieldLabel({
  children,
  className,
  ...props
}: ReactGenericHTMLElementProps) {
  return (
    <div
      className={cn(
        "uppercase font-bold text-muted-foreground text-xs",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
