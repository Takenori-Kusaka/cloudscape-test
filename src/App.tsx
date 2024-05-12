import { useState } from 'react';

import { useColumnWidths } from './pages/commons/use-column-widths';
import { Breadcrumbs, ToolsContent } from './pages/table/common-components';
import { CustomAppLayout, Navigation, Notifications } from './pages/commons/common-components';
import {
  CONTENT_DISPLAY_OPTIONS,
  COLUMN_DEFINITIONS,
  FILTERING_PROPERTIES,
  DEFAULT_PREFERENCES,
} from './pages/table-date-filter/table-date-filter-config';
import { PropertyFilterTable } from './pages/table-property-filter/property-filter-table';

import './styles/table-date-filter.scss';
import { useLocalStorage } from './pages/commons/use-local-storage';


export default function () {
  const [columnDefinitions, saveWidths] = useColumnWidths('React-TableDateFilter-Widths', COLUMN_DEFINITIONS);
  const [preferences, setPreferences] = useLocalStorage('React-TableDateFilter-Preferences', DEFAULT_PREFERENCES);
  const [toolsOpen, setToolsOpen] = useState(false);

	return (
      <CustomAppLayout
        navigation={<Navigation activeHref="#/distributions" />}
        notifications={<Notifications successNotification={true} />}
        breadcrumbs={<Breadcrumbs />}
        content={
          <PropertyFilterTable
            loadHelpPanelContent={() => {
              setToolsOpen(true);
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            columnDefinitions={columnDefinitions as any[]}
            contentDisplayOptions={CONTENT_DISPLAY_OPTIONS}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            saveWidths={saveWidths as any}
            preferences={preferences}
            setPreferences={setPreferences}
            filteringProperties={FILTERING_PROPERTIES}
          />
        }
        contentType="table"
        tools={<ToolsContent />}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        stickyNotifications={true}
      />
	);
}
