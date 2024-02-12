import styled from 'styled-components';
import { PiCookingPot } from 'react-icons/pi';
import { GrCut } from 'react-icons/gr';
import { PiBowlFoodLight } from 'react-icons/pi';
import { TfiPaintRoller } from 'react-icons/tfi';
import { PiTelevisionThin } from 'react-icons/pi';
import { PiSoccerBallThin } from 'react-icons/pi';
import { VscSymbolProperty } from 'react-icons/vsc';

export default function NewProductList() {
    return (
        <>
            <_productList className="productList">
                <div className="wrapper">
                    <_title>
                        지금 가장 많이 이용하는 <span>인기상품</span>
                    </_title>
                    <_selectTab className="selectTab">
                        <_ul>
                            <li>
                                <GrCut />
                                <span>뷰티</span>
                            </li>
                            <li>
                                <PiBowlFoodLight />
                                <span>식품</span>
                            </li>
                            <li>
                                <PiCookingPot />
                                <span>주방용품</span>
                            </li>
                            <li>
                                <TfiPaintRoller />
                                <span>인테리어</span>
                            </li>
                            <li>
                                <PiTelevisionThin />
                                <span>가전제품</span>
                            </li>
                            <li>
                                <PiSoccerBallThin />
                                <span>스포츠</span>
                            </li>
                            <li>
                                <VscSymbolProperty />
                                <span>공구류</span>
                            </li>
                        </_ul>
                    </_selectTab>
                </div>
            </_productList>
        </>
    );
}

const _productList = styled.section`
    padding: 30px 0px;
    & > div {
        width: 1200px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
    }
`;

const _title = styled.p`
    text-align: left;
    font-size: 32px;
    font-weight: 400;
    line-height: 40px;
    margin-bottom: 30px;
    & > span {
        font-weight: 700;
    }
`;

const _selectTab = styled.div`
    width: 1040px;
    margin: 0 auto;
`;

const _ul = styled.ul`
    display: flex;
    margin: 0;
    padding: 0px;
    list-style: none;
    justify-content: space-between;
    & > :hover {
        border: 2px solid rgb(28, 57, 61);
    }
    & li {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 140px;
        height: 140px;
        background: #f9f9f9;
        padding-bottom: 30px;
    }
    & li svg {
        font-size: 65px;
    }
    & > li span {
        position: absolute;
        bottom: 0px;
        font-size: 17px;
        margin-bottom: 15px;
    }
`;
