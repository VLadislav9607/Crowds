import { ImperativeModalRef } from '@hooks';

export interface EventQRCodeEditorModalRefProps {
  eventId: string;
  editingQRCodeId?: string;
  eventStartAt: string;
  timeZone?: string;
}

export interface EventQRCodeEditorModalRef
  extends ImperativeModalRef<EventQRCodeEditorModalRefProps> {}

import { z } from 'zod';

export const eventQRCodeEditorSchema = z.object({
  name: z
    .string({ message: 'QR Code Name is required' })
    .trim()
    .min(1, 'QR Code Name is required'),

  checkIn: z.date({
    message: 'Check-in is required',
  }),
});

export type EventQRCodeEditorFormValues = z.infer<
  typeof eventQRCodeEditorSchema
>;
