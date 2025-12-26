export const REGEX = {
  username: /^[a-zA-Z0-9_]+$/,
  usernameStartWithLetterOrUnderscore: /^[a-zA-Z_]/,
  cleanFileName: /[^a-zA-Z0-9.-]/g,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
};
