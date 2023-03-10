import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}

export default function Home({ allPostsData }) {
    return (
        <Layout home>
            {/* Keep the existing code here */}

            {/* Add this <section> tag below the existing <section> tag */}
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>{title}</Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}

////Per request server-side-rendering
////https://nextjs.org/docs/basic-features/data-fetching/overview#getserversideprops-server-side-rendering
//
// function Page({ data }) {
//     // Render data...
//   }
//
//   // This gets called on every request
//   export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(`https://.../data`)
//     const data = await res.json()
//
//     // Pass data to the page via props
//     return { props: { data } }
//   }
//
//   export default Page

////Client side rendering
////https://swr.vercel.app/
//
//import useSWR from 'swr';
//
//function Profile() {
//  const { data, error } = useSWR('/api/user', fetch);
//
//  if (error) return <div>failed to load</div>;
//  if (!data) return <div>loading...</div>;
//  return <div>hello {data.name}!</div>;
//}
