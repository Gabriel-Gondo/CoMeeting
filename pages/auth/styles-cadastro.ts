import styled from 'styled-components';
import colors from "styles/colors"

export const Division = styled.div`
    width: 100%;
    height: 100%;

    max-width: 1920px;
    max-height: 1080px;

    min-width: 800px;
    min-height: 600px;
`;

export const Container = styled.div`
    align-items:center;
    justify-content:center;
    display: flex;
    flex-wrap: wrap;

    background-color: ${colors.white};
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, .4);
    padding: 32px;

    box-shadow: 10px 8px 17px grey;
    
`;

export const LeftSide = styled.div`
    width: 60%;

    margin: 10px 0;

    border-radius: 7px;
    /* border: 1px solid red; */
`;

export const RightSide = styled.div`
    width: 40%;

    margin: 10px 0;

    border-radius: 7px;
    /* border: 1px solid yellow; */

`;

export const Hr = styled.hr`
    width: 100%;
    height: 3px;

    margin-bottom: 20px;
    align-self: center;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background-color: ${colors.black};
    opacity: .4;
`;

export const DownSide = styled.div`
    width: 100%;
    height: auto;

    align-items: flex-end;
    
    /* border: 1px solid blue; */
`;

export const Gap = styled.div`
    width: 50px;
    height: auto;
`;

export const ButtonGroup = styled.div`
    width: 600px;
    height: auto;
    display: flex;
    float: right;
    
    /* border: 1px solid blue; */
`;