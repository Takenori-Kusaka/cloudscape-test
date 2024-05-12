import { useMemo } from 'react';
import { addToColumnDefinitions, mapWithColumnDefinitionIds } from '../../common/columnDefinitionsHelper';
import { useLocalStorage } from './use-local-storage';

// storageKeyはstring型、columnDefinitionsはColumnDefinitionの配列です。
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useColumnWidths(storageKey: string, columnDefinitions: any[]) {
  const [widths, saveWidths] = useLocalStorage(storageKey);

  // eventの型を具体化しました。
  function handleWidthChange(event: CustomEvent) {
    const convertedWidths = Object.values(event.detail.widths);
    saveWidths(mapWithColumnDefinitionIds(columnDefinitions, 'width', convertedWidths));
  }
  
  const memoDefinitions = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return addToColumnDefinitions(columnDefinitions, 'width', widths as any[]);
  }, [widths, columnDefinitions]);

  return [memoDefinitions, handleWidthChange];
}

export default useColumnWidths;
