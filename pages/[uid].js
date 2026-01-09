import { SliceZone } from '@prismicio/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { createClient, localeOverrides } from '../prismicio';
import { components } from '../slices';
import { resolveLocaleFromNext } from '../lib/resolveLocaleFromNext';
import { withAlternateLanguageURLs } from '../lib/withAlternateLanguageURLs';
import Layout from '../components/layout/Layout';

const Page = (props) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const { metaTitle, metaDescription, ogImage, ogImageAlt, page } = props;
  // console.log('alternante through page:', page);
  // console.log(page.url);
  const canonicalUrl = `https://letoasteur.com${page.url}`;

  return (
    <Layout alternateLanguages={page.alternate_languages}>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} key="desc" />
        <link rel="canonical" href={canonicalUrl} key="canonical" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:type" content="page" />
        <meta property="og:url" content={currentRoute} />
        <meta property="og:image" content={ogImage} alt={ogImageAlt} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:site_name" content="Le Toasteur Villeray" />
      </Head>
      <SliceZone slices={page.data.slices} components={components} />
    </Layout>
  );
};

export default Page;

// export async function getStaticProps({ params, previewData }) {
//   const client = createClient({ previewData });

//   const page = await client.getByUID('page', params.uid);

//   return {
//     props: {
//       page
//     }
//   };
// }

// export async function getStaticPaths() {
//   const client = createClient();

//   const pages = await client.getAllByType('page');

//   return {
//     paths: pages.map((page) => prismicH.asLink(page)),
//     fallback: false
//   };
// }

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });
  const resolvedLocale = resolveLocaleFromNext(locale);

  const page = await client.getByUID('page', params.uid, {
    lang: resolvedLocale
  });

  const pageWithAlternateLanguageURLs = await withAlternateLanguageURLs(
    page,
    client
  );

  return {
    props: {
      metaTitle: page.data.meta_title ? page.data.meta_title : '',
      metaDescription: page.data.meta_description
        ? page.data.meta_description
        : '',
      ogImage: page.data.og_image.url
        ? page.data.og_image.url
        : 'https://images.prismic.io/letoasteur/05ef725c-3208-41e6-a44a-cd38e6f25471_logo-toasteur-villeray-navy.png?auto=compress,format',
      ogImageAlt: page.data.og_image.alt
        ? page.data.og_image.alt
        : 'Le Toasteur brunch restaurant',
      title: page.data.title ? page.data.title : '',
      page: pageWithAlternateLanguageURLs
    }
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const documents = await client.getAllByType('page', { lang: '*' });

  // Filter out documents without a uid (misconfigured pages in Prismic)
  const validDocuments = documents.filter((doc) => doc.uid);

  const paths = validDocuments.map((doc) => ({
    params: { uid: doc.uid },
    locale: localeOverrides[doc.lang] || doc.lang
  }));

  return {
    paths,
    fallback: false
  };
}
