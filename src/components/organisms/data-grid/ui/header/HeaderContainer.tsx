import { Table } from "@tanstack/react-table";
import { HeaderRow } from ".";
export interface HeaderContainerProps<TData> {
    table: Table<TData>;
}

function HeaderContainer<TData>({ table }: HeaderContainerProps<TData>) {

    return (
        <div className="header-container w-full relative">
            {table.getHeaderGroups().map((headerGroup, rowIndex) => (
                <HeaderRow key={headerGroup.id} headerGroup={headerGroup} rowIndex={rowIndex} />
            ))}
        </div>
    );
}

export default HeaderContainer;
