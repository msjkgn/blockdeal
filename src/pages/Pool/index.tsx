import { BigNumber } from '@ethersproject/bignumber'
import { Trans } from '@lingui/macro'
import { ButtonGray, ButtonPrimary, ButtonText } from 'components/Button'
import { AutoColumn } from 'components/Column'
import { NewMenu } from 'components/Menu'
import { SwapPoolTabs } from 'components/NavigationTabs'
import PositionList from 'components/PositionList'
import { RowBetween, RowFixed } from 'components/Row'
import { SwitchLocaleLink } from 'components/SwitchLocaleLink'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useV3Positions } from 'hooks/useV3Positions'
import { useContext, useState } from 'react'
import { BookOpen, ChevronsRight, Inbox, Layers, PlusCircle } from 'react-feather'
import { Link } from 'react-router-dom'
import { useWalletModalToggle } from 'state/application/hooks'
import { useUserHideClosedPositions } from 'state/user/hooks'
import styled, { ThemeContext } from 'styled-components/macro'
import { ThemedText } from 'theme'
import { PositionDetails } from 'types/position'

import { V2_FACTORY_ADDRESSES } from '../../constants/addresses'
import { LoadingRows } from './styleds'

const PageWrapper = styled(AutoColumn)`
  max-width: 870px;
  width: 100%;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    max-width: 800px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    max-width: 500px;
  `};
`
const TitleRow = styled(RowBetween)`
  color: ${({ theme }) => theme.text2};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
  `};
`
const ButtonRow = styled(RowFixed)`
  & > *:not(:last-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    flex-direction: row-reverse;
  `};
`
const Menu = styled(NewMenu)`
  margin-left: 0;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex: 1 1 auto;
    width: 49%;
    right: 0px;
  `};

  a {
    width: 100%;
  }
`
const MenuItem = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: 500;
`
const MoreOptionsButton = styled(ButtonGray)`
  border-radius: 12px;
  flex: 1 1 auto;
  padding: 6px 8px;
  width: 100%;
  background-color: ${({ theme }) => theme.bg0};
  margin-right: 8px;
`
const NoLiquidity = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  max-width: 300px;
  min-height: 25vh;
`
const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  border-radius: 12px;
  padding: 6px 8px;
  width: fit-content;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex: 1 1 auto;
    width: 100%;
  `};
`

const MainContentWrapper = styled.main`
  background-color: ${({ theme }) => theme.bg0};
  padding: 8px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`

const FundSelectButtons = styled.div<FundSelectButtonsProps>`
  background-color: ${({ theme }) => theme.bg0};
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 300px;
  height: 60px;
  box-shadow: rgb(0 0 0 / 25%) 1px 1px 4px;
  border-radius: 15px;
  margin: 10px;
  button {
    width: 42%;
    height: 39px;
    border: 0;
    border-radius: 10px;
    font-size: 1rem;
    color: white;
    font-weight: 700;
  }
  button:nth-child(1) {
    background-color: ${(props) => (props.isAll === 'all' ? props.theme.primary1 : props.theme.bg0)};
    color: ${(props) => (props.isAll === 'all' ? props.theme.text5 : props.theme.text2)};
  }
  button:nth-child(2) {
    background-color: ${(props) => (props.isAll === 'all' ? props.theme.bg0 : props.theme.primary1)};
    color: ${(props) => (props.isAll === 'all' ? props.theme.text2 : props.theme.text5)};
  }
`

function PositionsLoadingPlaceholder() {
  return (
    <LoadingRows>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </LoadingRows>
  )
}

