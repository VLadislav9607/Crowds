export const SHADOWS = {
  field: {
    shadowColor: '#20222C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 5,
  },
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
};

export type ShadowsKeys = keyof typeof SHADOWS;
export type ShadowsType = typeof SHADOWS;
