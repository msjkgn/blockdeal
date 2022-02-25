import React from 'react';
import styles from './Pools.module.css'
import styled from 'styled-components';
import { style } from 'styled-system';

const Container = styled.div`
  background-color: ${({theme}) => theme.bg0}
  max-width: 500px;
  border-radius: 10px;
  padding: 24px 20px;
`

const Statment = styled.div`
  color: ${({ theme }) => theme.text1};
  box-sizing: border-box;
  margin: 0px 0px 20px;
  min-width: 0px;
  font-weight: 400;
  font-size: 16px;
`;

const NavLink = styled.nav`
  display:flex;
  justify-content: space-around; 
  box-shadow: rgb(0 0 0 / 25%) 1px 1px 4px;

  width:350px;
  height: 60px;
  border-radius: 16px;
  padding:5px;
  background-color: ${({theme}) => theme.bg0}
`

const NavLinkBtn = styled.span`
  display:flex;
  width: 150px;
  height: 50px;
  justify-content:center;
  align-items:center;
  background-color: ${({theme}) => theme.bg1}
  color: ${({theme}) => theme.text1}
  webkit-box-align: center;
  background-color: transparent;
  border-radius: 12px;
  color: rgb(87, 90, 104);
  cursor: pointer;
  display: flex;
  height: 100%;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 0px 38px;
  transition: background-color 0.15s linear 0s;
  font-weight:700;
  :nth-child(2) {
    background-color: ${({theme}) => theme.bg2}
    color: ${({theme}) => theme.text2}
  }
`

const SelectTokenNav = styled.div`
  display:flex;
  justify-content: space-between;
  padding:15px;
  width:100%;
  height: 80px;
  border-radius: 10px;
  background-color: ${(({theme}) => theme.bg1)}
  margin-top:20px;
`

const SelectBox = styled.select`
  background-color: ${(({theme}) => theme.bg0)}
  width: 80px;
  height:40px;
  border:0;
  border-radius:10px;
  padding:10px;
  color: ${(({theme}) => theme.text1)}
`

const PoolsList = styled.ul`
  width: 100%;
  height: auto;
  background-color: ${(({theme}) => theme.bg0)}
  list-style: none;
  padding:0;

  > li {
    display:flex;
    align-items:center;
    justify-content:space-around;
    width:100%;
    margin:10px 0;
    ${(({theme}) => theme.bg0)};
    border:1px solid #cccccc;
    border-radius:5px;
    padding:5px;
    > span{
      display:flex;
      align-items:center;
      justify-content:space-between;
      width:40%;
      > p:nth-child(3) {
        font-weight:700;
        margin-left:10px;
      }
      > p:nth-child(4){
        background-color: #cccccc;
        padding:3px;
        border-radius:3px;
        color: ${(({theme}) => theme.text1)}
        margin-left:10px;
      }
    }
    > button {
      width:20%;
      height:30px;
      border:0;
      background-color:rgb(252, 21, 123);
      border-radius: 10px;
      color: white;
      font-weight:700;e
    }
  }
`



const Pools = () => {
  return <Container>
    <div className={styles.title_container}>
      <h2 className={styles.title}>G-Uni Pools</h2>
      <button className={styles.add_pool_button}>+</button>
    </div>
    <Statment> Automated Liquidity Provision Management on Uniswap v3. More Info <a href="#">here</a></Statment>
    <NavLink>
      <NavLinkBtn >My Pools</NavLinkBtn>
      <NavLinkBtn>All Pools</NavLinkBtn>
    </NavLink>
    <SelectTokenNav>
      <button className={styles.select_box_token}>Select a token</button>
      <span className={styles.select_box_container}>
        <label htmlFor="#" className={styles.sort_by}>sort by</label>
        <SelectBox>
          <option value="">TVL</option>
        </SelectBox>
      </span>

    </SelectTokenNav>
    <PoolsList>
      <li>
        <span>
          <img src="#"></img>
          <img src="#"></img>
          <p>
            DAI/USDC
          </p>
          <p>0.01%</p>
        </span>
        <button>View</button>
      </li>
      <li>
        <span>
          <img src="#"></img>
          <img src="#"></img>
          <p>
            DAI/USDC
          </p>
          <p>0.01%</p>
        </span>
        <button>View</button>
      </li>
      <li>
        <span>
          <img src="#"></img>
          <img src="#"></img>
          <p>
            DAI/USDC
          </p>
          <p>0.01%</p>
        </span>
        <button>View</button>
      </li>
      <li>
        <span>
          <img src="#"></img>
          <img src="#"></img>
          <p>
            DAI/USDC
          </p>
          <p>0.01%</p>
        </span>
        <button>View</button>
      </li>
      <li>
        <span>
          <img src="#"></img>
          <img src="#"></img>
          <p>
            DAI/USDC
          </p>
          <p>0.01%</p>
        </span>
        <button>View</button>
      </li>
    </PoolsList>
    <div className={styles.prev_next_container}>
      <span>{'<-'}</span>
      <span>{'->'}</span>
    </div>
    
  </Container>
  

}

export default Pools;