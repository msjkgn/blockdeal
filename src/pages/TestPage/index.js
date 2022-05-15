/* eslint-disable react/prop-types */
import { useFactoryContract, usePairContract2 } from 'hooks/useContract'
import React from 'react'
import styled from 'styled-components/macro'

export default function TestPage() {
  const factoryContract = useFactoryContract()
  const pairContract = usePairContract2()
  console.log('Pool/index: Factory Contract - ', factoryContract)
  console.log('Pool/index: Pair Contract    - ', pairContract)

  const [base, setBase] = React.useState(true)

  //TODO: support 2 decimal points
  const [amt, setAmount] = React.useState(0)
  const [chainLinkPrice, setChainLinkPrice] = React.useState(0)
  const [instantFillAmount, setInstantFillAmount] = React.useState(0)

  const [orderList, setOrderList] = React.useState([])

  console.log(orderList)
  React.useEffect(() => {
    //TODO: get chainlink price
    setChainLinkPrice('2909.23')
  }, []) // update every X seconds

  React.useEffect(() => {
    //TODO: get instant fill amount
    setInstantFillAmount('50')
  }, [base])

  React.useEffect(() => {
    //TODO: get order list
    let test = [
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

  const switchBase = (switchTo) => {
    console.log(switchTo)
    setBase(switchTo)
  }

  const add = async (amt) => {
    console.log('add')
    //Need address
    const tx = await pairContract.add(base, amt) // Can't test due to bug..
    console.log(tx)
  }

  const remove = async () => {
    console.log('remove')
    //Need address.. get pos from index.. need modal or popup to select cancel all or none - for now just cancel all
    const tx = await pairContract.remove('0xTest', 2, true) // Can't test due to bug.. inputs: (address owner, uint pos, bool cancel)
    console.log(tx)
  }

  //   const testButton = async () => {
  //     if (factoryContract) {
  //       const fundList = await factoryContract.feeTo()
  //       console.log('FundList: ', fundList)
  //     }
  //   }

  const OrderList = (props) => {
    const { orderList } = props
    return (
      <>
        {orderList.map((order, index) => {
          const { owner, base4Quote, amt, existingAddAmt } = order
          return (
            <>
              <div style={{ display: 'flex', padding: '15px 0 5px 0' }} key={index}>
                <div style={{ color: '#41CD01' }}>My order #{index + 1}</div>
                <button
                  onClick={remove}
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
                    {amt - existingAddAmt} / {amt} {base4Quote ? 'ETH' : 'USDT'}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>Filled Price</div>
                  <div>2800.82 USDT</div>
                </div>
              </div>
            </>
          )
        })}
      </>
    )
  }

  return (
    <div style={{ padding: '0px 10px', width: '100%' }}>
      <div style={{ display: 'flex', padding: '10px 0px' }}>
        <div style={{ fontSize: '22px', fontWeight: '600' }}>ETH/USDT</div>
        <div style={{ color: '#E8435A', marginLeft: 'auto' }}>{chainLinkPrice}</div>
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
          USDT {'>'} ETH
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
          ETH {'>'} USDT
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
        <div style={{ padding: '0 10px 0 0' }}>{base ? 'USDT' : 'ETH'}</div>
      </div>
      <div style={{ display: 'flex', padding: '5px 0', fontWeight: '300', fontSize: '14px' }}>
        <div>Expected Total:</div>
        <div style={{ marginLeft: 'auto' }}>
          {(amt / chainLinkPrice) * 0.995} {base ? 'ETH' : 'USDT'}
        </div>
      </div>
      <div style={{ display: 'flex', padding: '5px 0', fontWeight: '300', fontSize: '14px' }}>
        <div>Expected Total NOW:</div>
        <div style={{ marginLeft: 'auto' }}>
          {Math.min(instantFillAmount, amt)} {base ? 'ETH' : 'USDT'}
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
        Convert to {base ? 'ETH' : 'USDT'}
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
