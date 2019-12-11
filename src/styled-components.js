import styled from 'styled-components';

export const Container = styled.div`

  @import url(//fonts.googleapis.com/css?family=Lato);
    
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #3AAFA9;
  font-family: 'Lato', sans-serif;
  box-sizing: border-box;
  overflow: hidden;
  
  div:nth-child(0) {
    margin-bottom: 50px;
    text-align: center;
   
    h3 {
      margin-bottom: 10px;
    }
  }
  
`;

export const GameControls = styled.div`
    width: 242px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const PlayerStatus = styled.div`
    display: flex;
    align-items: center;
    font-size: 30px;
    padding-left: 10px;
    background-color: ${({ active }) => active ? '#DEF2F1': '#3AAFA9'};
    width: 100px;
    height: 40px;
`;


export const GameBoardContainer = styled.div`
    display: grid;
    grid-template-columns: 80px 80px 80px;
    grid-template-rows: 80px 80px 80px;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    justify-items: stretch;
    background-color: #2B7A78;
`;

export const ResetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 238px;
  
  button {
    width: 80px;
    height: 50px;
    background-color: #DEF2F1;
  }
`;

export const BoardPosition = styled.div.attrs(props => ({
  index: props.index,
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  background-color: #3AAFA9
  color: ${({ active }) => active ? '#DEF2F1': '#2B7A78'};
`;