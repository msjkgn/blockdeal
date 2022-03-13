import React from 'react';
import styled from 'styled-components';


const BalanceComponent = styled.section`
  background-color:  ${({theme}) => theme.bg1}
  padding:10px;
  border-radius:10px;
  
  div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    span{
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: ${({theme}) => theme.bg2}
      padding:5px;
      border-radius: 10px;
      width: 100px;
    }
    
    p{
      margin: 0;
    }
  
    input{
      background-color: transparent;
      border:none;
      text-align: right;
      font-size: 1.1rem;
      color:gray;
      font-weight: 700;
    }
    
    input:focus{
      color:white;
      font-weight: 700;
    }
  
  }


  div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    p:nth-child(1){
      color: gray;
      font-size: 0.8rem;
    }
  }


`
const Balance = () => {

  return <BalanceComponent>
  <div>
    <span>
      <img src='#' alt='coin'/>
      <p>DAI</p>
    </span>
    <input placeholder='0.0' type={'number'}/>
  </div>
  <div>
    <p>Balance: 0DAI(~$0,00) <p>(MAX)</p></p>
    <p>$ -</p>
  </div>
</BalanceComponent>
}

export default Balance;