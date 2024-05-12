import React, { useEffect, useState } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import PropertyFilter from '@cloudscape-design/components/property-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Table from '@cloudscape-design/components/table';

import { FullPageHeader } from '../commons';
import { TableNoMatchState, TableEmptyState } from '../commons/common-components';
import {
  distributionTableAriaLabels,
  getHeaderCounterText,
  getTextFilterCounterText,
  propertyFilterI18nStrings,
  renderAriaLive,
} from '../../i18n-strings';
import DataProvider from '../commons/data-provider';
import { Preferences } from '../commons/table-config';

import '../../styles/base.scss';

interface PropertyFilterTableProps {
  loadHelpPanelContent: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columnDefinitions: any[];  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contentDisplayOptions: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveWidths: (event: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  preferences: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPreferences: (newPreferences: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filteringProperties: any[];
}

export function PropertyFilterTable({
  loadHelpPanelContent,
  columnDefinitions,
  contentDisplayOptions,
  saveWidths,
  preferences,
  setPreferences,
  filteringProperties,
}: PropertyFilterTableProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [distributions, setDistributions] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { items, actions, filteredItemsCount, collectionProps, paginationProps, propertyFilterProps } = useCollection<any>(
    distributions,
    {
      propertyFiltering: {
        filteringProperties,
        empty: <TableEmptyState resourceName="Distribution" />,
        noMatch: (
          <TableNoMatchState
            onClearFilter={() => {
              actions.setPropertyFiltering({ tokens: [], operation: 'and' });
            }}
          />
        ),
      },
      pagination: { pageSize: preferences.pageSize },
      sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
      selection: {},
    }
  );

  useEffect(() => {
    setLoading(true);
    new DataProvider().getData('distributions').then(distributions => {
      setDistributions(distributions);
      setLoading(false);
    });
  }, []);

  return (
    <Table
      {...collectionProps}
      enableKeyboardNavigation={true}
      items={items}
      columnDefinitions={columnDefinitions}
      columnDisplay={preferences.contentDisplay}
      ariaLabels={distributionTableAriaLabels}
      renderAriaLive={renderAriaLive}
      selectionType="multi"
      variant="full-page"
      stickyHeader={true}
      resizableColumns={true}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      contentDensity={preferences.contentDensity}
      stickyColumns={preferences.stickyColumns}
      onColumnWidthsChange={saveWidths}
      header={
        <FullPageHeader
          selectedItemsCount={collectionProps.selectedItems?.length ?? 0}
          counter={!loading ? getHeaderCounterText(distributions, collectionProps.selectedItems) : undefined}
          onInfoLinkClick={loadHelpPanelContent}
        />
      }
      loading={loading}
      loadingText="Loading distributions"
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          i18nStrings={propertyFilterI18nStrings}
          countText={getTextFilterCounterText(filteredItemsCount || 0)}
          expandToViewport={true}
        />
      }
      pagination={<Pagination {...paginationProps} />}
      preferences={
        <Preferences
          preferences={preferences}
          setPreferences={setPreferences}
          contentDisplayOptions={contentDisplayOptions}
          disabled={false}
        />
      }
    />
  );
}
