import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './card.module.css';

const Card = ({ key, post }) => {
  const { title, slug, desc, image, createdAt } = post;
  return (
    <div className={styles.container} key={key}>
      {image && (
        <div className={styles.imageContainer}>
          <Image src={image} alt={title} fill className={styles.image} />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}> {createdAt.substring(0, 10)} - </span>
          <span className={styles.category}> {slug} </span>
        </div>
        <Link href={`/posts/${slug}`}>
          <h1> {title} </h1>
        </Link>
        <div className={styles.desc}>{desc.substring(0, 60)}</div>
        <Link href={`/posts/${slug}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
