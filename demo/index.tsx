import React, { useCallback } from 'react';
import { render } from 'react-dom';

import { TopBar } from './TopBar';
import { Content } from './Content';

import './style.css';

function Demo() {
  return (
    <div className="app">
      <TopBar />
      <Content />
    </div>
  );
}

render(<Demo />, document.getElementById('app'));
