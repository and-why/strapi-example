import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function Home({ posts }) {
  const [session, loading] = useSession();

  const user = session?.user;
  return (
    <div>
      {user ? (
        <>
          {posts &&
            posts.map((post) => (
              <div key={post.id}>
                <h2>{post.Title}</h2>
                <div>{post.User.username}</div>
                <p>{post.Content}</p>
                <Link href={`/posts/${post.Slug}`}>Read More</Link>
              </div>
            ))}
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <button disabled={loading} onClick={() => signIn('github')}>
            Sign in with Github
          </button>
          <p>login to see posts</p>
        </>
      )}
    </div>
  );
}

export async function getStaticProps() {
  // get posts from our api
  const res = await fetch('http://localhost:1337/posts');

  const posts = await res.json();

  return {
    props: { posts },
  };
}
