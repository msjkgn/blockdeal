import { ColumnCenter } from 'components/Column'
import Loader from 'components/Loader'
import ApeModeQueryParamReader from 'hooks/useApeModeQueryParamReader'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'

import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import AddressClaimModal from '../components/claim/AddressClaimModal'
import ErrorBoundary from '../components/ErrorBoundary'
import Header from '../components/Header'
import Polling from '../components/Header/Polling'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { useModalOpen, useToggleModal } from '../state/application/hooks'
import { ApplicationModal } from '../state/application/reducer'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import AddLiquidity from './AddLiquidity'
import { RedirectDuplicateTokenIds } from './AddLiquidity/redirects'
import { RedirectDuplicateTokenIdsV2 } from './AddLiquidityV2/redirects'
import MigrateV2 from './MigrateV2'
import MigrateV2Pair from './MigrateV2/MigrateV2Pair'
import RemoveLiquidity from './RemoveLiquidity'
import RemoveLiquidityV3 from './RemoveLiquidity/V3'
import TestPage from './TestPage'
import { RedirectPathToTestOnly } from './TestPage/redirects'

const BackgroundWrapper = styled.div`
  padding: 80px 0;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(images/main.webp);
  height: 100%;
}
`
const AppWrapper = styled.div`
  width: 780px;
  text-align: left;
  position: relative;
  display: flex;
  justify-content: space-between;
`
const TextWrapper = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
`
const BodyWrapper = styled.div`
  max-width: 350px;
  border: 0 none;
  background-color: #212429 !important;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 25px 50px #000;
  margin-bottom: 50px;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`

const NavBarWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`

function TopLevelModals() {
  const open = useModalOpen(ApplicationModal.ADDRESS_CLAIM)
  const toggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM)
  return <AddressClaimModal isOpen={open} onDismiss={toggle} />
}

export default function App() {
  return (
    <ErrorBoundary>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <Route component={ApeModeQueryParamReader} />
      <Web3ReactManager>
        <BackgroundWrapper>
          <ColumnCenter>
            {/* <HeaderWrapper>
              <NavBarWrapper>HEADER GOES HERE</NavBarWrapper>
            </HeaderWrapper> */}
            <AppWrapper>
              <TextWrapper>
                <div style={{ color: 'white', fontSize: '50px', fontWeight: 900, marginBottom: 0 }}>
                  BLOCK<span style={{ color: '#CBE5E8' }}>DEX</span>
                </div>
                <h1 style={{ margin: 0 }}>#1 Trading protocol</h1>
                <h4 style={{ marginTop: '40px', marginBottom: '0' }}>No Slippage Guaranteed!</h4>
                <h4 style={{ marginTop: '10px', marginBottom: '0' }}>Lowest transaction fee</h4>
                <h4 style={{ marginTop: '10px', marginBottom: '0' }}>
                  Execute large-size orders with minimal price impact!
                </h4>
                <h4 style={{ marginTop: '10px', marginBottom: '0' }}>Low cost and fully decentralized</h4>
                <h4 style={{ marginTop: '10px', marginBottom: '0' }}>Take large-size order at zero commission!</h4>
                <h4 style={{ marginTop: '10px', marginBottom: '0' }}>Stake $BDEX to save more on fee</h4>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '50px' }}>
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
              </TextWrapper>
              <BodyWrapper>
                <Header />
                <Toaster position="bottom-left" />
                <Popups />
                <Polling />
                <TopLevelModals />
                <Suspense fallback={<Loader />}>
                  <Switch>
                    {/* <Route strict path="/rebalance" component={Rebalance} />
                <Route exact strict path="/pool/v2/find" component={PoolFinder} />
                <Route exact strict path="/pool/v2" component={PoolV2} />
                <Route exact strict path="/pool" component={Pool} />
                <Route exact strict path="/pool/:tokenId" component={PositionPage} /> */}
                    <Route exact strict path="/app" component={TestPage} />
                    <Route
                      exact
                      strict
                      path="/add/v2/:currencyIdA?/:currencyIdB?"
                      component={RedirectDuplicateTokenIdsV2}
                    />
                    <Route
                      exact
                      strict
                      path="/add/:currencyIdA?/:currencyIdB?/:feeAmount?"
                      component={RedirectDuplicateTokenIds}
                    />

                    <Route
                      exact
                      strict
                      path="/increase/:currencyIdA?/:currencyIdB?/:feeAmount?/:tokenId?"
                      component={AddLiquidity}
                    />

                    <Route exact strict path="/remove/v2/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                    <Route exact strict path="/remove/:tokenId" component={RemoveLiquidityV3} />

                    <Route exact strict path="/migrate/v2" component={MigrateV2} />
                    <Route exact strict path="/migrate/v2/:address" component={MigrateV2Pair} />

                    <Route component={RedirectPathToTestOnly} />
                  </Switch>
                </Suspense>
              </BodyWrapper>
            </AppWrapper>
          </ColumnCenter>
        </BackgroundWrapper>
      </Web3ReactManager>
    </ErrorBoundary>
  )
}
