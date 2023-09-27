'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { slugify } from '@/src/utils/slugify';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { firebaseApp } from '@/src/utils/firebase';
import axios from 'axios';

import styles from './writePage.module.css';

const WritePage = () => {
  const { status } = useSession();
  const [open, setOpen] = useState(false);

  const [post, setPost] = useState({
    title: '',
    category: 'style',
    desc: '',
  });

  const router = useRouter();

  const [file, setFile] = useState(null);
  const [media, setMedia] = useState('');

  //upload img file with firebase
  useEffect(() => {
    const uploadImgFile = () => {
      const storage = getStorage(firebaseApp);
      const imgName = new Date().getTime() + file.name;
      // const imgName = file.name;
      const storageRef = ref(storage, imgName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.log('Upload failed', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setMedia(downloadURL);
          });
        }
      );
    };
    file && uploadImgFile();
  }, [file]);

  if (status === 'loading') {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/');
  }

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async () => {
    //call api to create a new post
    /* const response = await fetch(`/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug: slugify(post.title),
        title: post.title,
        desc: post.desc,
        catSlug: post.category,
        image: media,
      }),
    }); */
    const response = await axios({
      url: `/api/posts`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        slug: slugify(post.title),
        title: post.title,
        desc: post.desc,
        catSlug: post.category,
        image: media,
      },
    });
    console.log({ response });
    if (response.status === 200) {
      router.push(`/posts/${response.data.slug}`);
    }
  };

  console.log({ file });
  return (
    <div className={styles.container}>
      <input
        name="title"
        value={post.title}
        onChange={(event) => handleChange(event)}
        type="text"
        placeholder="Title"
        className={styles.input}
      />
      <select
        name="category"
        value={post.category}
        onChange={(event) => handleChange(event)}
        className={styles.select}
      >
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>
      <div className={styles.editor}>
        <button className={styles.button}>
          <Image
            onClick={() => setOpen(!open)}
            src="/plus.png"
            alt=""
            width={16}
            height={16}
          />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              id="image"
              style={{ display: 'none' }}
            />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image src="/image.png" alt="" width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}

        <textarea
          name="desc"
          value={post.desc}
          onChange={handleChange}
          className={styles.textArea}
          placeholder="Tell your story..."
        />
      </div>
      <button onClick={handleSubmit} className={styles.publish}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;
