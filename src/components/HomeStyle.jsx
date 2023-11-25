import styled from 'styled-components';

export const PageContainer=styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    align-items: center;
    background-color: #77C9D4;
`;

export const FishList=styled.div`
    display: flex;
    flex-direction: column;
    width: 450px;
    background: transparent;
`;

export const FishItem=styled.div`
    display: flex;
    height: 45px;
    padding: 0 15px;
    font-weight: bolder;
    align-items: center;
    justify-content: space-between;
    background-color: #57bc90;
    color: #20343f;
    &:nth-child(even){
        color: #57bc90;
        background-color: #015249;
    }
`
export const FishForm=styled(FishList)`
    flex-direction:row;
    margin: 10px 0;
    padding-top: 0;
    justify-content: space-between;
    align-items: center;
`;

export const Input=styled.input`
    width:135px;
    height:25px;
    padding-left: 10px;
    margin-bottom: 5px
`;

export const RadioInput=styled.input`
    width:15px;
    height:15px;
`;

export const Button=styled.button`
    width:150px;
    height:30px;
`;

export const Buttons=styled(FishForm)`
    height: 40px;
    margin-top: 100px;
`;

export const TabButtons=styled.button`
    display:flex;
    text-align:center;
    align-items:center;
    justify-content:center;
    height:100%;
    width:48%;
    border:1px solid black;
    color:black;
    font-size:20px;
    cursor: pointer;
    background-color: #A5A5AF;
    color: #015249;
    ${(props) => {
        if (props.name === props['data-active']){
            return `
              background-color: #015249;
              color: #57bc90;
            `;
        }
    }}
`;

export const AquariumForm=styled(FishForm)`
    flex-direction:column;
`;

export const AquariumButton = styled.button`
  width:150px;
  height:30px;
  color: white;
  background-color: green;
  cursor: pointer;
  &:disabled {
    background-color: red;
    cursor: default;
  }
`;