import React from 'react';
import { cn } from '../../lib/utils';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  className?: string;
  loading?: boolean;
}

const Table = <T extends { id: string | number }>({ 
  columns, 
  data, 
  onRowClick, 
  className,
  loading = false 
}: TableProps<T>) => {
  return (
    <div className={cn("overflow-x-auto no-scrollbar", className)}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 bg-white/[0.01]">
            {columns.map((column) => (
              <th 
                key={column.key} 
                className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {loading ? (
             Array(5).fill(0).map((_, i) => (
              <tr key={i} className="animate-pulse">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 h-16 bg-white/[0.01]"></td>
                ))}
              </tr>
            ))
          ) : data.length > 0 ? (
            data.map((item) => (
              <tr 
                key={item.id} 
                onClick={() => onRowClick && onRowClick(item)}
                className={cn(
                  "hover:bg-white/[0.02] transition-colors group",
                  onRowClick && "cursor-pointer"
                )}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4">
                    {column.render ? column.render(item) : (item as any)[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-20 text-center text-slate-600 font-mono text-xs uppercase font-bold">
                No records found in this list.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
