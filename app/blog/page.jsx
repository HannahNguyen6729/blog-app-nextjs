import React from 'react';
import CardList from '@/components/cardList/CardList';
import Menu from '@/components/menu/Menu';

import styles from './blogPage.module.css';

const BlogPage = ({ searchParams }) => {
  const category = searchParams.cat;
  const pageNumber = Number(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> {category} Blog</h1>
      <div className={styles.content}>
        <CardList pageNumber={pageNumber} category={category} />
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;
