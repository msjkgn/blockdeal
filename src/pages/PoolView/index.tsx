import React from 'react';
import styles from './PoolView.module.css';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Dropdown from '../../assets/images/dropdown.svg';


const Container = styled.div`
  background-color: ${({theme}) => theme.bg0}
  width: 500px;
  border-radius: 10px;
  padding: 24px 20px;
`



const PoolView = () => {
  const {id} = useParams<{id: string}>()
  console.log(Dropdown)
  
  
  
  return <Container>
    <div className={styles.title_container}>
      <h2 className={styles.title}>{id}</h2>
    </div>
    <div className={styles.pool_info}>
      <p>Total value($)</p>
      <p>$271,123,123,</p>
    </div>
    <div className={styles.pool_info}>
      <p>APR</p>
      <p>~81%</p>
    </div>
    <div className={styles.pool_info}>
      <p>Fees earned(Pool)</p>
      <p>$271,123,123,</p>
    </div>
    
    <div className={styles.graphic}>
      <div className={styles.pool_status}>
        <p>Pool Status</p>
        <span>
          <span>DAI-USDC</span>
          <span>USDC-DAI</span>
        </span>
        <img src={Dropdown} alt='드롭다운 아이콘' width='18px' className={styles.dropdown_icn}/>
      </div>
    </div>
    <div className={styles.pool_info}>
      <p>Your pool position</p>
      <p>$0</p>
    </div>
    <div className={styles.pool_info}>
      <p>your wallet balance</p>
      <p>0 DAI / 0 USDC</p>
    </div>
    <button>Add Liquidity</button>
    <button>Remove Liquidity</button>
  </Container>
  

}

export default PoolView;