import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button, ButtonProps } from "../ui/button";

export function TwoStagedButton({
  children,
  className,
  confirmText,
  initialVariant = "secondary",
  secondaryVariant = "destructive",
  resetTimeout = 5000,
  onActionConfirm = () => {},
  ...props
}: {
  confirmText: string;
  resetTimeout?: 5000;
  onActionConfirm: any;
  initialVariant?: ButtonProps["variant"];
  secondaryVariant?: ButtonProps["variant"];
} & ButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleClick = () => {
    if (!isConfirming) {
      setIsConfirming(true);
    } else {
      onActionConfirm();
      setIsConfirming(false);
    }
  };

  useEffect(() => {
    if (isConfirming) {
      const timer = setTimeout(() => {
        setIsConfirming(false);
      }, resetTimeout);
      return () => clearTimeout(timer);
    }
  }, [isConfirming, resetTimeout]);

  return (
    <Button
      variant={isConfirming ? secondaryVariant : initialVariant}
      onClick={handleClick}
      className={cn("relative", className)}
      {...props}
    >
      <span
        className="duration-200"
        style={{
          opacity: isConfirming ? 0 : 1,
        }}
      >
        {children}
      </span>
      <div
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] duration-200"
        style={{
          opacity: isConfirming ? 1 : 0,
        }}
      >
        {confirmText}
      </div>
    </Button>
  );
}
