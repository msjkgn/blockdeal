import { Trans } from '@lingui/macro'
import React, { useState } from 'react'

import { ButtonPrimary } from '../../components/Button'
import { AutoColumn } from '../../components/Column'
import { RebalanceTabs } from '../../components/NavigationTabs'
import { RowBetween } from '../../components/Row'
import { ThemedText } from '../../theme'
import { PageWrapper, ResponsiveTwoColumns, ScrollablePage, Wrapper } from './styled'

const Rebalance = () => {
  const [hedgeAble, setHedgeAble] = useState(false)
  const [rebalanceAble, setRebalanceAble] = useState(false)

  return (
    <ScrollablePage>
      <PageWrapper wide={false}>
        <RebalanceTabs />
        <Wrapper>
          <ResponsiveTwoColumns wide={false}>
            <AutoColumn gap="lg">
              <AutoColumn gap="md">
                <RowBetween paddingBottom="20px">
                  <ThemedText.Label>
                    <Trans>Hedged ratio:</Trans>
                  </ThemedText.Label>
                </RowBetween>
                <RowBetween paddingBottom="20px">
                  <ThemedText.Label>
                    <Trans>can hedge?</Trans>
                  </ThemedText.Label>
                  <ThemedText.Label>
                    <Trans>{hedgeAble ? 'OK' : 'NO'}</Trans>
                  </ThemedText.Label>
                </RowBetween>
              </AutoColumn>
            </AutoColumn>
            <AutoColumn>
              <RowBetween>
                <ButtonPrimary>
                  <Trans>Hedge Only</Trans>
                </ButtonPrimary>
              </RowBetween>
            </AutoColumn>
            <RowBetween paddingBottom="20px">
              <ThemedText.Label>
                <Trans>can rebalance?</Trans>
              </ThemedText.Label>
              <ThemedText.Label>
                <Trans>{rebalanceAble ? 'OK' : 'NO'}</Trans>
              </ThemedText.Label>
            </RowBetween>
            <AutoColumn>
              <RowBetween>
                <ButtonPrimary>
                  <Trans>Rebalance</Trans>
                </ButtonPrimary>
              </RowBetween>
            </AutoColumn>
          </ResponsiveTwoColumns>
        </Wrapper>
      </PageWrapper>
    </ScrollablePage>
  )
}

export default Rebalance
