import { default as dayjs } from 'dayjs';
export function orderNoNumber(): string {
  const time = dayjs();
  return dayjs().format('MMDD-hhmm-ss');
}
