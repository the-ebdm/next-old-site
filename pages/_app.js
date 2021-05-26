import 'tailwindcss/tailwind.css'
import 'react-code-container/dist/index.css'
import Layout from '../components/Structure/layout'
import firebase from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import Head from "next/head";

const auth = firebase.auth();


function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [remoteConfig, setRemoteConfig] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  useEffect(async () => {
    if (process?.browser) {
      const remoteConfig = firebase.remoteConfig();
      const analytics = firebase.analytics();
      remoteConfig.settings.minimumFetchIntervalMillis = 500 * 1000;
      await remoteConfig.fetchAndActivate();
      remoteConfig.defaultConfig = {
        homepagetitle: "EBDM",
      };
      window.dataLayer = window.dataLayer || [];
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
      console.log(userData);
    }
  }, [loading]);
  return (
    <Layout remoteConfig={remoteConfig} user={user}>
      <Component {...pageProps} remoteConfig={remoteConfig} user={user}/>
    </Layout>
  )
}

export default MyApp
