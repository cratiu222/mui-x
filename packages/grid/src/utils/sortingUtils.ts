import { CellValue, ComparatorFn, SortDirection } from '../models';

export const nextSortDirection = (current?: SortDirection) => {
  if (!current) {
    return 'asc';
  }
  return current === 'asc' ? 'desc' : null;
};

export const isDesc = (direction: SortDirection) => direction === 'desc';

export const nillComparer = (v1: CellValue, v2: CellValue): number | null => {
  if (v1 == null && v2 != null) return -1;
  if (v2 == null && v1 != null) return 1;
  if (v1 == null && v2 == null) return 0;

  return null;
};

export const stringNumberComparer: ComparatorFn = (v1: CellValue, v2: CellValue) => {
  const nillResult = nillComparer(v1, v2);
  if (nillResult != null) {
    return nillResult;
  }

  if (typeof v1 === 'string') {
    return v1.localeCompare(v2!.toString());
  } else {
    return (v1 as any) - (v2 as any);
  }
};

export const numberComparer: ComparatorFn = (v1: CellValue, v2: CellValue) => {
  const nillResult = nillComparer(v1, v2);
  if (nillResult != null) {
    return nillResult;
  }
  return Number(v1) - Number(v2);
};

export const dateComparer = (v1?: Date, v2?: Date): number => {
  const nillResult = nillComparer(v1, v2);
  if (nillResult != null) {
    return nillResult;
  }

  if (v1! > v2!) return 1;
  if (v1! < v2!) return -1;
  return 0;
};
