'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/utils/const';

import styles from './comments.module.css';

/* const fetcher = async (queryParameters) => {
  const res = await fetch(queryParameters.url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
}; */
const fetcher = async (queryParameters) => {
  const { data } = await axios({
    url: queryParameters.url,
    method: 'GET',
  });
  return data;
};

const Comments = ({ postSlug }) => {
  const { status } = useSession();

  const { data, isLoading, error, mutate } = useSWR(
    { url: `${API_URL}/api/comments?postSlug=${postSlug}` },
    /* {
      url: `https://hanh-nguyen-blogr-nextjs-prisma.vercel.app/api/comments?postSlug=${postSlug}`,
    }, */
    fetcher
  );
  console.log({ data });
  const [description, setDescription] = useState('');

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const handleOnChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    //call api to create a new comment
    /*  const response = await fetch(`/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ desc: description, postSlug }),
    });
    const result = await response.json();
    console.log('Success:', result); */

    const response = await axios({
      url: '/api/comments',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { desc: description, postSlug },
    });
    //const result = await response.json();
    console.log('Success:', response);

    //update comment list
    mutate();
    setDescription('');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === 'authenticated' ? (
        <div className={styles.write}>
          <textarea
            value={description}
            onChange={handleOnChange}
            placeholder="write a comment..."
            className={styles.input}
          />
          <button onClick={handleSubmit} className={styles.button}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className={styles.comments}>
        {data?.map((item) => (
          <div className={styles.comment} key={item.id}>
            <div className={styles.user}>
              {item?.user?.image && (
                <Image
                  src={item.user.image}
                  alt=""
                  width={50}
                  height={50}
                  className={styles.image}
                />
              )}
              <div className={styles.userInfo}>
                <span className={styles.username}>{item.user.name}</span>
                <span className={styles.date}>
                  {item.createdAt.substring(0, 10)}
                </span>
              </div>
            </div>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
