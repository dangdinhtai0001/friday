import { HeaderGroup } from "@tanstack/react-table";
import { HeaderCell } from ".";

export interface HeaderRowProps<TData> {
    headerGroup: HeaderGroup<TData>;
    rowIndex: number;
}

function HeaderRow<TData>({ headerGroup, rowIndex }: HeaderRowProps<TData>) {
    return (
        <div
            className="header-row flex w-full"
            style={{ top: rowIndex * 30 }}
        >
            {headerGroup.headers.map((header) => (
                <HeaderCell key={header.id} header={header} />
            ))}
        </div>
    );
}

export default HeaderRow;
