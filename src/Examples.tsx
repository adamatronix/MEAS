import React, { useRef, useEffect } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import MEAS from './MEAS';
import Trails from './Trails';
import './fonts/fonts.scss';
import LineOne from './assets/ManualEngineering_1_Panama.svg';
import LineTwo from './assets/ManualEngineering_2_Panama.svg';

const TextWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  left: 0; 
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TextLine = styled.div`
  margin: 60px;
`

const TextLine2 = styled.div` 
  margin: 60px 300px;
`

const CaptionWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  left: 0; 
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-family: 'Neue Montreal';
  font-size: 14px;
  color: white;
  box-sizing: border-box;
`

const Example = () => {

  const containerEl = useRef();

  useEffect(() => {
    const meas = new MEAS(containerEl.current);
    new Trails(containerEl.current, meas);
  }, []);

  return (
    <>
      <TextWrapper>
        <TextLine><LineOne /></TextLine>
        <TextLine2><LineTwo /></TextLine2>
      </TextWrapper>
      <CaptionWrapper>
        <div>info@manualengineering.com</div>
        <div>©2021</div>
      </CaptionWrapper>
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#2a1ef0'}} ref={containerEl}></div>
    </>
    
  )
}

render(<Example/>,
  document.getElementById('root')
);

