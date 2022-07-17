import 'styles/global.scss'

import { ColumnCenter } from 'components/Column'
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
  padding: 30px 0;
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
const AppWrapper = styled.div``
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
    <TextWrapper>
      <Logo width="300px" height="76px" title="logo" />
      <div className="uk-margin-top"></div>
      <h1 style={{ color: 'white', margin: 0 }}>#1 Trading protocol</h1>
      <h4 style={{ color: 'white', marginTop: '40px', marginBottom: '0' }}>No Slippage Guaranteed!</h4>
      <h4 style={{ color: 'white', marginTop: '10px', marginBottom: '0' }}>Lowest transaction fee</h4>
      <h4 style={{ color: 'white', marginTop: '10px', marginBottom: '0' }}>
        Execute large-size orders with minimal price impact!
      </h4>
      <h4 style={{ color: 'white', marginTop: '10px', marginBottom: '0' }}>Low cost and fully decentralized</h4>
      <h4 style={{ color: 'white', marginTop: '10px', marginBottom: '0' }}>
        Take large-size order at zero commission!
      </h4>
      <h4 style={{ color: 'white', marginTop: '10px', marginBottom: '0' }}>Stake $BDEX to save more on fee</h4>
      <div style={{ color: 'white', display: 'flex', flexDirection: 'row', marginTop: '50px' }}>
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
  )
  const tradeModule = (
    <>
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
            <Route exact strict path="/add/v2/:currencyIdA?/:currencyIdB?" component={RedirectDuplicateTokenIdsV2} />
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
    </>
  )
  return (
    <ErrorBoundary>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <Route component={ApeModeQueryParamReader} />
      <Web3ReactManager>
        <BackgroundWrapper>
          <div className="uk-section uk-section-secondary uk-light">
            <div className="uk-container uk-container-small">
              <div className={`uk-flex ${!screenMobile ? 'uk-flex-row' : 'uk-flex-column'}`}>
                {!screenMobile ? (
                  <div className="uk-width-3-5@m">{textWrapper}</div>
                ) : (
                  <div className="uk-padding-small">
                    <div className="uk-h2 uk-margin-remove" style={{ fontFamily: 'BaronNeue-Black' }}>
                      BLOCKDEX
                    </div>
                    <div className="uk-p">The #1 decentralized exchange for high volume with minimum slippage</div>
                  </div>
                )}
                <div className="uk-flex uk-flex-column uk-flex-middle uk-flex-center uk-width-2-5@m">{tradeModule}</div>
              </div>
            </div>
          </div>
          {!screenMobile ? (
            <>
              <div className="uk-section uk-section-secondary uk-light">
                <div className="uk-container uk-container-small">
                  <h2>The future of decentralized OTC</h2>
                  <div className="uk-grid uk-grid-match uk-child-width-1-2@m">
                    <div>
                      <h4 className="uk-margin-top">High Volume Trade</h4>
                      <p className="uk-margin-remove-top">
                        Cryptocurrencies are the highest appreciating asset class in the history of mankind. Bitcoin’s
                        price appreciated 6,500,000x in 12 years, from $0.01 to $65,000.
                      </p>
                    </div>
                    <div>
                      <h4 className="uk-margin-top">1INCH Integration</h4>
                      <p className="uk-margin-remove-top">
                        More than 300,000 BTC in over 30,000 addresses minted their own HEX for free using the HEX
                        contract. HEX is the first cryptocurrency with a chart of its future locked supply.
                      </p>
                    </div>
                    <div>
                      <h4 className="uk-margin-top">Lowest fee/gas</h4>
                      <p className="uk-margin-remove-top">
                        Stakers get paid rewards daily. This multiplies their ROI when HEX’s price appreciates against
                        USD. Active Stakes also receive penalties of other users 40%.
                      </p>
                    </div>
                    <div>
                      <h4 className="uk-margin-top">No LP with Instant Trade</h4>
                      <p className="uk-margin-remove-top">
                        Stakers get paid rewards daily. This multiplies their ROI when HEX’s price appreciates against
                        USD. Active Stakes also receive penalties of other users 40%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="uk-section uk-section-secondary uk-light">
                <div className="uk-container uk-container-small">
                  <h2>
                    <span style={{ fontFamily: 'BaronNeue-Black' }}>BLOCKDEX</span> stats
                  </h2>
                  <div className="uk-grid uk-grid-match uk-child-width-1-4@m">
                    <div className="uk-flex uk-flex-row uk-flex-center uk-margin-medium-bottom">
                      <div
                        className="uk-text-center uk-margin-remove-bottom"
                        style={{ fontSize: '45px', fontFamily: 'Poppins', fontWeight: 'bold' }}
                      >
                        $2B
                      </div>
                      <div className="uk-h6 uk-text-center uk-margin-remove">Highest Volume</div>
                    </div>
                    <div className="uk-flex uk-flex-row uk-flex-center uk-margin-medium-bottom">
                      <div
                        className="uk-text-center uk-margin-remove-bottom"
                        style={{ fontSize: '45px', fontFamily: 'Poppins', fontWeight: 'bold' }}
                      >
                        $23B
                      </div>
                      <div className="uk-h6 uk-text-center uk-margin-remove">Total Trade Volume</div>
                    </div>
                    <div className="uk-flex uk-flex-row uk-flex-center uk-margin-medium-bottom">
                      <div
                        className="uk-text-center uk-margin-remove-bottom"
                        style={{ fontSize: '45px', fontFamily: 'Poppins', fontWeight: 'bold' }}
                      >
                        $0.1B
                      </div>
                      <div className="uk-h6 uk-text-center uk-margin-remove">Stake Volume</div>
                    </div>
                    <div className="uk-flex uk-flex-row uk-flex-center uk-margin-medium-bottom">
                      <div
                        className="uk-text-center uk-margin-remove-bottom"
                        style={{ fontSize: '45px', fontFamily: 'Poppins', fontWeight: 'bold' }}
                      >
                        13
                      </div>
                      <div className="uk-h6 uk-text-center uk-margin-remove">Investors</div>
                    </div>
                    <div className="uk-flex uk-flex-row uk-flex-center uk-margin-medium-bottom">
                      <div
                        className="uk-text-center uk-margin-remove-bottom"
                        style={{ fontSize: '45px', fontFamily: 'Poppins', fontWeight: 'bold' }}
                      >
                        32
                      </div>
                      <div className="uk-h6 uk-text-center uk-margin-remove">Exchanges</div>
                    </div>
                    <div className="uk-flex uk-flex-row uk-flex-center uk-margin-medium-bottom">
                      <div
                        className="uk-text-center uk-margin-remove-bottom"
                        style={{ fontSize: '45px', fontFamily: 'Poppins', fontWeight: 'bold' }}
                      >
                        8,230,211
                      </div>
                      <div className="uk-h6 uk-text-center uk-margin-remove">Holders</div>
                    </div>
                    <div className="uk-flex uk-flex-row uk-flex-center uk-margin-medium-bottom">
                      <div
                        className="uk-text-center uk-margin-remove-bottom"
                        style={{ fontSize: '45px', fontFamily: 'Poppins', fontWeight: 'bold' }}
                      >
                        73 Days
                      </div>
                      <div className="uk-h6 uk-text-center uk-margin-remove">Average double time</div>
                    </div>
                    <div className="uk-flex uk-flex-row uk-flex-center uk-margin-medium-bottom">
                      <div
                        className="uk-text-center uk-margin-remove-bottom"
                        style={{ fontSize: '45px', fontFamily: 'Poppins', fontWeight: 'bold' }}
                      >
                        6.6 yrs
                      </div>
                      <div className="uk-h6 uk-text-center uk-margin-remove">Average stake length</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          <div className="uk-section uk-section-secondary uk-light">
            <div className="uk-container uk-container-xsmall">
              <div className="uk-flex uk-flex-row">
                <div className="uk-flex uk-flex-column uk-width-1-1 uk-text-center">
                  {!screenMobile ? (
                    <>
                      <div className="uk-h2 uk-margin-remove" style={{ fontFamily: 'BaronNeue-Black' }}>
                        BLOCKDEX
                      </div>
                      <div className="uk-p">The #1 decentralized exchange for high volume with minimum slippage</div>
                      <div className="uk-divider-small"></div>
                    </>
                  ) : null}
                  <div className="uk-flex uk-flex-row uk-flex-wrap uk-flex-around">
                    <div className="uk-flex uk-flex-column uk-padding">
                      <div className="uk-h4 uk-margin-remove-bottom" style={{ fontFamily: 'BaronNeue-Black' }}>
                        COLLECTIVE
                      </div>
                      <a className="uk-link-muted uk-text-white" target="_blank" rel="noreferrer">
                        <div>Investors</div>
                      </a>
                      <a className="uk-link-muted uk-text-white" target="_blank" rel="noreferrer">
                        <div>Developers</div>
                      </a>
                    </div>
                    <div className="uk-flex uk-flex-column uk-padding">
                      <div className="uk-h4 uk-margin-remove-bottom" style={{ fontFamily: 'BaronNeue-Black' }}>
                        CONTACT
                      </div>
                      <a className="uk-link-muted uk-text-white" target="_blank" rel="noreferrer">
                        <div>support@blockdex.app</div>
                      </a>
                    </div>
                    <div className="uk-flex uk-flex-column uk-padding">
                      <div className="uk-h4 uk-margin-remove-bottom" style={{ fontFamily: 'BaronNeue-Black' }}>
                        SOCIAL
                      </div>
                      <a
                        className="uk-link-muted uk-text-white"
                        href={`https://discord.gg/DvUjFbbW5K`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="uk-text-cabin">Discord</div>
                      </a>
                      <a
                        className="uk-link-muted uk-text-white"
                        href={'https://twitter.com/RememberNFT'}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="uk-text-cabin">Twitter</div>
                      </a>
                      <a
                        className="uk-link-muted uk-text-white"
                        href={`https://www.instagram.com/remember.nft`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="uk-text-cabin">Instagram</div>
                      </a>
                      <a
                        className="uk-link-muted uk-text-white"
                        href="https://medium.com/@remember.nft"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="uk-text-cabin">Medium</div>
                      </a>
                    </div>
                  </div>
                  <div className="uk-flex uk-flex-column uk-margin-large-top">
                    <div className="uk-text-white" style={{ margin: 'auto', fontSize: '12px' }}>
                      Copyright © 2022 BLOCKDEX. All Rights Reserved.
                    </div>
                    <div className="uk-text-white" style={{ margin: 'auto', fontSize: '12px' }}>
                      Disclaimer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BackgroundWrapper>
      </Web3ReactManager>
    </ErrorBoundary>
  )
}
