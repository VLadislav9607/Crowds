export const BUCKETS_CONFIG = {
  talents_avatars: {
    isPrivate: false,
    maxSize: 1024 * 1024 * 3, // 3MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/jpg'],
    expiresIn: 0,
  },
  talents_full_body_photos: {
    isPrivate: true,
    maxSize: 1024 * 1024 * 3, // 3MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/jpg'],
    expiresIn: 24 * 60 * 60, // 1 day
  },
};

export type BucketsTypes = keyof typeof BUCKETS_CONFIG;
