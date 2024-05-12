interface ColumnDefinition {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface Column {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const addToColumnDefinitions = (
  columnDefinitions: ColumnDefinition[],
  propertyName: string,
  columns?: Column[]
): ColumnDefinition[] =>
  columnDefinitions.map(colDef => {
    const column = (columns || []).find(col => col.id === colDef.id);
    return {
      ...colDef,
      [propertyName]: (column && column[propertyName]) || colDef[propertyName],
    };
  });

export const mapWithColumnDefinitionIds = (
  columnDefinitions: ColumnDefinition[],
  propertyName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): { id: string; [key: string]: any }[] =>
  columnDefinitions.map(({ id }, i) => ({
    id,
    [propertyName]: items[i],
  }));
