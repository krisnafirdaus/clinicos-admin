import { useTable, useSortBy, usePagination, Column, TableInstance, UseSortByColumnProps, UsePaginationInstanceProps, TableState } from 'react-table';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

export type TableColumn<T extends object> = Column<T> & {
  Header: string;
  accessor: keyof T | ((row: T) => any) | 'actions';
};

interface TableProps<T extends object> {
  columns: TableColumn<T>[];
  data: T[];
}

interface ExtendedTableState<T extends object> extends TableState<T> {
  pageIndex: number;
  pageSize: number;
}

type TableInstanceWithHooks<T extends object> = TableInstance<T> &
  UseSortByColumnProps<T> &
  UsePaginationInstanceProps<T> & {
    setPageSize: (pageSize: number) => void;
  };

export const Table = <T extends object>({ columns, data }: TableProps<T>) => {
  const instance = useTable<T>(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 } as Partial<ExtendedTableState<T>>,
    },
    useSortBy,
    usePagination
  ) as TableInstanceWithHooks<T>;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
  } = instance;

  const { pageIndex, pageSize } = state as ExtendedTableState<T>;

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps((column as any).getSortByToggleProps())}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center">
                    {column.render('Header')}
                    <span className="ml-2">
                      {(column as any).isSorted ? (
                        (column as any).isSortedDesc ? (
                          <ChevronDownIcon className="h-4 w-4" />
                        ) : (
                          <ChevronUpIcon className="h-4 w-4" />
                        )
                      ) : (
                        <div className="h-4 w-4" />
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="py-3 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{pageIndex * pageSize + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min((pageIndex + 1) * pageSize, data.length)}
              </span>{' '}
              of <span className="font-medium">{data.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">First</span>
                <ChevronUpIcon className="h-5 w-5 rotate-90" aria-hidden="true" />
                <ChevronUpIcon className="h-5 w-5 rotate-90" aria-hidden="true" />
              </button>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronUpIcon className="h-5 w-5 rotate-90" aria-hidden="true" />
              </button>
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronDownIcon className="h-5 w-5 rotate-90" aria-hidden="true" />
              </button>
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Last</span>
                <ChevronDownIcon className="h-5 w-5 rotate-90" aria-hidden="true" />
                <ChevronDownIcon className="h-5 w-5 rotate-90" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mt-4">
        <span className="mr-2">Go to page:</span>
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          className="w-16 text-center rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
          className="ml-2 rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
