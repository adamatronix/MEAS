import React, { useRef, useEffect } from 'react';
import { render } from 'react-dom';
import MEAS from './MEAS';
import Trails from './Trails';

const Example = () => {

  const containerEl = useRef();

  useEffect(() => {
    const meas = new MEAS(containerEl.current);
    new Trails(containerEl.current, meas);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#2a1ef0'}} ref={containerEl}></div>
  )
}

render(<Example/>,
  document.getElementById('root')
);

