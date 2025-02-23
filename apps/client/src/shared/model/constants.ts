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
  post: 'post',
  random: 'random'
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
  post: 'post',
  random: 'random';
};

export const SERVICE_KEYS = {
  auth: 'auth',
  signup: 'signup',
  signin: 'signin',
  selection: 'selection',
  random: 'random',
  users: 'users',
  signout: 'signout',
  characteristics: 'characteristics',
  'national-cuisines': 'national-cuisines',
  ingredients: 'ingredients',
  types: 'types',
  recipes: 'recipes',
  holidays: 'holidays',
} as {
  signout: 'signout';
  recipes: 'recipes';
  auth: 'auth';
  signup: 'signup';
  signin: 'signin';
  users: 'users';
  selection: 'selection';
  types: 'types';
  holidays: 'holidays';
  'national-cuisines': 'national-cuisines';
  ingredients: 'ingredients';
};

export const PAGE_KEYS = {
  main: '/',
  signup: 'signup',
  signin: 'signin',
  emailConfirm: 'email-confirm',
  recipes: 'recipes',
  admin: 'admin',
  profile: 'profile',
} as {
  main: '/';
  signup: 'signup';
  signin: 'signin';
  emailConfirm: 'email-confirm';
  recipes: 'recipes';
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
