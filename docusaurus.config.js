// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const my_mail = "livio@zanol.com.br";


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Livio\'s Dump',
  tagline: 'Just to dump some thoughts',
  url: 'https://livio.zanol.com.br',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'liviozanol', // Usually your GitHub org/user name.
  projectName: 'liviozanol.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: {
          path: './blog',
          routeBasePath: '/', // Set this value to '/'.
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/liviozanol/liviozanol.github.io',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Livio\'s Dump',
        logo: {
          alt: 'Logo',
          src: 'img/lzp-small.svg',
          width: 32,
          height: 32,
        },
        items: [
          {
            label: `E-mail: ${my_mail}`,
            href: `mailto:${my_mail}`,
            position: 'right',
          },
          { 
            label: 'GitHub',
            href: 'https://github.com/liviozanol'
          },
        ],
      },

      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Livio Zanol Puppim (${my_mail}). Built with Docusaurus.`,
      },
      prism: {
        defaultMode: 'dark',
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
