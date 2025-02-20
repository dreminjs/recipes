export const API_URL = 'http://localhost:3001/api';

export const QUERY_KEYS = {
  auth: 'auth',
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
} as {
  auth: 'auth';
  signup: 'signup';
  signin: 'signin';
  signout: 'signout';
  recipe: 'recipe';
  characteristic: 'characteristic';
  user: 'user';
  'national-cuisine': 'national-cuisine';
  type: 'type';
  holiday: 'holiday';
  ingredient: 'ingredient';
};

export const SERVICE_KEYS = {
  auth: 'auth',
  signup: '/',
  signin: 'signin',
  user: 'user',
  selection: 'selection',
  random: 'random',
  post: 'post',
  signout: 'signout',
  characteristic: 'characteristic',
  'national-cuisine': 'national-cuisine',
  ingredient: 'ingredient',
} as {
  characteristic: 'characteristic';
  signout: 'signout';
  recipe: 'recipe';
  auth: 'auth';
  signup: '/';
  signin: 'signin';
  user: 'user';
  selection: 'selection';
  random: 'random';
  post: 'post';
  type: 'type';
  holiday: 'holiday';
  'national-cuisine': 'national-cuisine';
  ingredient: 'ingredient';
};

export const PAGE_KEYS = {
  main: '/',
  signup: 'signup',
  signin: 'signin',
  emailConfirm: 'email-confirm',
  recipe: 'recipe',
  admin: 'admin',
  profile: 'profile',
} as {
  main: '/';
  signup: 'signup';
  signin: 'signin';
  emailConfirm: 'email-confirm';
  recipe: 'recipe';
  admin: 'admin';
  profile: 'profile';
};

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
