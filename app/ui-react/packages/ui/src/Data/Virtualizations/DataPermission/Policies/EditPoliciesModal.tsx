import { Button, Modal, Tab, Tabs } from '@patternfly/react-core';
import * as React from 'react';
import { ColumnMaskingTab, ColumnPermissionTab, RowFilteringTab } from '..';
import { ButtonLink, Loader } from '../../../../Layout';

export interface IEditPoliciesModalProps {
  i18nCancel: string;
  i18nColumnMasking: string;
  i18nColumnPermissions: string;
  i18nRowBasedFiltering: string;
  i18nSave: string;
  i18nTitle: string;
  i18nAddRowFilter: string;
  i18nCondition: string;
  i18nOperation: string;
  i18nSelectOperation: string;
  i18nUserRole: string;
  i18nValidate: string;
  i18nRemoveRow: string;
  i18nSelectRole: string;
  i18nSelectColumn: string;
  i18nPermission: string;
  i18nAddPermission: string;
  i18nColumn: string;
  i18nAddACondition: string;
  i18nAddColumnMasking: string;
  i18nDeleteCondition: string;
  i18nMaskings: string;
  i18nMaskingLabel: string;
  i18nDelete: string;
  i18nOrder: string;
  isOpen: boolean;
  isUpdating: boolean;
  onClose: () => void;
  onSetPolicies: () => void;
}

export const EditPoliciesModal: React.FunctionComponent<IEditPoliciesModalProps> = props => {
  const [activeTabKey, setActiveTabKey] = React.useState<React.ReactText>();

  const [rowFilteringCount, setRowFilteringCount] = React.useState<number>(0);
  const [columnMaskCount, setColumnMaskCount] = React.useState<number>(0);
  const [columnPermissionCount, setColumnPermissionCount] = React.useState<
    number
  >(0);

  const handleTabClick = (event: any, tabIndex: React.ReactText) => {
    setActiveTabKey(tabIndex);
  };

  const updateRowFilteringCount = React.useCallback(
    (val: number) => {
      setRowFilteringCount(val);
    },
    [setRowFilteringCount]
  );

  const updateColumnMaskCount = React.useCallback(
    (val: number) => {
      setColumnMaskCount(val);
    },
    [setColumnMaskCount]
  );

  const updateColumnPermissionCount = React.useCallback(
    (val: number) => {
      setColumnPermissionCount(val);
    },
    [setColumnPermissionCount]
  );

  return (
    <Modal
      width={'50%'}
      title={props.i18nTitle}
      isOpen={props.isOpen}
      onClose={props.onClose}
      actions={[
        <ButtonLink
          key="confirm"
          as={'primary'}
          onClick={props.onSetPolicies}
          isDisabled={props.isUpdating}
        >
          {props.isUpdating ? <Loader size={'xs'} inline={true} /> : null}
          {props.i18nSave}
        </ButtonLink>,
        <Button key="cancel" variant="link" onClick={props.onClose}>
          {props.i18nCancel}
        </Button>,
      ]}
      isFooterLeftAligned={true}
    >
      <div>
        <Tabs activeKey={activeTabKey} onSelect={handleTabClick}>
          <Tab
            eventKey={0}
            title={`${props.i18nColumnPermissions} (${columnPermissionCount})`}
          >
            <ColumnPermissionTab
              i18nSelectColumn={props.i18nSelectColumn}
              i18nUserRole={props.i18nUserRole}
              i18nRemoveRow={props.i18nRemoveRow}
              i18nSelectRole={props.i18nSelectRole}
              i18nPermission={props.i18nPermission}
              i18nAddPermission={props.i18nAddPermission}
              i18nColumn={props.i18nColumn}
              updateColumnPermissionCount={updateColumnPermissionCount}
            />
          </Tab>
          <Tab
            eventKey={1}
            title={`${props.i18nRowBasedFiltering} (${rowFilteringCount})`}
          >
            <RowFilteringTab
              i18nAddRowFilter={props.i18nAddRowFilter}
              i18nCondition={props.i18nCondition}
              i18nOperation={props.i18nOperation}
              i18nSelectOperation={props.i18nSelectOperation}
              i18nUserRole={props.i18nUserRole}
              i18nValidate={props.i18nValidate}
              i18nRemoveRow={props.i18nRemoveRow}
              i18nSelectRole={props.i18nSelectRole}
              updateRowFilteringCount={updateRowFilteringCount}
            />
          </Tab>
          <Tab
            eventKey={2}
            title={`${props.i18nColumnMasking} (${columnMaskCount})`}
          >
            <ColumnMaskingTab
              updateColumnMaskCount={updateColumnMaskCount}
              i18nAddACondition={props.i18nAddACondition}
              i18nAddColumnMasking={props.i18nAddColumnMasking}
              i18nDeleteCondition={props.i18nDeleteCondition}
              i18nMaskings={props.i18nMaskings}
              i18nMaskingLabel={props.i18nMaskingLabel}
              i18nOrder={props.i18nOrder}
              i18nColumn={props.i18nColumn}
              i18nSelectColumn={props.i18nSelectColumn}
              i18nUserRole={props.i18nUserRole}
              i18nRemoveRow={props.i18nRemoveRow}
              i18nSelectRole={props.i18nSelectRole}
              i18nCondition={props.i18nCondition}
              i18nValidate={props.i18nValidate}
              i18nDelete={props.i18nDelete}
            />
          </Tab>
        </Tabs>
      </div>
    </Modal>
  );
};
