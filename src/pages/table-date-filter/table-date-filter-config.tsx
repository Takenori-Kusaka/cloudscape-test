// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { StatusIndicator, Link } from '@cloudscape-design/components';
import { createTableSortLabelFn } from '../../i18n-strings';
import { DateTimeForm, formatDateTime } from './table-date-filter-forms';
import { stringOperators } from '../../common/property-filter-operators';

const rawColumns = [
  {
    id: 'id',
    sortingField: 'id',
    header: 'Distribution ID',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (item: any) => (
      <div>
        <Link href="#">{item.id}</Link>
      </div>
    ),
    minWidth: 180,
  },
  {
    id: 'state',
    sortingField: 'state',
    header: 'State',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (item: any) => (
      <StatusIndicator type={item.state === 'Deactivated' ? 'error' : 'success'}>{item.state}</StatusIndicator>
    ),
    minWidth: 120,
  },
  {
    id: 'domainName',
    sortingField: 'domainName',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (item: any) => item.domainName,
    header: 'Domain name',
    minWidth: 160,
  },
  {
    id: 'createdAt',
    sortingField: 'createdAt',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (item: any) => item.date.toISOString(),
    header: 'Created at',
    minWidth: 240,
  },
  {
    id: 'deliveryMethod',
    sortingField: 'deliveryMethod',
    header: 'Delivery method',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (item: any) => item.deliveryMethod,
    minWidth: 100,
  },
  {
    id: 'sslCertificate',
    sortingField: 'sslCertificate',
    header: 'SSL certificate',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (item: any) => item.sslCertificate,
    minWidth: 100,
  },
  {
    id: 'priceClass',
    sortingField: 'priceClass',
    header: 'Price class',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (item: any) => item.priceClass,
    minWidth: 100,
  },
  {
    id: 'logging',
    sortingField: 'logging',
    header: 'Logging',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (item: any) => item.logging,
    minWidth: 100,
  },
  {
    id: 'origin',
    sortingField: 'origin',
    header: 'Origin',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (item: any) => item.origin,
    minWidth: 100,
  },
];

export const COLUMN_DEFINITIONS = rawColumns.map(column => ({ ...column, ariaLabel: createTableSortLabelFn(column) }));

export const CONTENT_DISPLAY_OPTIONS = [
  { id: 'id', label: 'Distribution ID', alwaysVisible: true },
  { id: 'state', label: 'State' },
  { id: 'domainName', label: 'Domain name' },
  { id: 'createdAt', label: 'Created at' },
  { id: 'deliveryMethod', label: 'Delivery method' },
  { id: 'sslCertificate', label: 'SSL certificate' },
  { id: 'priceClass', label: 'Price class' },
  { id: 'logging', label: 'Logging' },
  { id: 'origin', label: 'Origin' },
];

export const DEFAULT_PREFERENCES = {
  pageSize: 30,
  contentDisplay: [
    { id: 'id', visible: true },
    { id: 'state', visible: true },
    { id: 'domainName', visible: true },
    { id: 'createdAt', visible: true },
    { id: 'deliveryMethod', visible: true },
    { id: 'sslCertificate', visible: true },
    { id: 'priceClass', visible: false },
    { id: 'logging', visible: false },
    { id: 'origin', visible: false },
  ],
  wraplines: false,
  stripedRows: false,
  contentDensity: 'comfortable',
};

export const FILTERING_PROPERTIES = [
  {
    propertyLabel: 'Domain name',
    key: 'domainName',
    groupValuesLabel: 'Domain name values',
    operators: stringOperators,
  },
  {
    propertyLabel: 'Delivery method',
    key: 'deliveryMethod',
    groupValuesLabel: 'Delivery method values',
    operators: stringOperators,
  },
  {
    propertyLabel: 'Price class',
    key: 'priceClass',
    groupValuesLabel: 'Price class values',
    operators: stringOperators,
  },
  {
    propertyLabel: 'Origin',
    key: 'origin',
    groupValuesLabel: 'Origin values',
    operators: stringOperators,
  },
  { propertyLabel: 'State', key: 'state', groupValuesLabel: 'State values', operators: stringOperators },
  {
    propertyLabel: 'Logging',
    key: 'logging',
    groupValuesLabel: 'Logging values',
    operators: stringOperators,
  },
  {
    propertyLabel: 'SSL certificate',
    key: 'sslCertificate',
    groupValuesLabel: 'SSL certificate values',
    operators: stringOperators,
  },
  {
    key: 'date',
    propertyLabel: 'Created at',
    groupValuesLabel: 'Created at value',
    defaultOperator: '>',
    operators: ['<', '<=', '>', '>='].map(operator => ({
      operator,
      form: DateTimeForm,
      format: formatDateTime,
      match: 'datetime',
    })),
  },
  // Example for date(only) property:
  // {
  //   key: 'createdAt',
  //   propertyLabel: 'Created at',
  //   groupValuesLabel: '',
  //   operators: ['=', '!=', '<', '<=', '>', '>='].map(operator => ({
  //     operator,
  //     form: DateForm,
  //     match: 'date',
  //   })),
  // },
].sort((a, b) => a.propertyLabel.localeCompare(b.propertyLabel));
