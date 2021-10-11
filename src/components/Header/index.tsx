import styles from "./styles.module.scss";
import { SignInButton } from "../SignInButton";
import Link from "next/link";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <Link href='/'>
            <a className={styles.active}>Home</a>
          </Link>
          <Link href="/posts" prefetch>
            <a>Posts</a>
          </Link>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
