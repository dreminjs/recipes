import { CacheProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';
import { createEmotionCache } from '../create-emotion-chache';

interface IProps {
  children: ReactNode;
}

const clientSideEmotionCache = createEmotionCache();
export const CommonProvider: FC<IProps> = ({ children }) => {
  const emotionCache = clientSideEmotionCache;

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>{children}</CacheProvider>
    </QueryClientProvider>
  );
};
