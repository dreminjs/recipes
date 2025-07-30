
import dynamic from 'next/dynamic';

export function Index() {

  const SignInPage = dynamic(() => import('src/modules/auth').then(components => components.SignInPage), { ssr: false })

  return <SignInPage />;
}

export default Index;
