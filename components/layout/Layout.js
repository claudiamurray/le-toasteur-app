import MainNavigation from './MainNavigation';
import Footer from './Footer';
import classes from './Layout.module.css';
import React from 'react';
function Layout({ children, alternateLanguages, menu }) {
  // Default to en-ca if alternateLanguages is missing or empty
  const defaultAlternate = [{ lang: 'en-ca', url: '/en-ca' }];
  const safeAlternateLanguages =
    Array.isArray(alternateLanguages) && alternateLanguages.length > 0
      ? alternateLanguages
      : defaultAlternate;

  return (
    <React.Fragment>
      <MainNavigation alternateLanguages={safeAlternateLanguages} />
      <main className={classes.main}>{children}</main>
      <Footer alternateLanguages={safeAlternateLanguages} />
    </React.Fragment>
  );
}

export default Layout;
