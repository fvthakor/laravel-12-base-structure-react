import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community';
import { useState, useEffect, useMemo } from 'react';

ModuleRegistry.registerModules([AllCommunityModule]);

interface AgGridTableProps<T> {
    rowData: T[];
    columnDefs: ColDef[];
    height?: string;
    rowHeight?: number;
    headerHeight?: number;
    noRowsTemplate?: string;
    pagination?: boolean;
    pageSize?: number;
    suppressCellFocus?: boolean;
    suppressMovableColumns?: boolean;
    suppressScrollOnNewData?: boolean;
    animateRows?: boolean;
    onRowClick?: (data: T) => void;
}

export const AgGridTable = <T extends object>({
    rowData,
    columnDefs,
    height = '500px',
    rowHeight = 44,
    headerHeight = 40,
    noRowsTemplate = 'No data found',
    pagination = false,
    pageSize = 10,
    suppressCellFocus = true,
    suppressMovableColumns = true,
    suppressScrollOnNewData = true,
    animateRows = true,
    onRowClick,
}: AgGridTableProps<T>) => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };

        checkDarkMode();

        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    const gridTheme = isDark ? 'ag-theme-quartz-dark' : 'ag-theme-quartz';

    const defaultColDef = useMemo(
        () => ({
            resizable: true,
            wrapHeaderText: true,
            autoHeaderHeight: true,
        }),
        []
    );

    return (
        <div
            className={`${gridTheme} rounded-lg border border-sidebar-border/70 dark:border-sidebar-border overflow-hidden`}
            style={{ height }}
        >
            <AgGridReact<T>
                key={isDark}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowHeight={rowHeight}
                headerHeight={headerHeight}
                suppressMovableColumns={suppressMovableColumns}
                suppressCellFocus={suppressCellFocus}
                pagination={pagination}
                suppressPaginationPanel={!pagination}
                suppressScrollOnNewData={suppressScrollOnNewData}
                animateRows={animateRows}
                overlayNoRowsTemplate={rowData.length === 0 ? noRowsTemplate : undefined}
                onRowClicked={
                    onRowClick
                        ? (event) => {
                              onRowClick(event.data);
                          }
                        : undefined
                }
                paginationPageSize={pageSize}
            />
        </div>
    );
};
