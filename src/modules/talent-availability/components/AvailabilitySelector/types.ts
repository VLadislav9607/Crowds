import { AvailabilityType } from '../../types';

export interface IAvailabilitySelectorProps {
  value: AvailabilityType;
  onChange: (value: AvailabilityType) => void;
}
