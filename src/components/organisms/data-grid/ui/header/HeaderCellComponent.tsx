export interface HeaderCellComponentProps {
    children: React.ReactNode;
}

function HeaderCellComponent({ children }: HeaderCellComponentProps) {
    return (
        <div className="header-cell-component ">
            {children}
        </div>
    );
}

export default HeaderCellComponent;
