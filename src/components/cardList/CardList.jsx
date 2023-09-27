import React from 'react';
import styles from './cardList.module.css';
import Pagination from '../pagination/Pagination';
import Card from '../card/Card';
import axios from 'axios';
import { API_URL } from '@/src/utils/const';

const getData = async (pageNumber, category) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${pageNumber}&category=${
      category || ''
    }`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

const CardList = async ({ pageNumber, category }) => {
  // const data = await getData(pageNumber, category);
  const { data } = await axios({
    url: `${API_URL}/api/posts?page=${pageNumber}&category=${category || ''}`,
    /*  url: `https://hanh-nguyen-blogr-nextjs-prisma.vercel.app/api/posts?page=${pageNumber}&category=${
      category || ''
    }`, */
    method: 'GET',
  });

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (pageNumber - 1) > 0;
  const hasNext = POST_PER_PAGE * (pageNumber - 1) + pageNumber < data?.count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {data?.posts?.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
      <Pagination pageNumber={pageNumber} hasNext={hasNext} hasPrev={hasPrev} />
    </div>
  );
};

export default CardList;
