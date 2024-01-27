import { ReactGenericHTMLElementProps } from "@/types";
import { Loading } from "../Loading";
import { Button } from "../ui/button";

export function BadgeSelectInput<TData>({
  items,
  isLoading,
  isEmpty,
  renderLabel = (item) => (item ? null : <></>),
  keyName,
  onSelect,
  currentValue,
  selectedProps,
  showSelected,
}: {
  items: TData[];
  isLoading: boolean;
  isEmpty: boolean;
  renderLabel: (item: TData | null) => React.ReactNode;
  keyName: keyof TData;
  currentValue: string;
  onSelect: (item: TData) => any;
  selectedProps?: ReactGenericHTMLElementProps;
  showSelected?: boolean;
}) {
  if (isLoading) return <Loading type="dots" />;

  if (isEmpty) return <div>Empty</div>;

  const selectedIndex = items.findIndex(
    (item) => item[keyName] === currentValue
  );
  const selectedItem = selectedIndex < 0 ? null : items[selectedIndex];

  return (
    <>
      {showSelected && (
        <div {...selectedProps}>{renderLabel(selectedItem)}</div>
      )}
      <div className="flex flex-row gap-1 flex-wrap">
        {items.map((item) => {
          const isActive = currentValue === item[keyName];
          return (
            <Button
              role="button"
              type="button"
              size="xs"
              variant={isActive ? "default" : "secondary"}
              key={`${item[keyName]}`}
              onClick={() => onSelect(item)}
            >
              {renderLabel(item)}
            </Button>
          );
        })}
      </div>
    </>
  );
}
