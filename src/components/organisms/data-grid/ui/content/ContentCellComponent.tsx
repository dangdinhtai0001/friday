import { CellContext } from "@tanstack/react-table";
import { ReactNode } from "react";

export interface ContentCellComponentProps<TData, TValue>
  extends CellContext<TData, TValue> {
  children?: React.ReactNode;
}

function ContentCellComponent<TData, TValue>({
  getValue,
}: ContentCellComponentProps<TData, TValue>) {
  return (
    <div className="content-component typography-regular-12 text-black-100 flex px-4 py-2">
      <div className="content-display-text">
        {getValue() as unknown as ReactNode}
      </div>
    </div>
  );
}

export default ContentCellComponent;
