import React, { useRef, useEffect } from 'react';
import { render } from 'react-dom';
import MEAS from './MEAS';

const Example = () => {

  const containerEl = useRef();

  useEffect(() => {
    new MEAS();
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden'}} ref={containerEl}></div>
  )
}

render(<Example/>,
  document.getElementById('root')
);

