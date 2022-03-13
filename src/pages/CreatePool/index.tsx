import React from 'react';
import styles from './createPool.module.css';
import styled from 'styled-components';



const Container = styled.div`
  background-color: ${({theme}) => theme.bg0}
  width: 500px;
  border-radius: 10px;
  padding: 24px 20px;
`

const SelectButton = styled.button`
  width:100%;
  height:40px;
  border:none;
  border-radius: 10px;
  background-color: ${({theme}) => theme.primary1}
  color: ${({theme}) => theme.text5}
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0 20px;
`

const GraySelectButton = styled(SelectButton)`
  background-color: ${({theme}) => theme.bg1}
  color: ${({theme}) => theme.text1}
`

const FeeTier = styled.ul`
  width:100%;
  list-style:none;
  background-color: ${({theme}) => theme.bg1}
  border:2px solid ${({theme}) => theme.bg2}
  border-radius: 10px;
  padding: 20px 20px;

  li:nth-child(1){
    margin-top:0;
  }
  li{
    margin-top: 30px;
  }
`


const CreatePool = () => {  
  return <Container>
    <div className={styles.title_container}>
      <h2 className={styles.title}>Create new pool</h2>
    </div>    
    <p>Select Token to create pool</p>
    <SelectButton>
      select a token
    </SelectButton>
    <p>Fee tier</p>
    <GraySelectButton>
      Select
    </GraySelectButton>
    <FeeTier>
      <li>0.05%</li>
      <li>0.1%</li>
      <li>0.3%</li>
    </FeeTier>
    <button>create</button>
  </Container>

}

export default CreatePool;