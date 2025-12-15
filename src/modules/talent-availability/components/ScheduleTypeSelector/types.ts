import { TripAvailability } from '../../types';

export interface IScheduleTypeSelectorProps {
  value: TripAvailability;
  onChange: (value: TripAvailability) => void;
}
