import { ImperativeModalRef } from '@hooks';

export interface CreateEventQRCodeModalRefProps {
  eventId: string;
  editingQRCodeId?: string;
}

export interface CreateEventQRCodeModalRef
  extends ImperativeModalRef<CreateEventQRCodeModalRefProps> {}

import { z } from 'zod';

export const eventQRCodeEditorSchema = z
  .object({
    name: z
      .string({ message: 'QR Code Name is required' })
      .trim()
      .min(1, 'QR Code Name is required'),

    checkIn: z.date({
      message: 'Check-in is required',
    }),

    checkOut: z.date({
      message: 'Check-out is required',
    }),
  })
  .superRefine(({ checkIn, checkOut }, ctx) => {
    const now = new Date();

    // 1️⃣ check-in має бути в майбутньому
    if (checkIn <= now) {
      ctx.addIssue({
        code: 'custom',
        path: ['checkIn'],
        message: 'Check-in must be a future date',
      });
    }

    // 2️⃣ check-out має бути в майбутньому
    if (checkOut <= now) {
      ctx.addIssue({
        code: 'custom',
        path: ['checkOut'],
        message: 'Check-out must be a future date',
      });
    }

    // 3️⃣ порядок дат
    if (checkOut <= checkIn) {
      ctx.addIssue({
        code: 'custom',
        path: ['checkOut'],
        message: 'Check-out must be after Check-in',
      });
    }
  });

export type EventQRCodeEditorFormValues = z.infer<
  typeof eventQRCodeEditorSchema
>;
