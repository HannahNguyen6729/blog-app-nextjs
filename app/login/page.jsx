'use client';

import { useSession, signIn } from 'next-auth/react';
import styles from './loginPage.module.css';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log({ session, status });

  if (status === 'loading') {
    return <p>Hang on there...</p>;
  }

  if (status === 'authenticated') {
    router.push('/');
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socialButton} onClick={() => signIn('google')}>
          Sign in with Google
        </div>
        <div className={styles.socialButton} onClick={() => signIn('github')}>
          Sign in with Github
        </div>
        <div className={styles.socialButton}>Sign in with Facebook</div>
      </div>
    </div>
  );
};

export default LoginPage;
