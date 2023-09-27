import Image from 'next/image';
import Comments from '@/components/comments/Comments';
import Menu from '@/components/menu/Menu';
import axios from 'axios';
import { API_URL } from '@/utils/const';

import styles from './singlePage.module.css';

const getData = async (slug) => {
  const res = await fetch(`http://127.0.0.1:3000/api/posts/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

const SinglePage = async ({ params }) => {
  // const data = await getData(params.slug);
  const { data } = await axios({
    url: `${API_URL}/api/posts/${params.slug}`,
    //url: `https://hanh-nguyen-blogr-nextjs-prisma.vercel.app/api/posts/${params.slug}`,
    method: 'GET',
  });

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}> {data?.title} </h1>
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={data.user.image}
                  alt="avatar"
                  fill
                  className={styles.avatar}
                />
              </div>
            )}

            <div className={styles.userTextContainer}>
              <span className={styles.username}> {data?.user?.name} </span>
              <span className={styles.date}>24.09.2023</span>
            </div>
          </div>
        </div>

        {data?.image && (
          <div className={styles.imageContainer}>
            <Image src={data.image} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description} />
          <div className={styles.comment}>
            {/*  <div
              className={styles.desc}
              dangerouslySetInnerHTML={{ __html: data?.desc }}
            /> */}
            <div>{data?.desc}</div>
            <Comments postSlug={params.slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
