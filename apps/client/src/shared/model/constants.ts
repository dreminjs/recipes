import { IOption } from './interfaces/ingredient.interface';
import { IChooseItemTabContent } from './interfaces/types';

export const API_URL = 'http://localhost:3001/api';

export const MINIO_URL =
  'http://localhost:9001/api/v1/buckets/index/objects/download?preview=true&prefix';

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
  'request-reset-password': 'request-reset-password',
  'reset-password': 'reset-password',
  me: 'me',
  '2fa': '2fa',
  resend: 'resend',
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
  mail: 'mail',
} as const;

export const PAGE_KEYS = {
  main: '/',
  signup: 'signup',
  signin: 'signin',
  emailConfirm: 'email-confirm',
  recipes: 'recipes',
  admin: 'admin',
  profile: 'profile',
  'request-reset-password': 'request-reset-password',
  'password-pending-confirmation': 'password-pending-confirmation',
  'signin-with-two-fa': 'signin-with-two-fa',
} as const;

export const measuresObj = {
  ML: 'мл',
  L: 'л',
  KG: 'кг',
  G: 'гр',
  N: 'шт',
} as const;

export const ACTIONS_KEYS = {
  edit: 'edit',
  create: 'create',
  delete: 'delete',
};

export const CHOOSE_CHARACTERISTICS_TAB_LIST = [
  { label: 'типы', endpoint: SERVICE_KEYS.types },
  { label: 'праздники', endpoint: SERVICE_KEYS.holidays },
  { label: 'нацинональные кухни', endpoint: SERVICE_KEYS['national-cuisines'] },
] as IChooseItemTabContent[];

export const ACTION_TABS = ['Выбрать', 'Выбранное'];

export const measuresOptions = [
  { label: 'мл', value: 'ML' },
  { label: 'л', value: 'L' },
  { label: 'кг', value: 'KG' },
  { label: 'гр', value: 'G' },
  { label: 'шт', value: 'N' },
] as IOption[];
