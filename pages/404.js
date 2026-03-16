import React from "react";
import Head from "next/head";

import Link from "next/link";
import Image from "next/image";
import classes from "../components/ui/error.module.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function NotFoundPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Le Toasteur - Erreur</title>
        <meta name="description" content="Page 404: Cette page n'éxiste pas." />
      </Head>

      <div className={classes["background"]}>
        <div className={classes["box-text"]}>
          <span>erreur</span>
          <h1>404</h1>
          <h2>Quelque chose a mal tourné </h2>
          <div className={classes["box-link"]}>
            <Link href="/">
              <a className={classes["arrow-icon"]}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </a>
            </Link>
            <Link href="/">
              <a>Back</a>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NotFoundPage;
