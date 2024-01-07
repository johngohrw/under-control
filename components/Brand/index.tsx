import { LogoUCTRL } from "@/assets";
import { cn } from "@/lib/utils";
import { ReactGenericHTMLElementProps } from "@/types";
import { useTheme } from "next-themes";
import Image from "next/image";

export const Brand = ({
  className,
  ...props
}: ReactGenericHTMLElementProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={cn("relative aspect-[200/36] w-[120px]", className)}
      {...props}
    >
      <Image
        src={LogoUCTRL}
        alt="Under Control Logo"
        fill
        className={cn(theme === "light" ? "invert" : "")}
      />
    </div>
  );
};
