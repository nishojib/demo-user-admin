import { ChakraProvider } from '@chakra-ui/react';
import { GeistSans } from 'geist/font/sans';
import { Provider as JotaiProvider } from 'jotai';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import '~/styles/globals.css';
import { api } from '~/utils/api';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <JotaiProvider>
          <main className={GeistSans.className}>
            <Component {...pageProps} />
          </main>
        </JotaiProvider>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
