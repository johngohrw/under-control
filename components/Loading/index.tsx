import { ReactGenericHTMLElementProps } from "@/types";

export const Loading = ({
  className = "",
  ...props
}: ReactGenericHTMLElementProps) => {
  return (
    <>
      <div
        className={`border flex items-center justify-center w-full h-full ${className}`}
        {...props}
      >
        <span className="__loading-spinner" />
      </div>
      <style jsx>{``}</style>
    </>
  );
};
