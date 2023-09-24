import React from 'react';
import styles from './cardList.module.css';
import Pagination from '../pagination/Pagination';
import Card from '../card/Card';

const getData = async (pageNumber) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${pageNumber}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

const CardList = async ({ pageNumber }) => {
  const data = await getData(pageNumber);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {data?.posts?.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default CardList;
