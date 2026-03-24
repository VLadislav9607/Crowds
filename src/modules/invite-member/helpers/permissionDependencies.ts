/**
 * Capability UUIDs from the `capabilities` table.
 */
const CAP = {
  // Talent
  RECRUIT_APPLICANTS: '9aa9689d-f5e3-4d76-bb2e-8a4a05b6d28c',
  APPROVE_APPLICANTS: 'dc91e38f-66d3-46ea-b01d-01cf493aa786',
  GIVE_FEEDBACK: '1c1f2b8c-70bb-438b-97bb-8443127d3688',
  RATE_APPLICANTS: '2b50927a-d852-4963-88e3-218566b335ea',

  // Events
  CREATE_EDIT_EVENTS: 'a99955f0-5e07-435c-9eed-c81182e6f8fe',
  CREATE_EVENT_DRAFT: '51145869-170c-433d-9ad1-2845c0d9d368',
  VIEW_EVENTS: 'ad244ca3-df6c-4b64-a79a-09b166c24a3b',
  MESSAGE_APPLICANTS: 'aebd59ab-bd4e-469b-95d7-160464c35919',
  GROUP_MESSAGE: 'df38f5b1-4b83-4b03-9ec3-66fff48ce270',
  ONE_ON_ONE_MESSAGE: '49d28f04-045a-47a7-ab17-6a8d0684eb4f',

  // Check-ins
  MANAGE_CHECK_INS: 'db1fbf4b-5617-4ed0-bff2-c31d8786b704',

  // Financial
  VIEW_EARNINGS: 'a3afe12a-43af-4937-942e-e86234b91fea',
  AUTHORIZE_TALENT_PAYMENTS: 'afbef4d1-d90c-47f9-832c-51f4efcad689',
  AUTHORIZE_TALENT_ONE_ON_ONE_PAYMENTS: 'fec2e096-9f39-4452-bc55-6ccb2d617e09',
} as const;

/**
 * Map: permission → permissions it requires (must be enabled first).
 */
const REQUIRES: Record<string, string[]> = {
  // Events → require VIEW_EVENTS
  [CAP.CREATE_EDIT_EVENTS]: [CAP.VIEW_EVENTS],
  [CAP.CREATE_EVENT_DRAFT]: [CAP.VIEW_EVENTS],
  [CAP.MESSAGE_APPLICANTS]: [CAP.VIEW_EVENTS],
  [CAP.GROUP_MESSAGE]: [CAP.VIEW_EVENTS],
  [CAP.ONE_ON_ONE_MESSAGE]: [CAP.VIEW_EVENTS],

  // Check-ins → require VIEW_EVENTS
  [CAP.MANAGE_CHECK_INS]: [CAP.VIEW_EVENTS],

  // Talent → require RECRUIT_APPLICANTS
  [CAP.APPROVE_APPLICANTS]: [CAP.RECRUIT_APPLICANTS],
  [CAP.GIVE_FEEDBACK]: [CAP.RECRUIT_APPLICANTS],
  [CAP.RATE_APPLICANTS]: [CAP.RECRUIT_APPLICANTS],

  // Financial → require VIEW_EARNINGS
  [CAP.AUTHORIZE_TALENT_PAYMENTS]: [CAP.VIEW_EARNINGS],
  [CAP.AUTHORIZE_TALENT_ONE_ON_ONE_PAYMENTS]: [CAP.VIEW_EARNINGS],
};

/**
 * Reverse map: base permission → permissions that depend on it.
 */
const DEPENDENTS: Record<string, string[]> = {
  [CAP.VIEW_EVENTS]: [
    CAP.CREATE_EDIT_EVENTS,
    CAP.CREATE_EVENT_DRAFT,
    CAP.MESSAGE_APPLICANTS,
    CAP.GROUP_MESSAGE,
    CAP.ONE_ON_ONE_MESSAGE,
    CAP.MANAGE_CHECK_INS,
  ],
  [CAP.RECRUIT_APPLICANTS]: [
    CAP.APPROVE_APPLICANTS,
    CAP.GIVE_FEEDBACK,
    CAP.RATE_APPLICANTS,
  ],
  [CAP.VIEW_EARNINGS]: [
    CAP.AUTHORIZE_TALENT_PAYMENTS,
    CAP.AUTHORIZE_TALENT_ONE_ON_ONE_PAYMENTS,
  ],
};

/**
 * Applies auto-cascade logic:
 * - When a permission is ADDED → auto-add its required dependencies
 * - When a permission is REMOVED → auto-remove all permissions that depend on it
 */
export function applyPermissionCascade(
  oldValues: string[],
  newValues: string[],
): string[] {
  const added = newValues.filter(v => !oldValues.includes(v));
  const removed = oldValues.filter(v => !newValues.includes(v));

  let result = [...newValues];

  // For each added permission, ensure its dependencies are also present
  for (const perm of added) {
    const requires = REQUIRES[perm];
    if (requires) {
      for (const dep of requires) {
        if (!result.includes(dep)) {
          result.push(dep);
        }
      }
    }
  }

  // For each removed permission, remove all its dependents
  for (const perm of removed) {
    const dependents = DEPENDENTS[perm];
    if (dependents) {
      result = result.filter(v => !dependents.includes(v));
    }
  }

  return result;
}
