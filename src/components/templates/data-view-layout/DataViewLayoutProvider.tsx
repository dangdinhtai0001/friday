import { forwardRef } from "react";
import { DataViewProvider } from "./context/DataViewProvider";
import DataViewLayout from "./DataViewLayout";
import { DataViewCommands, DataViewLayoutProps } from "./types.d";

const DataViewLayoutProvider = (
    { children, ...props }: DataViewLayoutProps,
    ref: React.ForwardedRef<DataViewCommands>
) => {
    return (
        <DataViewProvider>
            <DataViewLayout {...props} ref={ref}>
                {children}
            </DataViewLayout>
        </DataViewProvider>
    )
}

export default forwardRef(DataViewLayoutProvider) as <DataViewLayoutProps>(
    props: DataViewLayoutProps & { ref?: React.ForwardedRef<DataViewCommands> }
) => React.ReactNode;
