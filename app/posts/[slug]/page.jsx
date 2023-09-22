import Image from 'next/image';
import Comments from '@/components/comments/Comments';
import Menu from '@/components/menu/Menu';

import styles from './singlePage.module.css';

const SinglePage = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>new post</h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <Image src="/food.png" alt="" fill className={styles.avatar} />
            </div>

            <div className={styles.userTextContainer}>
              <span className={styles.username}>Tom Smith</span>
              <span className={styles.date}>01.01.2024</span>
            </div>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <Image src="/food.png" alt="" fill className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description} />
          <div className={styles.comment}>
            Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet,
            consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor
            sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem
            ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet,
            consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor
            sit amet, consecteturLorem ipsum dolor sit amet, consectetur
            <Comments />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
