import React, { useEffect, useState } from 'react';
import Calendar from '@cloudscape-design/components/calendar';
import DateInput from '@cloudscape-design/components/date-input';
import FormField from '@cloudscape-design/components/form-field';
import TimeInput from '@cloudscape-design/components/time-input';

type DateTimeFormProps = {
  filter: string;
  operator: string;
  value: string | null;
  onChange: (dateString: string | null) => void;
};

type DateTimeState = {
  dateValue: string;
  timeValue: string;
};

export function DateTimeForm({ filter, operator, value, onChange }: DateTimeFormProps) {
  const defaultTime = operator === '<' || operator === '>=' ? undefined : '23:59:59';
  const [{ dateValue, timeValue }, setState] = useState<DateTimeState>(parseValue(value ?? '', defaultTime));

  const onChangeDate = (dateValue: string) => {
    setState(state => ({ ...state, dateValue }));
  };

  const onChangeTime = (timeValue: string) => {
    setState(state => ({ ...state, timeValue }));
  };

  useEffect(() => {
      filter && setState(parseDateTimeFilter(filter.trim()));
    },
    [filter]
  );

  useEffect(() => {
      const dateAndTimeValue = dateValue + 'T' + (timeValue || '00:00:00');

      if (!dateValue.trim()) {
        onChange(null);
      } else if (isValidIsoDate(dateAndTimeValue)) {
        onChange(dateAndTimeValue);
      }
    },
    [dateValue, timeValue]
  );

  return (
    <div className="date-time-form">
      <FormField description="Date" constraintText="Use YYYY/MM/DD format.">
        <DateInput placeholder="YYYY/MM/DD" value={dateValue} onChange={event => onChangeDate(event.detail.value)} />
      </FormField>

      <FormField description="Time" constraintText="Use 24-hour format.">
        <TimeInput
          format="hh:mm:ss"
          placeholder="hh:mm:ss"
          value={timeValue}
          onChange={event => onChangeTime(event.detail.value)}
        />
      </FormField>

      <Calendar
        value={dateValue}
        locale="en-EN"
        previousMonthAriaLabel="Previous month"
        nextMonthAriaLabel="Next month"
        todayAriaLabel="Today"
        onChange={event => onChangeDate(event.detail.value)}
      />
    </div>
  );
}

export function formatDateTime(isoDate: string): string {
  return isoDate ? isoDate + formatTimezoneOffset(isoDate) : '';
}

function parseDateTimeFilter(filter: string): DateTimeState {
  const regexDate = /^(\d\d\d\d(-|\/\d\d)?(-|\/\d\d)?)(T\d\d(:\d\d)?(:\d\d)?)?/;
  const dateTime = filter.match(regexDate)?.[0] || '';

  let [dateValue, timeValue = ''] = dateTime.split('T');
  const [year, month = '01', day = '01'] = dateValue.split(/-|\//);
  const [hours = '00', minutes = '00', seconds = '00'] = timeValue.split(':');
  dateValue = year.length === 4 ? `${year}-${month}-${day}` : '';
  timeValue = timeValue ? `${hours}:${minutes}:${seconds}` : '';

  const value = !timeValue ? dateValue : dateValue + 'T' + timeValue;
  return isValidIsoDate(value) ? { dateValue, timeValue } : { dateValue: '', timeValue: '' };
}

function isValidIsoDate(isoDate: string): boolean {
  return !isNaN(new Date(isoDate).getTime());
}

function parseValue(value: string, defaultTime: string = ''): DateTimeState {
  const [datePart = '', timePart = ''] = (value ?? '').split('T');
  return { dateValue: datePart, timeValue: timePart || defaultTime };
}

function formatTimezoneOffset(isoDate: string, offsetInMinutes?: number): string {
  offsetInMinutes = offsetInMinutes ?? 0 - new Date(isoDate).getTimezoneOffset();

  const sign = offsetInMinutes < 0 ? '-' : '+';
  const hoursOffset = Math.floor(Math.abs(offsetInMinutes) / 60)
    .toFixed(0)
    .padStart(2, '0');
  const minuteOffset = Math.abs(offsetInMinutes % 60)
    .toFixed(0)
    .padStart(2, '0');
  return `${sign}${hoursOffset}:${minuteOffset}`;
}
