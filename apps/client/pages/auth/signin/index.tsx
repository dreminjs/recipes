
import dynamic from 'next/dynamic';

export function Index() {

  const SignInPage = dynamic(() => import('@/pages/signin').then(components => components.SignInPage), { ssr: false })

  return <SignInPage />;
}

export default Index;
