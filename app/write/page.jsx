'use client';

import Image from 'next/image';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { slugify } from '@/utils/slugify';

import styles from './writePage.module.css';
import { useRouter } from 'next/navigation';

const WritePage = () => {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState('');

  const [post, setPost] = useState({
    title: '',
    category: 'style',
  });

  const router = useRouter();

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async () => {
    //call api to create a new post
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug: slugify(post.title),
        title: post.title,
        desc,
        catSlug: post.category,
      }),
    });
    if (response.status === 200) {
      const result = await response.json();
      router.push(`/posts/${result.slug}`);
    }
  };

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
            <input type="file" id="image" style={{ display: 'none' }} />
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

        <ReactQuill
          value={desc}
          onChange={setDesc}
          className={styles.textArea}
          placeholder="Tell your story..."
          theme="snow"
        />
      </div>
      <button onClick={handleSubmit} className={styles.publish}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;
