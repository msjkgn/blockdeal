/* eslint-disable react/prop-types */
import { MaxUint256, Zero } from '@ethersproject/constants'
import { formatUnits, parseUnits } from '@ethersproject/units'
import { AutoColumn } from 'components/Column'
import { useInterval } from 'hooks/perfectFund/useInterval'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { usePairContract2, useUSDCContract, useWETHTest } from 'hooks/useContract'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import styled from 'styled-components/macro'

const Button = styled.button`
  margin-left: 5px;
  padding: 5px 10px;
  fontsize: 14px;
  fontweight: 400;
  backgroundcolor: #b28e24;
  border-radius: 4px;
  border: none;
  color: #212429;
  minwidth: 80px;
  cursor: pointer;
`
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  padding: 10px 0;
  background-color: #29313d;
  border-radius: 8px;
  width: 100%;
  :focus-within {
    div {
      font-weight: 700;
      margin-left: 10px;
      transition-duration: 0.2s;
    }
  }
`

const Input = styled.input`
  color: white;
  font-size: 18px;
  padding: 10px;
  background: ${({ theme }) => theme.bgCustom};
  border: none;
  text-align: right;
  width: 100%;
  :focus {
    outline: none;
    + div {
      font-size: 16px;
    }
    caret-color: gray;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  [type='number'] {
    -moz-appearance: textfield;
  }
`

const Order = styled.div`
  border-top: 1px solid #cccccc;
`
export default function TestPage() {
  const pairContract = usePairContract2()
  const wethContract = useWETHTest()
  const usdcContract = useUSDCContract()

  const { library, account, chainId } = useActiveWeb3React() // web3 react

  const [base, setBase] = useState<boolean>(false)
  const [fee, setFee] = React.useState(0.0005) // TODO: ***Get from backend***

  //TODO: setBase & setQuote based on current chain & selected pair
  const [baseCurrency, setBaseCurrency] = useState<string>('ETH')
  const [quoteCurrency, setQuoteCurrency] = useState<string>('USDC')

  const [amt, setAmount] = useState(0)
  const [chainLinkPrice, setChainLinkPrice] = useState<number>(0)
  const [instantFillAmount, setInstantFillAmount] = useState<number>(0) // TODO: ***Get from backend***
  const [ownerOrderList, setOwnerOrderList] = useState<any[]>([])

  const [baseDecimal, setBaseDecimal] = useState<number>(18)
  const [quoteDecimal, setQuoteDecimal] = useState<number>(6)

  useEffect(() => {
    async function getDecimals() {
      try {
        if (pairContract) {
          const baseDecimal = await pairContract.baseDecimal()
          setBaseDecimal(baseDecimal)
          const quoteDecimal = await pairContract.quoteDecimal()
          setQuoteDecimal(quoteDecimal)
        }
      } catch (e) {
        console.error(e)
      }
    }
    getDecimals()
  }, [])

  async function getChainlinkPrice() {
    try {
      if (pairContract) {
        const price = await pairContract.getPrice()
        setChainLinkPrice(price)
      }
    } catch (e) {
      setChainLinkPrice(0)
      console.error(e)
    }
  }

  useInterval(getChainlinkPrice, 2000)

  useEffect(() => {
    // async function getInstantFillAmount() {
    //   try {
    //     if (pairContract) {
    //       const amountAvailable = await pairContract.getAmountAvailable(base)
    //       console.log(amountAvailable.toString())
    //       setInstantFillAmount(amountAvailable)
    //     }
    //   } catch (e) {
    //     console.error(e)
    //   }
    // }
    // getInstantFillAmount()
  }, [base])

  const getOwnerOrders = async () => {
    try {
      if (pairContract) {
        const ownerOrderCount = await pairContract.ownerOrderCount(account)
        const ownerOrderList = []
        for (let i = 0; i < ownerOrderCount; i++) {
          const [active, pos] = await pairContract.ownerOrders(account, i)
          if (active) {
            const order = await pairContract.orders(pos)
            const { amt, base4Quote, existingAmt, owner, ownerOrderPos } = order
            const [cumulAmtIn, cumulAmtOut] = await pairContract.getFilledAmounts(pos)
            ownerOrderList.push({
              order,
              pos,
              cumulAmtIn,
              cumulAmtOut,
            })
          }
        }
        setOwnerOrderList(ownerOrderList)
      }
    } catch (e) {
      toast.error(' fail in get order list')
      console.error(e)
    }
  }

  useEffect(() => {
    if (ownerOrderList.length === 0) {
      getOwnerOrders()
    }
  }, [account]) // wallet address

  const switchBase = (switchTo: boolean) => {
    setBase(switchTo)
  }

  const add = async () => {
    try {
      //TODO: ERC20 addresses should not be hard-coded (get from pairContract)
      //TODO: Handle success & error
      if (pairContract && account) {
        console.log(base)
        if (base) {
          if (wethContract) {
            const weiAmt = parseFloat(parseUnits(amt.toString(), 'ether').toString())
            const allowance = await wethContract.allowance(account, pairContract.address)
            console.log(weiAmt, allowance)
            if (allowance.lt(weiAmt)) {
              const approveTx = await wethContract.approve(pairContract.address, MaxUint256)
            }
            const tx = await pairContract.add(account, base, weiAmt)
          }
        } else {
          if (usdcContract) {
            const ethAmt = parseFloat(parseUnits(amt.toString(), 6).toString())
            const allowance = await usdcContract?.allowance(account, pairContract.address)
            console.log(ethAmt, allowance)
            if (allowance?.lt(ethAmt)) {
              const approveTx = await usdcContract?.approve(pairContract.address, MaxUint256)
            }
            const tx = await pairContract.add(account, base, ethAmt)
          }
        }
      }
    } catch (e) {
      toast.error(' error in convert to USDC')
      console.error(e)
    }
  }

  const cancel = async (pos: number) => {
    toast.success('cancel button clicked')
    try {
      await pairContract?.remove(pos)
      toast.success(' Cancel success ')
    } catch (e) {
      toast.error(' Cancel fail ')
      console.error(e)
    }
  }

  const withdraw = async (pos: number) => {
    toast.success('withdraw button clicked')
    try {
      await pairContract?.settle(pos)
      toast.success(' withdraw success ')
    } catch (e) {
      toast.error(' withdraw fail ')
      console.error(e)
    }
  }

  const OwnerOrderList = ({ ownerOrderList }: { ownerOrderList: any[] }) => {
    return (
      <div style={{ marginTop: '20px', borderBottom: '1px solid #e7e7e7'}}>
        {ownerOrderList.map((_order, index) => {
          const { order, pos, cumulAmtIn, cumulAmtOut } = _order
          const { amt, base4Quote /*, existingAmt, owner, ownerOrderPos */ } = order
          return (
            <Order key={index}>
              <div style={{ display: 'flex', padding: '15px 0 0 0' }}>
                <div style={{ color: `${base4Quote ? '#FF6534' : '#2EBD85'}` }}>
                  {base4Quote ? baseCurrency : quoteCurrency} {'➔'} {base4Quote ? quoteCurrency : baseCurrency}
                </div>
                <div style={{ display: 'flex', marginLeft: 'auto' }}>
                  <Button
                    onClick={() => {
                      cancel(pos)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      withdraw(pos)
                    }}
                  >
                    Withdraw
                  </Button>
                </div>
              </div>
              <div style={{ display: 'flex', padding: '15px 0 15px 0' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', padding: '0 0 5px 0' }}>Filled/Total Qty</div>
                  <div style={{ fontSize: '14px' }}>
                    {formatUnits(cumulAmtIn, base4Quote ? baseDecimal : quoteDecimal)} /
                    {formatUnits(amt, base4Quote ? baseDecimal : quoteDecimal)}{' '}
                    {base4Quote ? baseCurrency : quoteCurrency}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                  <div style={{ fontWeight: 600, fontSize: '14px', padding: '0 0 5px 0' }}>Filled Price</div>
                  <div style={{ fontSize: '14px' }}>
                    {Zero.eq(cumulAmtIn)
                      ? '-'
                      : base4Quote
                      ? `${
                          (cumulAmtOut * Math.pow(10, baseDecimal)) / (cumulAmtIn * Math.pow(10, quoteDecimal))
                        } ${quoteCurrency}`
                      : `${
                          (cumulAmtIn * Math.pow(10, quoteDecimal)) / (cumulAmtOut * Math.pow(10, baseDecimal))
                        } ${quoteCurrency}`}
                  </div>
                </div>
              </div>
            </Order>
          )
        })}
      </div>
    )
  }
  const chainLinkPriceFormatted: any = parseFloat(formatUnits(chainLinkPrice, 8)).toFixed(2)

  return (
    <div>
      <div style={{ display: 'flex', padding: '10px 0px' }}>
        <div style={{ fontSize: '22px', fontWeight: 600 }}>
          {baseCurrency}/{quoteCurrency}
        </div>
        <div style={{ marginLeft: 'auto', height: 'auto', fontSize: '22px', fontWeight: 400 }}>
          {chainLinkPriceFormatted}
        </div>
      </div>
      <div style={{ display: 'flex', padding: '10px 0 20px' }}>
        <button
          onClick={() => switchBase(false)}
          style={{
            padding: '10px 10px',
            fontSize: '16px',
            fontWeight: 500,
            color: 'white',
            backgroundColor: `${base ? '#29313D' : '#2EBD85'}`,
            borderRadius: '4px',
            border: '0px solid',
          }}
        >
          {quoteCurrency} {'➔'} {baseCurrency}
        </button>
        <button
          onClick={() => switchBase(true)}
          style={{
            padding: '10px 10px',
            fontSize: '16px',
            fontWeight: 500,
            color: 'white',
            backgroundColor: `${base ? '#FF6534' : '#29313D'}`,
            borderRadius: '4px',
            border: '0px solid',
          }}
        >
          {baseCurrency} {'➔'} {quoteCurrency}
        </button>
      </div>
      <InputContainer>
        <Input
          type="number"
          value={amt}
          onChange={(e) => setAmount(parseFloat(e.target.value || '0'))}
          step={0.0001}
          placeholder={'0'}
        />
        <div style={{ padding: '0 10px 0 0', color: 'white' }}>{base ? baseCurrency : quoteCurrency}</div>
      </InputContainer>
      <div style={{ display: 'flex', padding: '10px 0', fontWeight: 300, fontSize: '14px' }}>
        <div style={{ fontWeight: 600 }}>Expected Current</div>
        <div style={{ marginLeft: 'auto' }}>
          {Math.min(
            parseFloat(formatUnits(instantFillAmount, base ? quoteDecimal : baseDecimal)),
            base ? amt * chainLinkPriceFormatted : amt / chainLinkPriceFormatted
          ) *
            (1 - fee)}{' '}
          {base ? quoteCurrency : baseCurrency}
        </div>
      </div>
      <div style={{ display: 'flex', padding: '0px 0', fontSize: '14px' }}>
        <div style={{ padding: '0px 0 0', fontWeight: 600 }}>Expected Total</div>
        <div style={{ padding: '0px 0 0', marginLeft: 'auto' }}>
          {((base ? amt * chainLinkPriceFormatted : amt / chainLinkPriceFormatted) * (1 - fee)).toFixed(4)}{' '}
          {base ? quoteCurrency : baseCurrency}
        </div>
      </div>

      <button
        onClick={add}
        style={{
          margin: '20px 0',
          padding: '10px 20px',
          fontSize: '18px',
          backgroundColor: `${base ? '#FF6534' : '#2EBD85'}`,
          borderRadius: '4px',
          border: 'none',
          color: 'white',
        }}
      >
        Convert
      </button>
      <OwnerOrderList ownerOrderList={ownerOrderList} />
    </div>
  )
}
