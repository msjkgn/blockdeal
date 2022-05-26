/* eslint-disable react/prop-types */
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useFactoryContract, usePairContract2, useWETHTest } from 'hooks/useContract'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
interface Test {
  owner: string
  base4Quote: boolean
  amt: string
  existingAddAmt: string
}
const Input = styled.input`
  color: white;
  font-size: 18px;
  padding: 10px;
  background: ${({ theme }) => theme.bgCustom};
  border: none;
  text-align: right;
  width:100%;
`
export default function TestPage() {
  const factoryContract = useFactoryContract()
  const pairContract = usePairContract2()
  console.log('Pool/index: Factory Contract - ', factoryContract)
  console.log('Pool/index: Pair Contract    - ', pairContract)

  const wethContract = useWETHTest()
  console.log('Pool/index: wethContract     - ', wethContract)
  console.log(wethContract?.address)

  const { library, account, chainId } = useActiveWeb3React() // web3 react

  const [base, setBase] = useState<boolean>(true)

  //TODO: setBase & setQuote based on current chain & selected pair
  const [baseCurrency, setBaseCurrency] = useState<string>('WETH')
  const [quoteCurrency, setQuoteCurrency] = useState<string>('USDC')

  //TODO: support 2 decimal points
  const [amt, setAmount] = useState(0)
  const [chainLinkPrice, setChainLinkPrice] = useState<string>('0')
  const [instantFillAmount, setInstantFillAmount] = useState<number>(0)

  const [orderList, setOrderList] = useState<Test[]>([])

  //const useGetChainLink = () => {}
  //   React.useEffect(() => {
  //     async function getPairAddress() {
  //       let pairs
  //       if (factoryContract) {
  //         const feeTo = await factoryContract.feeTo()
  //         console.log('feeTo: ', feeTo)
  //         return await factoryContract.allPairs(0)
  //       }

  //       return pairs
  //     }
  //     getPairAddress().then((result) => {
  //       console.log(result)
  //     })
  //     // setChainLinkPrice(price ? price : 0)
  //   }, [factoryContract]) // update every X seconds

  useEffect(() => {
    async function getChainlinkPrice() {
      if (pairContract) {
        const price = await pairContract.getPrice()
        //TODO: update every X seconds
        console.log(parseInt(price.toString()))
        setChainLinkPrice(String(price ? (parseInt(price.toString()) / 100000000).toFixed(2) : 0))
      }
    }
    getChainlinkPrice()
  }, [pairContract])

  useEffect(() => {
    //TODO: get instant fill amount
    // setInstantFillAmount('50')
  }, [base])

  useEffect(() => {
    //TODO: get order list
    const test: Test[] = [
      {
        owner: '0xTest',
        base4Quote: false,
        amt: '3000.00',
        existingAddAmt: '2300.00',
      },
      {
        owner: '0xTest',
        base4Quote: false,
        amt: '9000.00',
        existingAddAmt: '1400.00',
      },
    ]
    setOrderList(test)
  }, []) // wallet address

  const switchBase = (switchTo: boolean) => {
    console.log(switchTo)
    setBase(switchTo)
  }

  const add = async () => {
    console.log('add')
    console.log(account, base, amt * Math.pow(10, 9))
    const txn = {
      to: pairContract?.address,
      data: { owner: account, base4Quote: base, amt: amt * Math.pow(10, 18) },
      value: '0x0',
    }
    console.log(await pairContract?.baseAddress())
    console.log(await pairContract?.baseDecimal())
    console.log(await pairContract?.orders(1))
    const approveTx = await wethContract?.approve('0xB3B994d44d11509f3f45A279A9B732e92cE0363F', amt * Math.pow(10, 16))
    console.log(approveTx)

    const tx = await pairContract?.add(account, base, amt * Math.pow(10, 16))
    console.log(tx)

    // let contract = window.web3.eth.Contract(PAIR_ABI, '0xB3B994d44d11509f3f45A279A9B732e92cE0363F')
    // console.log(contract)
    // library
    //   .getSigner()
    //   .estimateGas(txn)
    //   .then((estimate) => {
    //     const newTxn = {
    //       ...txn,
    //       gasLimit: calculateGasMargin(estimate),
    //     }

    //     return library
    //       .getSigner()
    //       .sendTransaction(newTxn)
    //       .then((response) => {
    //         console.log(response)
    //         // setAttemptingTxn(false)
    //         // addTransaction(response, {
    //         //   type: TransactionType.ADD_LIQUIDITY_V3_POOL,
    //         //   baseCurrencyId: currencyId(baseCurrency),
    //         //   quoteCurrencyId: currencyId(quoteCurrency),
    //         //   createPool: Boolean(noLiquidity),
    //         //   expectedAmountBaseRaw: parsedAmounts[Field.CURRENCY_A]?.quotient?.toString() ?? '0',
    //         //   expectedAmountQuoteRaw: parsedAmounts[Field.CURRENCY_B]?.quotient?.toString() ?? '0',
    //         //   feeAmount: position.pool.fee,
    //         // })
    //         // setTxHash(response.hash)
    //         // ReactGA.event({
    //         //   category: 'Liquidity',
    //         //   action: 'Add',
    //         //   label: [currencies[Field.CURRENCY_A]?.symbol, currencies[Field.CURRENCY_B]?.symbol].join('/'),
    //         // })
    //       })
    //   })
    //   .catch((error) => {
    //     console.error('Failed to send transaction', error)
    //     // setAttemptingTxn(false)
    //     // we only care if the error is something _other_ than the user rejected the tx
    //     if (error?.code !== 4001) {
    //       console.error(error)
    //     }
    //   })
    // const tx = await pairContract.add(account, base, amt * Math.pow(10, 18))
    // console.log(tx)
  }

  const remove = async () => {
    console.log('remove')
    //get pos from index.. need modal or popup to select cancel all or none - for now just cancel all
    const tx = await pairContract?.remove('0xTest', 2, true) // Can't test due to bug.. inputs: (address owner, uint pos, bool cancel)
    console.log(tx)
  }

  const testButton = async () => {
    if (factoryContract) {
      const feeTo = await factoryContract.feeTo()
      console.log('feeTo: ', feeTo)
    }
  }

  const OrderList = ({ orderList }: { orderList: Test[] }) => {
    return (
      <>
        {orderList.map((order, index) => {
          const { owner, base4Quote, amt, existingAddAmt } = order
          return (
            <div key={index}>
              <div style={{ display: 'flex', padding: '40px 0 5px 0' }}>
                <div style={{ color: `${base ? '#FF6534' : '#2EBD85'}` }}>My order #{index + 1}</div>
                <button
                  onClick={testButton}
                  style={{
                    marginLeft: 'auto',
                    padding: '5px 10px',
                    fontSize: '12px',
                    fontWeight: 400,
                    backgroundColor: '#666666',
                    borderRadius: '4px',
                    border: 'none',
                    color: 'white',
                  }}
                >
                  Cancel / Complete
                </button>
              </div>
              <div style={{ display: 'flex' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>Filled Amount</div>
                  <div>
                    {parseInt(amt) - parseInt(existingAddAmt)} / {amt} {base4Quote ? baseCurrency : quoteCurrency}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>Filled Price</div>
                  <div>2800.82 {base4Quote ? baseCurrency : quoteCurrency}</div>
                </div>
              </div>
            </div>
          )
        })}
      </>
    )
  }

  return (
    <div style={{ padding: '0px 10px', width: '100%', maxWidth: '400px' }}>
      <div style={{ display: 'flex', padding: '10px 0px' }}>
        <div style={{ fontSize: '22px', fontWeight: 600 }}>
          {baseCurrency}/{quoteCurrency}
        </div>
        <div style={{ color: '#E8435A', marginLeft: 'auto' }}>{chainLinkPrice}</div>
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
            borderRadius: '2px',
            border: '0px solid',
          }}
        >
          {quoteCurrency} {'>'} {baseCurrency}
        </button>
        <button
          onClick={() => switchBase(true)}
          style={{
            padding: '10px 10px',
            fontSize: '16px',
            fontWeight: 500,
            color: 'white',
            backgroundColor: `${base ? '#FF6534' : '#29313D'}`,
            borderRadius: '2px',
            border: '0px solid',
          }}
        >
          {baseCurrency} {'>'} {quoteCurrency}
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyItems: 'center',
          padding: '10px 0',
          backgroundColor: '#29313D',
          borderRadius: '8px',
          width: '100%',
        }}
      >
        <Input type="number" value={amt} onChange={(e) => setAmount(parseInt(e.target.value))} />
        <div style={{ padding: '0 10px 0 0', color:'white' }}>{base ? baseCurrency : quoteCurrency}</div>
      </div>
      <div style={{ display: 'flex', padding: '5px 0', fontWeight: 300, fontSize: '14px' }}>
        <div style={{ padding: '5px 0 0' }}>Expected Total:</div>
        <div style={{ padding: '5px 0 0', marginLeft: 'auto' }}>
          {base ? amt * parseInt(chainLinkPrice) : (amt / parseInt(chainLinkPrice))}{' '}
          {base ? quoteCurrency : baseCurrency}
        </div>
      </div>
      <div style={{ display: 'flex', padding: '5px 0', fontWeight: 300, fontSize: '14px' }}>
        <div>Expected Total NOW:</div>
        <div style={{ marginLeft: 'auto' }}>
          {Math.min(instantFillAmount, amt)} {base ? quoteCurrency : baseCurrency}
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
        Convert to {base ? quoteCurrency : baseCurrency}
      </button>
      <OrderList orderList={orderList} />
    </div>
  )
}
