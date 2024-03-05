import Head from "next/head"
import Script from "next/script"
import { Provider } from "react-redux"
import store from "@/store/store"
import { Web3ReactProvider } from "@web3-react/core";
import { hooks as walletConnectV2Hooks, walletConnectV2 } from '@/connectors/walletConnectV2.js'
import { hooks as metaMaskHooks, metaMask } from '@/connectors/metaMask'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import useEagerConnect from "@/hooks/useEagerConnect"
import "@/styles/app.scss"
import "@/styles/banner.scss"
import "@/styles/nftdetail.scss"
import "@/styles/topcollections.scss"
import "@/styles/launchpaddrops.scss"
import "@/styles/aboutus.scss"
import "@/styles/navbar.scss"
import "@/styles/footer.scss"
import "@/styles/liveauction.scss"
import "@/styles/topseller.scss"
import "@/styles/discovercollection.scss"
import "@/styles/collections.scss"
import "@/styles/applylaunchpad.scss"
import "@/styles/collectiondashbord.scss"
import "@/styles/createnewcollections.scss"
import "@/styles/setupwhitelist.scss"
import "@/styles/filter.scss"
import "@/styles/multirangeslider.scss"
import "@/styles/activity.scss"
import "@/styles/putonsale.scss"
import "@/styles/authorprofile.scss"
import "@/styles/launchpaddetailpage.scss"
import "@/styles/editprofile.scss"
import "@/styles/collectiondetail.scss"
import "@/styles/launchpad.scss"
import "@/styles/contactus.scss"
import "@/styles/login.scss"
import "@/styles/privacypolicy.scss"

export default function App({ Component, pageProps }) {
  useEagerConnect();

  const connectors = [
    [walletConnectV2, walletConnectV2Hooks],
    [metaMask, metaMaskHooks]
  ]

  return <>

    <Provider store={store} >
      {connectors &&
        <Web3ReactProvider connectors={connectors}>
          <Head>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous" />
          </Head>
          <Component {...pageProps} />
          <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"></Script>
          <Script src="https://unpkg.com/react/umd/react.development.js"></Script>
          <Script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></Script>
        </Web3ReactProvider>
      }
    </Provider>
    <ToastContainer style={{ fontSize: '14px', zIndex: "9999999999999999" }} theme="dark" position="top-right" />
  </>
}




