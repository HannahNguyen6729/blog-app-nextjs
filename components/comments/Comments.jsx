import Link from 'next/link';
import Image from 'next/image';

import styles from './comments.module.css';

const Comments = () => {
  const status = 'authenticated';
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === 'authenticated' ? (
        <div className={styles.write}>
          <textarea placeholder="write a comment..." className={styles.input} />
          <button className={styles.button}>Send</button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className={styles.comments}>
        <div className={styles.comment}>
          <div className={styles.user}>
            <Image
              src="/travel.png"
              alt=""
              width={50}
              height={50}
              className={styles.image}
            />

            <div className={styles.userInfo}>
              <span className={styles.username}>Anna</span>
              <span className={styles.date}>12.12.20223</span>
            </div>
          </div>
          <p className={styles.desc}> lorem100 </p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
