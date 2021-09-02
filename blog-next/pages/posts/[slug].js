import Link from 'next/link';

export default function BlogPostPage({ post }) {
  // const post = post[0];
  return (
    <>
      <Link href='/'>home</Link>
      <h2>{post.Title}</h2>
    </>
  );
}

// tell next.js how many pages there are
export async function getStaticPaths() {
  const res = await fetch('http://localhost:1337/posts');
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { slug: post.Slug },
  }));
  return { paths: paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const res = await fetch(`http://localhost:1337/posts?Slug=${slug}`);

  const [post] = await res.json();

  return {
    props: { post },
  };
}
// for exch page, get hte data for that page
