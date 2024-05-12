import * as React from "react";
import { ReactNode, ReactElement } from "react";
import { HelpPanel } from "@cloudscape-design/components";
import { HelpPanelProps } from "@cloudscape-design/components/help-panel";
import Icon from "@cloudscape-design/components/icon";

interface HelpDrawerProps {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

const HelpDrawer: React.FC<HelpDrawerProps> = ({ header, footer, children }): ReactElement => {
  return (
    <HelpPanel header={header} footer={footer}>
      {children}
    </HelpPanel>
  );
};

export default HelpDrawer;
