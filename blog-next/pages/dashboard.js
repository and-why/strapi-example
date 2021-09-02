import { getSession, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

export default function DashboardPage({ session }) {
  const user = session?.user;

  return <div>Dashboard</div>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) return { redirect: { destination: '/', permanent: false } };

  return {
    props: { session },
  };
}
