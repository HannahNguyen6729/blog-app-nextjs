import Link from 'next/link';
import React from 'react';

const AuthLinks = () => {
  const status = 'notauthenticated';
  return (
    <div>
      {status === 'notauthenticated' ? (
        <Link href="/login">Login</Link>
      ) : (
        <>
          <Link href="/log out">Log out </Link>
        </>
      )}
    </div>
  );
};

export default AuthLinks;
