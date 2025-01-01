export { AuthService } from './api/services/auth.service';

export {
  API_URL,
  QUERY_KEYS,
  SERVICE_KEYS,
  PAGE_KEYS,
} from './model/constants';

export { SignUpSchema, SignInSchema } from './model/schemas/auth.schema';

export type { ISignUp, ISignIn } from './model/interfaces/auth.interface';

export { AuthButton } from './ui/auth-button';

export { GreetingTitle } from './ui/greeting-title';

export { usePostSignIn, usePostSignUp } from './api/queries/auth.queries';

export { BasicModal } from './ui/basic-modal';

export { useGetMyProfile } from './api/queries/user.queries';

export { useGetRandomCharacteristic } from './api/queries/characteristic.queries';

export { PostRecipeFormSchema } from './model/schemas/recipe.schema';

export type { IPostRecipeForm } from './model/interfaces/recipe.interface';

export { useGetRecipes } from './api/queries/recipe.queries';

export {
  useDeleteType,
  useGetTypes,
  usePostType,
  usePutType,
} from './api/queries/type.queries';

export type { IPostCharacteristicForm } from './model/interfaces/characteristic.interface';

export { PostCharacteristicFormSchema } from './model/schemas/characteristic.schema';

export { InputSearch } from './ui/input-search';

export {
  useDeleteNationalCuisine,
  useGetNationalCuisines,
  usePostNationalCuisine,
  usePutNationalCuisine,
} from './api/queries/national-cuisine.queries';

export {
  useDeleteHoliday,
  useGetHolidays,
  usePostHoliday,
  usePutHoliday,
} from './api/queries/holiday.queries';
