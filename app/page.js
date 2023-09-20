import Link from 'next/link';
import styles from './page.module.css';
import CategoryList from '@/components/categoryList/CategoryList';
import Featured from '@/components/featured/Featured';
import CardList from '@/components/cardList/CardList';
import Menu from '@/components/menu/Menu';

export default function Home() {
  return (
    <main className={styles.container}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <CardList />
        <Menu />
      </div>
    </main>
  );
}
