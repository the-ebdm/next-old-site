import 'tailwindcss/tailwind.css'
import Layout from '../components/Structure/layout'
import firebase from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import useLocalStorage from "../lib/hooks/useLocalStorage";
import Head from "next/head";

const auth = firebase.auth();
const isBrowser = (typeof window !== "undefined");

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [user, userLoading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [remoteConfig, setRemoteConfig] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [theme, setTheme] = useLocalStorage("theme", {
    global: 'light',
    fonts: {
      header: 'Barlow'
    }
  });
  useEffect(async () => {
    if (process?.browser) {
      const remoteConfig = firebase.remoteConfig();
      const analytics = firebase.analytics();
      remoteConfig.settings.minimumFetchIntervalMillis = 500 * 1000;
      await remoteConfig.fetchAndActivate();
      remoteConfig.defaultConfig = {
        homepagetitle: "EBDM",
      };
      if(isBrowser) {
        window.dataLayer = window.dataLayer || [];
      }
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-TD3MWMJRVD");
      setRemoteConfig(remoteConfig);
      setAnalytics(analytics);
    }
  }, []);
  useEffect(async () => {
    if (loading === false && user !== null) {
      console.log("User has loaded");
      const { displayName, email, photoURL, emailVerified, metadata } = user;
      const roles = await user.getIdTokenResult();
      setUserData({
        id: roles.claims.user_id,
        displayName: displayName,
        email: email,
        photoURL: photoURL,
        emailVerified: emailVerified,
        metadata: metadata,
        isAdmin: !!roles?.claims?.admin,
      });
    }
  }, [userLoading]);
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])
  useEffect(() => {
    console.log(`Everything ${loading ? 'is Loading' : 'has Loaded'}`)
  }, [loading])
  return (
    <Layout remoteConfig={remoteConfig} user={user} theme={theme} loading={loading}>
      <Head>
        <title>EBDM.DEV</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} remoteConfig={remoteConfig} user={user} setLoading={setLoading}/>
    </Layout>
  )
}

export default MyApp
