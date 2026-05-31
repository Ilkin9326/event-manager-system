import { SelectedItItem } from '@app/shared/components/it-support-selector/it-support-selector';

export interface EventDto {
  titleAz:           string;
  titleEn?:          string;
  titleRu?:          string;
  vId:               number;
  startTime:         string;
  endTime?:          string;
  expectedAttendees?: number;
  descAz?:           string;
  descEn?:           string;
  descRu?:           string;
  isOnline?:         boolean;
  hasPoster?:        boolean;
  rectorAttendance?: boolean;
  empId?:            number | null;
  status?:           number;
  it_items?: SelectedItItem[];
}
