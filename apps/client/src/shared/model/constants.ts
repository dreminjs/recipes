export const API_URL = 'http://localhost:3001/api';

export const QUERY_KEYS = {
  signup: 'signup',
  signin: 'signin',
  signout: 'signout',
  recipe: 'recipe',
  characteristic: 'characteristic',
  user: 'user',
  'national-cuisine': 'national-cuisine',
  type: 'type',
  holiday: 'holiday',
  ingredient: 'ingredient',
  post: 'post',
  random: 'random',
  "request-reset-password": 'request-reset-password',
  "reset-password": 'reset-password',
  me: 'me',
  "2fa":"2fa"
} as const;

export const SERVICE_KEYS = {
  auth: 'auth',
  users: 'users',
  characteristics: 'characteristics',
  'national-cuisines': 'national-cuisines',
  ingredients: 'ingredients',
  types: 'types',
  recipes: 'recipes',
  holidays: 'holidays',
  user: 'user',
} as const;

export const PAGE_KEYS = {
  main: '/',
  signup: 'signup',
  signin: 'signin',
  emailConfirm: 'email-confirm',
  recipes: 'recipes',
  admin: 'admin',
  profile: 'profile',
  "request-reset-password":"request-reset-password",
  "password-pending-confirmation": "password-pending-confirmation",
  "signin-with-two-fa": "signin-with-two-fa"
} as const;
export const measuresObj = {
  ML: 'мл',
  L: 'л',
  KG: 'кг',
  G: 'гр',
  N: 'шт',
} as {
  ML: 'мл';
  L: 'л';
  KG: 'кг';
  G: 'гр';
  N: 'шт';
};

export const measuresArray = [
  { label: 'мл', value: 'ML' },
  { label: 'л', value: 'L' },
  { label: 'кг', value: 'KG' },
  { label: 'гр', value: 'G' },
  { label: 'шт', value: 'N' },
];
