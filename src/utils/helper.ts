import { type ColumnFiltersState } from '@tanstack/react-table';

export function encodeStatus(status: number | null) {
  if (status === 1) {
    return 'active';
  } else if (status === 2) {
    return 'inactive';
  } else {
    return 'unknown';
  }
}

export function decodeStatus(status: string) {
  if (status === 'active') {
    return 1;
  } else if (status === 'inactive') {
    return 2;
  } else {
    return 0;
  }
}

export function getColumnFilter(
  columnFilters: ColumnFiltersState,
  columnId: string
) {
  const value = columnFilters.find((filter) => filter.id === columnId)?.value;

  if (typeof value !== 'string') {
    return undefined;
  }

  return value;
}
