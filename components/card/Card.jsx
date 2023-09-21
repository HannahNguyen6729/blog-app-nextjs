import Image from 'next/image';
import Link from 'next/link';

import styles from './card.module.css';

const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src="/p1.jpeg" alt="" fill className={styles.image} />
      </div>

      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>11.9.2023</span>
          <span className={styles.category}>culture</span>
        </div>
        <Link href={`/posts/`}>
          <h1>card</h1>
        </Link>
        <div className={styles.desc} />
        <Link href={`/posts/`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
