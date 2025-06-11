const prismic = require('@prismicio/client');
const sm = require('./sm.json');

const localeOverrides = {
  'fr-fr': 'fr'
};

/** @type {import('next').NextConfig} */
const nextConfig = async () => {
  const client = prismic.createClient(sm.apiEndpoint);

  const repository = await client.getRepository();
  const locales = repository.languages.map(
    (lang) => localeOverrides[lang.id] || lang.id
  );

  return {
    reactStrictMode: true,
    swcMinify: true,

    i18n: {
      // These are all the locales you want to support in
      // your application
      locales,
      // This is the default locale you want to be used when visiting
      // a non-locale prefixed path e.g. `/hello`
      defaultLocale: locales[0],
      // defaultLocale: 'en-ca'
      localeDetection: false
    },
    images: {
      domains: [
        'letoasteur.cdn.prismic.io',
        'images.prismic.io',
        'res.cloudinary.com',
        'www.google.com',
        'lh3.googleusercontent.com'
      ]
    },

    async redirects() {
      return [
        {
          source: '/menu',
          destination: '/menu-mai-juin',
          permanent: true,
          has: [
            {
              type: 'query',
              key: 'lang',
              value: 'fr'
            }
          ]
        },
        {
          source: '/notre-histoire',
          destination: '/en-ca/our-history',
          permanent: true
        },
        {
          source: '/galerie',
          destination: '/en-ca/gallery',
          permanent: true
        },
        {
          source: '/contact',
          destination: '/en-ca/contact',
          permanent: true
        }
      ];
    }
  };
};

module.exports = nextConfig;
