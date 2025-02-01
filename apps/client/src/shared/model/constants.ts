

export const API_URL = 'http://localhost:3001/api';

export const QUERY_KEYS = {
    auth: 'auth',
    signup: 'signup',
    signin: 'signin',
    signout: 'signout',
    recipe: 'recipe',
    characteristic: "characteristic",
    user: "user",
    nationalCuisine: "national-cuisine",
    type: "type",
    holiday: "holiday",
    ingredient: "ingredient",

}

export const SERVICE_KEYS = {
    auth: 'auth',
    signup: '/',
    signin: 'signin',
    user: 'user',
    selection: 'selection',
    random: 'random',
    post: 'post'
}

export const PAGE_KEYS = {
    main: '/',
    signup: 'signup',
    signin: 'signin',
    emailConfirm: 'email-confirm',
    recipe: 'recipe',
    admin: 'admin',
    profile: 'profile'
}

export const measuresObj = {
    "ML":"мл",
    "L":"л",
    "KG":"кг",
    "G":"гр",
    "N":"шт"
}

export const measuresArray = [
    { label: "мл", value: "ML" },
    { label: "л", value: "L" },
    { label: "кг", value: "KG" },
    { label: "гр", value: "G" },
    { label: "шт", value: "N" }
  ];