interface UseAllPositionsResults {
  loading: boolean
  allPositions: PositionDetails[] | undefined
}
interface FundSelectButtonsProps {
  readonly isAll: string
}
export default function Pool() {
  const useAllPositions = (): UseAllPositionsResults => {
    const allPositions = [
      {
        nonce: BigNumber.from('123412341234123412132353434'),
        tokenId: BigNumber.from('0x6615946c8343ed5a74559a'),
        operator: '0x0000000000000000000000000000000000000000',
        token0: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        token1: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
        fee: 500,
        tickLower: 195160,
        tickUpper: 197910,
        liquidity: BigNumber.from('123412341234123412132353434'),
        feeGrowthInside0LastX128: BigNumber.from('123412341234123412132353434'),
        feeGrowthInside1LastX128: BigNumber.from('123412341234123412132353434'),
        tokensOwed0: BigNumber.from('12312341234123412341213235343441234'),
        tokensOwed1: BigNumber.from('123412341234123412132353434'),
      },
    ]
    /**
     *   nonce: BigNumber
  tokenId: BigNumber
  operator: string
  token0: string
  token1: string
  fee: number
  tickLower: number
  tickUpper: number
  liquidity: BigNumber
  feeGrowthInside0LastX128: BigNumber
  feeGrowthInside1LastX128: BigNumber
  tokensOwed0: BigNumber
  tokensOwed1: BigNumber
     * 
     */
    const loading = false
    return { allPositions, loading }
  }
  // all position hooks

  const [isAll, setAll] = useState('all')
  // all, my 구분
  const clickFund = () => {
    if (isAll === 'all') setAll('my')
    else setAll('all')
  }

  const { account, chainId } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()

  const theme = useContext(ThemeContext)
  const [userHideClosedPositions, setUserHideClosedPositions] = useUserHideClosedPositions()

  const { positions, loading: positionsLoading } = useV3Positions(account)

  const { allPositions, loading: allPositionsLoading } = useAllPositions()
  // all position hooks

  const useisOpenOrClose = (positions: PositionDetails[] | undefined) => {
    return (
      positions?.reduce<[PositionDetails[], PositionDetails[]]>(
        (acc, p) => {
          acc[p.liquidity?.isZero() ? 1 : 0].push(p)
          return acc
        },
        [[], []]
      ) ?? [[], []]
    )
  }

  const [openPositions, closedPositions] = useisOpenOrClose(positions)
  const [openAllPositions, closedAllPositions] = useisOpenOrClose(allPositions)

  const filteredPositions = [...openPositions, ...(userHideClosedPositions ? [] : closedPositions)]
  const filteredAllPositions = [...openAllPositions, ...closedAllPositions]

  const showConnectAWallet = Boolean(!account)
  const showV2Features = Boolean(chainId && V2_FACTORY_ADDRESSES[chainId])

  console.log(filteredPositions)
  console.log(filteredAllPositions)
  const menuItems = [
    {
      content: (
        <MenuItem>
          <Trans>Create a pool</Trans>
          <PlusCircle size={16} />
        </MenuItem>
      ),
      link: '/add/ETH',
      external: false,
    },
    {
      content: (
        <MenuItem>
          <Trans>Migrate</Trans>
          <ChevronsRight size={16} />
        </MenuItem>
      ),
      link: '/migrate/v2',
      external: false,
    },
    {
      content: (
        <MenuItem>
          <Trans>V2 liquidity</Trans>
          <Layers size={16} />
        </MenuItem>
      ),
      link: '/pool/v2',
      external: false,
    },
    {
      content: (
        <MenuItem>
          <Trans>Learn</Trans>
          <BookOpen size={16} />
        </MenuItem>
      ),
      link: 'https://docs.uniswap.org/',
      external: true,
    },
  ]

  return (
    <>
      <PageWrapper>
        <SwapPoolTabs active={'pool'} />
        <AutoColumn gap="lg" justify="center">
          <AutoColumn gap="lg" style={{ width: '100%' }}>
            <TitleRow style={{ marginTop: '1rem' }} padding={'0'}>
              <ThemedText.Body fontSize={'20px'}>
                <Trans>Funds Overview</Trans>
              </ThemedText.Body>
              <ButtonRow>
                {/* {showV2Features && (
                  <Menu
                    menuItems={menuItems}
                    flyoutAlignment={FlyoutAlignment.LEFT}
                    ToggleUI={(props: any) => (
                      <MoreOptionsButton {...props}>
                        <ThemedText.Body style={{ alignItems: 'center', display: 'flex' }}>
                          <Trans>More</Trans>
                          <ChevronDown size={15} />
                        </ThemedText.Body>
                      </MoreOptionsButton>
                    )}
                  />
                )} */}
                <ResponsiveButtonPrimary id="join-pool-button" as={Link} to="/add/ETH">
                  + <Trans>New Position</Trans>
                </ResponsiveButtonPrimary>
              </ButtonRow>
            </TitleRow>

            <MainContentWrapper>
              <FundSelectButtons isAll={isAll}>
                <button onClick={clickFund}>
                  <Trans>My funds</Trans>
                </button>
                <button onClick={clickFund}>
                  <Trans>All funds</Trans>
                </button>
              </FundSelectButtons>
              {isAll === 'all' ? (
                allPositionsLoading ? (
                  <PositionsLoadingPlaceholder />
                ) : filteredAllPositions && filteredAllPositions.length > 0 ? (
                  <PositionList
                    positions={filteredAllPositions}
                    setUserHideClosedPositions={setUserHideClosedPositions}
                    userHideClosedPositions={userHideClosedPositions}
                  />
                ) : (
                  <NoLiquidity>
                    <ThemedText.Body color={theme.text3} textAlign="center">
                      <Inbox size={48} strokeWidth={1} style={{ marginBottom: '.5rem' }} />
                      <div>
                        <Trans>Your active V3 liquidity positions will appear here.</Trans>
                      </div>
                    </ThemedText.Body>
                    {!showConnectAWallet && closedAllPositions.length > 0 && (
                      <ButtonText
                        style={{ marginTop: '.5rem' }}
                        onClick={() => setUserHideClosedPositions(!userHideClosedPositions)}
                      >
                        <Trans>Show closed positions</Trans>
                      </ButtonText>
                    )}
                    {showConnectAWallet && (
                      <ButtonPrimary style={{ marginTop: '2em', padding: '8px 16px' }} onClick={toggleWalletModal}>
                        <Trans>Connect a wallet</Trans>
                      </ButtonPrimary>
                    )}
                  </NoLiquidity>
                )
              ) : positionsLoading ? (
                <PositionsLoadingPlaceholder />
              ) : filteredPositions && closedPositions && filteredPositions.length > 0 ? (
                <PositionList
                  positions={filteredPositions}
                  setUserHideClosedPositions={setUserHideClosedPositions}
                  userHideClosedPositions={userHideClosedPositions}
                />
              ) : (
                <NoLiquidity>
                  <ThemedText.Body color={theme.text3} textAlign="center">
                    <Inbox size={48} strokeWidth={1} style={{ marginBottom: '.5rem' }} />
                    <div>
                      <Trans>Your active V3 liquidity positions will appear here.</Trans>
                    </div>
                  </ThemedText.Body>
                  {!showConnectAWallet && closedPositions.length > 0 && (
                    <ButtonText
                      style={{ marginTop: '.5rem' }}
                      onClick={() => setUserHideClosedPositions(!userHideClosedPositions)}
                    >
                      <Trans>Show closed positions</Trans>
                    </ButtonText>
                  )}
                  {showConnectAWallet && (
                    <ButtonPrimary style={{ marginTop: '2em', padding: '8px 16px' }} onClick={toggleWalletModal}>
                      <Trans>Connect a wallet</Trans>
                    </ButtonPrimary>
                  )}
                </NoLiquidity>
              )}
            </MainContentWrapper>
            {/* <HideSmall>
              <CTACards />
            </HideSmall> */}
          </AutoColumn>
        </AutoColumn>
      </PageWrapper>
      <SwitchLocaleLink />
    </>
  )
}
