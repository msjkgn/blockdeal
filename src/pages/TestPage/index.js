/* eslint-disable react/prop-types */
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useFactoryContract, usePairContract2, useWETHTest } from 'hooks/useContract'
import React from 'react'
import styled from 'styled-components/macro'

export default function TestPage() {
  const factoryContract = useFactoryContract()
  const pairContract = usePairContract2()
  // console.log('Pool/index: Factory Contract - ', factoryContract)
  // console.log('Pool/index: Pair Contract    - ', pairContract)

  const wethContract = useWETHTest()
  // console.log('Pool/index: wethContract     - ', wethContract)

  const { library, account, chainId } = useActiveWeb3React() // web3 react

  const [base, setBase] = React.useState(true)
  const [fee, setFee] = React.useState(0.005) // TODO: Get fee from backend.

  //TODO: setBase & setQuote based on current chain & selected pair
  const [baseCurrency, setBaseCurrency] = React.useState('WETH')
  const [quoteCurrency, setQuoteCurrency] = React.useState('USDT')

  //TODO: support 2 decimal points
  const [amt, setAmount] = React.useState(0)
  const [chainLinkPrice, setChainLinkPrice] = React.useState(0)
  const [instantFillAmount, setInstantFillAmount] = React.useState(0)

  const [orderList, setOrderList] = React.useState([])

  const chainLinkPriceFormatted = parseFloat(window._ethers.utils.formatUnits(chainLinkPrice, 8)).toFixed(2)

  //   React.useEffect(() => {
  //     async function getPairAddress() {
  //       let pairs
  //       if (factoryContract) {
  //         const feeTo = await factoryContract.feeTo()
  //         console.log('feeTo: ', feeTo)
  //         return await fac toryContract.allPairs(0)
  //       }

  //       return pairs
  //     }
  //     getPairAddress().then((result) => {
  //       console.log(result)
  //     })
  //     // setChainLinkPrice(price ? price : 0)
  //   }, [factoryContract]) // update every X seconds

  React.useEffect(() => {
    async function getChainlinkPrice() {
      if (pairContract) {
        let price = 0
        try {
          price = await pairContract.getPrice()
        } catch (e) {
          console.log(e)
        }
        //TODO: update every X seconds
        setChainLinkPrice(price)
      }
    }
    getChainlinkPrice()
  }, [])

  React.useEffect(() => {
    async function getFee() {
      if (pairContract) {
        try {
          let fee = await pairContract.fee()
          setFee(fee / 10000)
        } catch (e) {
          console.log(e)
        }
      }
    }
    getFee()
  }, [])

  React.useEffect(() => {
    async function _getFilledAmounts() {
      if (pairContract) {
        const fillAmount = await pairContract.getAmountAvailable(base)
        setInstantFillAmount(fillAmount)
      }
    }
    _getFilledAmounts()
  }, [base])

  //TODO: delay when fetching all data - should update while fetching.
  React.useEffect(() => {
    async function getOrders() {
      if (pairContract) {
        const orderCount = await pairContract.ownerOrderCount(account)
        let orderList = []
        for (let i = 0; i < orderCount; i++) {
          const order = await pairContract.orders(i)
          const pos = await pairContract.ownerOrderPos(account, i)
          const [cumulAmt, cumulAmtOut] = await pairContract.getFilledAmounts(pos.toString())
          orderList.push({
            order,
            pos,
            cumulAmt,
            cumulAmtOut,
          })
        }
        setOrderList(orderList)
      }
    }
    getOrders()
  }, [account])

  const switchBase = (switchTo) => {
    setBase(switchTo)
  }

  const add = async () => {
    // console.log('add')
    console.log(window._ethers.constants.MaxUint256.toString())
    //TODO: Check allowances to check if approval needed
    //TODO: ERC20 addresses should not be hard-coded
    const weiAmt = parseFloat(window._ethers.utils.parseUnits(amt, 'ether'))
    let allowance = await wethContract.allowance(account, '0x23a5258a20Aa8835E6193a9ecED36c1c201Ba06c')
    console.log('Allowance: ', allowance.toString(), '    weiAmt: ', weiAmt.toString())
    if (allowance.lt(weiAmt)) {
      // //TODO: Handle success & error
      let approveTx = await wethContract.approve(
        '0x23a5258a20Aa8835E6193a9ecED36c1c201Ba06c',
        window._ethers.constants.MaxUint256
      )
    }
    // //TODO: Handle success & error
    let tx = await pairContract.add(account, base, weiAmt)
  }

  const remove = async (pos) => {
    console.log('remove - pos: ', pos.toNumber())
    console.log('account: ', account)
    //need modal or popup to select cancel all or none - for now just cancel all
    const tx = await pairContract.remove(account, pos, true)
    console.log(tx)
  }

  const OrderList = (props) => {
    const { orderList } = props
    return (
      <>
        {orderList.map((_order, index) => {
          const { order, pos, cumulAmt, cumulAmtOut } = _order
          const [owner, base4Quote, amt, existingAmt] = order
          console.log('Order: ', index)
          console.log(pos.toNumber())
          console.log(window._ethers.utils.formatUnits(amt, 'ether'))
          return (
            <div key={index}>
              <div style={{ display: 'flex', padding: '15px 0 5px 0' }}>
                <div style={{ color: '#41CD01' }}>My order #{index + 1}</div>
                <button
                  onClick={() => {
                    remove(pos)
                  }}
                  style={{
                    marginLeft: 'auto',
                    padding: '5px 10px',
                    fontSize: '12px',
                    fontWeight: '400',
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
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>Filled Amount</div>
                  <div>
                    {parseFloat(cumulAmt)} / {window._ethers.utils.formatUnits(amt, 'ether')}{' '}
                    {base4Quote ? baseCurrency : quoteCurrency}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>Filled Price</div>
                  <div>
                    {window._ethers.constants.Zero.eq(cumulAmt)
                      ? '-'
                      : base4Quote
                      ? `${cumulAmt.div(cumulAmtOut)} ${baseCurrency}`
                      : `${cumulAmtOut.div(cumulAmt)} ${baseCurrency}`}
                  </div>
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
        <div style={{ fontSize: '22px', fontWeight: '600' }}>
          {baseCurrency}/{quoteCurrency}
        </div>
        <div style={{ color: '#E8435A', marginLeft: 'auto' }}>{chainLinkPriceFormatted}</div>
      </div>
      <div style={{ display: 'flex', padding: '10px 0' }}>
        <button
          onClick={() => switchBase(true)}
          style={{
            padding: '4px 6px',
            fontSize: '16px',
            fontWeight: '500',
            color: 'white',
            backgroundColor: `${base ? '#2EBD85' : '#29313D'}`,
            borderRadius: '4px',
            border: '1px solid #29313D',
          }}
        >
          {baseCurrency} {'>'} {quoteCurrency}
        </button>
        <button
          onClick={() => switchBase(false)}
          style={{
            padding: '4px 6px',
            fontSize: '16px',
            fontWeight: '500',
            color: 'white',
            backgroundColor: `${base ? '#29313D' : '#2EBD85'}`,
            borderRadius: '4px',
            border: '1px solid #29313D',
          }}
        >
          {quoteCurrency} {'>'} {baseCurrency}
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
          width: 'fit-content',
        }}
      >
        <Input type="number" value={amt} onChange={(e) => setAmount(e.target.value)} />
        <div style={{ padding: '0 10px 0 0' }}>{base ? baseCurrency : quoteCurrency}</div>
      </div>
      <div style={{ display: 'flex', padding: '5px 0', fontWeight: '300', fontSize: '14px' }}>
        <div>Expected Total:</div>
        <div style={{ marginLeft: 'auto' }}>
          {base ? amt * chainLinkPriceFormatted * (1 - fee) : (amt / chainLinkPriceFormatted) * (1 - fee)}{' '}
          {base ? quoteCurrency : baseCurrency}
        </div>
      </div>
      <div style={{ display: 'flex', padding: '5px 0', fontWeight: '300', fontSize: '14px' }}>
        <div>Expected Total NOW:</div>
        <div style={{ marginLeft: 'auto' }}>
          {Math.min(
            parseFloat(window._ethers.utils.formatUnits(instantFillAmount, 'ether')),
            base ? amt * chainLinkPriceFormatted : amt / chainLinkPriceFormatted
          ) *
            (1 - fee)}{' '}
          {base ? quoteCurrency : baseCurrency}
        </div>
      </div>
      <button
        onClick={add}
        style={{
          margin: '20px 0',
          padding: '10px 20px',
          fontSize: '18px',
          backgroundColor: '#2EBD85',
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

const Input = styled.input`
  color: white;
  font-size: 18px;
  padding: 10px;
  background: #29313d;
  border: none;
  text-align: right;
`
