import 'styles/global.scss'

import Footer from 'BlockDEX/components/Footer'
import Section from 'BlockDEX/components/Section'
import { Introduction } from 'BlockDEX/containers/Introduction'
import Loader from 'components/Loader'
import ApeModeQueryParamReader from 'hooks/useApeModeQueryParamReader'
import { Suspense, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'

import { ReactComponent as Logo } from '../assets/svg/blockdex-logo-white.svg'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import AddressClaimModal from '../components/claim/AddressClaimModal'
import ErrorBoundary from '../components/ErrorBoundary'
import Header from '../components/Header'
import Polling from '../components/Header/Polling'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { useWindowSize } from '../hooks/perfectFund/useWindowSize'
import { useModalOpen, useToggleModal } from '../state/application/hooks'
import { ApplicationModal } from '../state/application/reducer'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import TestPage from './TestPage'
import { RedirectPathToTestOnly } from './TestPage/redirects'

const BackgroundWrapper = styled.div`
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(images/main.webp);
  height: 100%;
`

const BodyWrapper = styled.div`
  max-width: 350px;
  border: 0 none;
  background-color: #212429 !important;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 25px 50px #000;
  margin-top: 10px;
  margin-bottom: 10px;
`

function TopLevelModals() {
  const open = useModalOpen(ApplicationModal.ADDRESS_CLAIM)
  const toggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM)
  return <AddressClaimModal isOpen={open} onDismiss={toggle} />
}

export default function App() {
  const win_size = useWindowSize()
  const [screenMobile, setScreenMobile] = useState(false)

  useEffect(() => {
    // @ts-ignore
    if (win_size?.width < 640) {
      setScreenMobile(true)
    } else {
      setScreenMobile(false)
    }
  }, [win_size])

  const textWrapper = (
    <div className="uk-flex uk-flex-column">
      <div className="uk-h3 uk-margin-remove-bottom">#1 Trading protocol</div>
      <div className="uk-p uk-margin-remove">No Slippage Guaranteed!</div>
      <div className="uk-p uk-margin-remove">Lowest transaction fee</div>
      <div className="uk-p uk-margin-remove">Execute large-size orders with minimal price impact!</div>
      <div className="uk-p uk-margin-remove">Low cost and fully decentralized</div>
      <div className="uk-p uk-margin-remove">Take large-size order at zero commission!</div>
      <div className="uk-p uk-margin-remove">Stake $BDEX to save more on fee</div>
      <div className="uk-flex uk-flex-row uk-margin-large-top">
        <div
          style={{
            padding: '10px 20px',
            marginRight: '15px',
            fontSize: '25px',
            fontWeight: 800,
            color: 'white',
            backgroundColor: '#29313D',
            borderRadius: '4px',
            border: '0px solid',
          }}
        >
          LEARN MORE
        </div>
      </div>
    </div>
  )
  return (
    <ErrorBoundary>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <Route component={ApeModeQueryParamReader} />
      <Web3ReactManager>
        <BackgroundWrapper>
          <Section title={null}>
            <Logo width={`${!screenMobile ? '300px' : '200px'}`} height="76px" title="logo" />
            <div className={`uk-flex ${!screenMobile ? 'uk-flex-row uk-flex-middle' : 'uk-flex-column'}`}>
              {!screenMobile ? (
                <div className="uk-width-3-5@m uk-padding-small">{textWrapper}</div>
              ) : (
                <div className="uk-p uk-padding-small uk-padding-remove-vertical uk-text-meta">
                  The #1 decentralized exchange for high volume with minimum slippage
                </div>
              )}
              <div className="uk-flex uk-flex-column uk-flex-middle uk-flex-center uk-width-2-5@m uk-width-1-1">
                <BodyWrapper>
                  <Header />
                  {/* <Popups /> */}
                  <Polling />
                  <TopLevelModals />
                  <Suspense fallback={<Loader />}>
                    <Switch>
                      <Route exact strict path="/app" component={TestPage} />
                      <Route component={RedirectPathToTestOnly} />
                    </Switch>
                  </Suspense>
                </BodyWrapper>
              </div>
            </div>
          </Section>
          <Introduction />
          <Footer />
          <Toaster position="bottom-left" />
        </BackgroundWrapper>
      </Web3ReactManager>
    </ErrorBoundary>
  )
}
