/* eslint-disable react/prop-types */
import { AutoColumn } from 'components/Column'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useFactoryContract, usePairContract2, useWETHTest } from 'hooks/useContract'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import styled from 'styled-components/macro'

interface Test {
  owner: string
  base4Quote: boolean
  amt: string
  existingAddAmt: string
}

const PageWrapper = styled(AutoColumn)`
  padding: 0 10px;
  width: 100%;
  max-width: 350px;
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
  const factoryContract = useFactoryContract()
  const pairContract = usePairContract2()

  // console.log('Pool/index: Factory Contract - ', factoryContract)
  // console.log('Pool/index: Pair Contract    - ', pairContract)

  const wethContract = useWETHTest()
  // console.log('Pool/index: wethContract     - ', wethContract)
  // console.log(wethContract?.address)

  const { library, account, chainId } = useActiveWeb3React() // web3 react

  const [base, setBase] = useState<boolean>(false)

  //TODO: setBase & setQuote based on current chain & selected pair
  const [baseCurrency, setBaseCurrency] = useState<string>('ETH')
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

  function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef<any>() // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

    useEffect(() => {
      savedCallback.current = callback // callback이 바뀔 때마다 ref를 업데이트 해준다.
    }, [callback, pairContract])

    useEffect(() => {
      function tick() {
        savedCallback.current() // tick이 실행되면 callback 함수를 실행시킨다.
      }
      if (delay !== null) {
        // 만약 delay가 null이 아니라면
        const id = setInterval(tick, delay) // delay에 맞추어 interval을 새로 실행시킨다.
        return () => clearInterval(id) // unmount될 때 clearInterval을 해준다.
      }
      return
    }, [delay]) // delay가 바뀔 때마다 새로 실행된다.
  }

  async function getChainlinkPrice() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    try {
      if (pairContract) {
        const price = await pairContract.getPrice()
        //TODO: update every X seconds
        // console.log(parseInt(price.toString()))
        setChainLinkPrice(String(price ? (parseInt(price.toString()) / 100000000).toFixed(2) : 0))
        // toast.success(' price fetch success ')
      }
    } catch (e) {
      // toast.error(' price fetch error ')
      setChainLinkPrice('0')
      console.error(e)
    }
  }
  // toast.success('가격 불러오기 성공')

  // const getChainLinkPriceInterval = setChainLinkPriceParam => new Promise((resolve, rej) => {
  //   const interval = setInterval(() => {
  //     setChainLinkPriceParam()
  //   })
  // })

  useInterval(getChainlinkPrice, 2000)

  useEffect(() => {
    //TODO: get instant fill amount
    // setInstantFillAmount('50')
  }, [base])

  const getOrders = async () => {
    try {
      if (pairContract) {
        const orderCount = await pairContract?.orderCount()
        const orders = []
        console.log(orderCount, 'orders data fetch')
        for (let i = 0; i < orderCount; i++) {
          orders.push({ ...(await pairContract.orders(i)) })
        }

        console.log(orders)

        // console.log(await pairContract.orders(orderCount))
        // console.log(await pairContract.orders(0))
        // console.log(await pairContract.orders(1))
        // console.log(await pairContract.orders(2))
        // console.log(await pairContract.orders(3))
        // console.log(await pairContract.orders(4))
        setOrderList(orders)
        toast.success(' order list get success ')
      }
      // get order list
    } catch (e) {
      toast.error(' fail in get order list')
      console.error(e)
    }
  }

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
    if (orderList.length === 0) {
      // setOrderList(test)
      getOrders()
    }
    // try {
    //   if(pairContract){
    //     const data = await pairContract.orders()
    //   }
    //   // get order list
    //   toast.success(' order list get success ')
    // } catch (e) {
    //   toast.error(' fail in get order list')
    //   console.error(e)
    // }
    // setOrderList(test)
  }, [pairContract, orderList]) // wallet address

  const switchBase = (switchTo: boolean) => {
    // console.log(switchTo)
    setBase(switchTo)
  }

  const add = async () => {
    try {
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
      const approveTx = await wethContract?.approve(
        '0xB3B994d44d11509f3f45A279A9B732e92cE0363F',
        amt * Math.pow(10, 16)
      )
      console.log(approveTx)

      const tx = await pairContract?.add(account, base, amt * Math.pow(10, 16))
      console.log(tx)
      toast.success(' success in convert to USDC')
      // eslint-disable-next-line no-restricted-globals
      location.href = location.href
    } catch (e) {
      toast.error(' error in convert to USDC')
      console.error(e)
    }

    // let contract = window.web3.eth.Contract(PAIR_ABI, '0xB3B994d44d11509f3f45A279A9B732e92cE0363F')
    // library
    //   .getSigner()
    //   .estimateGas(txn)
    //   .then((estimate) => {~
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
    toast.success('remove button clicked')
    //get pos from index.. need modal or popup to select cancel all or none - for now just cancel all
    try {
      const tx = await pairContract?.remove('0xTest', 2, true) // Can't test due to bug.. inputs: (address owner, uint pos, bool cancel)
      console.log(tx)
      toast.success(' remove success ')
    } catch (e) {
      toast.error(' remove failed ')
      console.error(e)
    }
  }

  const removeWithoutCancel = async () => {
    toast.success('removeWithoutCancel button clicked')
    //get pos from index.. need modal or popup to select cancel all or none - for now just cancel all
    try {
      const tx = await pairContract?.remove('0xTest', 2, false) // Can't test due to bug.. inputs: (address owner, uint pos, bool cancel)
      console.log(tx)
      toast.success(' remove success ')
    } catch (e) {
      toast.error(' remove failed ')
      console.error(e)
    }
  }

  const OrderList = ({ orderList }: { orderList: Test[] }) => {
    // console.log(orderList, 'orderList in component')
    return (
      <div style={{ marginTop: '20px', borderBottom: '1px solid #cccccc'}}>
        {orderList.map((order, index) => {
          const { /* owner, */ base4Quote, amt, existingAddAmt } = order
          // console.log(owner, 'orderList owner')
          // console.log(base4Quote, 'orderList base4Quote')
          // console.log(amt, 'orderList amt')
          // console.log(existingAddAmt, 'orderList existingAddAmt')
          return (
            <Order key={index}>
              <div style={{ display: 'flex', padding: '15px 0 0 0' }}>
                <div style={{ color: `${base4Quote ? '#FF6534' : '#2EBD85'}` }}>
                  {base4Quote ? baseCurrency : quoteCurrency} {'➔'} {base4Quote ? quoteCurrency : baseCurrency}
                </div>
                <button
                  onClick={remove}
                  style={{
                    marginLeft: 'auto',
                    padding: '5px 10px',
                    fontSize: '14px',
                    fontWeight: 400,
                    backgroundColor: '#666666',
                    borderRadius: '4px',
                    border: 'none',
                    color: 'white',
                    minWidth: '80px',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={removeWithoutCancel}
                  style={{
                    marginLeft: 'auto',
                    padding: '5px 10px',
                    fontSize: '14px',
                    fontWeight: 400,
                    backgroundColor: '#666666',
                    borderRadius: '4px',
                    border: 'none',
                    color: 'white',
                    minWidth: '80px',
                  }}
                >
                  Withdraw
                </button>
              </div>
              <div style={{ display: 'flex', padding: '15px 0 15px 0' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', padding: '0 0 5px 0' }}>Filled/Total Qty</div>
                  <div style={{ fontSize: '14px' }}>
                    {parseInt(amt) - parseInt(existingAddAmt)}/{parseInt(amt)}{' '}
                    {base4Quote ? baseCurrency : quoteCurrency}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                  <div style={{ fontWeight: 600, fontSize: '14px', padding: '0 0 5px 0' }}>Filled Price</div>
                  <div style={{ fontSize: '14px' }}>2800.82</div>
                </div>
              </div>
            </Order>
          )
        })}
      </div>
    )
  }

  return (
    <PageWrapper>
      <div style={{ display: 'flex', padding: '10px 0px' }}>
        <div style={{ fontSize: '22px', fontWeight: 600 }}>
          {baseCurrency}/{quoteCurrency}
        </div>
        <div style={{ marginLeft: 'auto', height: 'auto', fontSize: '22px', fontWeight: 400 }}>{chainLinkPrice}</div>
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
            borderRadius: '0px',
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
            borderRadius: '0px',
            border: '0px solid',
          }}
        >
          {baseCurrency} {'➔'} {quoteCurrency}
        </button>
      </div>
      <InputContainer>
        <Input
          type="number"
          // value={amt}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          step={0.0001}
          placeholder={'0'}
        />
        <div style={{ padding: '0 10px 0 0', color: 'white' }}>{base ? baseCurrency : quoteCurrency}</div>
      </InputContainer>
      <div style={{ display: 'flex', padding: '10px 0', fontWeight: 300, fontSize: '14px' }}>
        <div style={{ fontWeight: 600 }}>Expected Current</div>
        <div style={{ marginLeft: 'auto' }}>
          {Math.min(instantFillAmount, amt) || 0} {base ? quoteCurrency : baseCurrency}
        </div>
      </div>
      <div style={{ display: 'flex', padding: '0px 0', fontSize: '14px' }}>
        <div style={{ padding: '0px 0 0', fontWeight: 600 }}>Expected Total</div>
        <div style={{ padding: '0px 0 0', marginLeft: 'auto' }}>
          {(parseInt(chainLinkPrice) === 0
            ? 0
            : base
            ? amt * parseInt(chainLinkPrice)
            : amt / parseInt(chainLinkPrice)) || 0}{' '}
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
      <OrderList orderList={orderList} />
    </PageWrapper>
  )
}
