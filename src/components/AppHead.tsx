import Head from "next/head";
import AppInfoUtils from "@/utils/appinfo";

export const AppHead = () => {
  const { TITLE, DESCRIPTION, URL, IMAGE } = AppInfoUtils;
  const WEBSITE = "website";

  return (
    <Head>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} key="desc" />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:type" content={WEBSITE} />
      <meta property="og:url" content={URL} />
      <meta property="og:image" content={IMAGE} />

      <meta property="twitter:card" content={WEBSITE} />
      <meta property="twitter:title" content={TITLE} />
      <meta property="twitter:description" content={DESCRIPTION} />
      <meta property="twitter:image" content={IMAGE} />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default AppHead;
