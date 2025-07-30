import { CacheProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';
import createCache from '@emotion/cache';
import { NotificationProvider } from 'src/modules/notifications';

interface IProps {
  children: ReactNode;
}

export const CommonProvider: FC<IProps> = ({ children }) => {

  const clientSideEmotionCache = createCache({ key: 'css', prepend: true });

  const emotionCache = clientSideEmotionCache;

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>{children}</CacheProvider>
      <NotificationProvider />
    </QueryClientProvider>
  );
};
