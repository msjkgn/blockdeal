import React from 'react';
import styles from './addLiquidity.module.css';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Dropdown from '../../assets/images/dropdown.svg';


const Container = styled.div`
  background-color: ${({theme}) => theme.bg0}
  width: 500px;
  border-radius: 10px;
  padding: 24px 20px;
`

const Balance = styled.section`
  background-color:  ${({theme}) => theme.bg1}
  padding:10px;
  border-radius:10px;

`

const AddLiquidity = () => {
  const {id} = useParams<{id: string}>()
  console.log(Dropdown)
  
  return <Container>
    <div className={styles.title_container}>
      <h2 className={styles.title}>Add Liquidity to {id}</h2>
    </div>    
    <div className={styles.pool_info}>
      <p>Your Current Position</p>
      <p>$0.00</p>
    </div>
    <div className={styles.pool_info}>
      <p>Deposit</p> 
    </div>
    <Balance>
      <div className={styles.liquidity_info}>
        <span>
          <img src='#' alt='coin'/>
          <p>DAI</p>
        </span>
        <input placeholder='0.0' type={'number'}/>
      </div>
      <div className={styles.balance_info}>
        <p>Balance: 0DAI(~$0,00) <p>(MAX)</p></p>
        <p>$ -</p>
      </div>
    </Balance>
    <div>
      <p>New Deposit Amount</p>
      <p>$0.00</p>
    </div>
    <div>
      <p>Your New Position</p>
      <p>$0.00</p>
    </div>
    <button><img src='#' alt=''/>Add Liquidity</button>
  </Container>

}

export default AddLiquidity;