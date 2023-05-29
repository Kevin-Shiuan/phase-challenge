import React from 'react';
import styled from 'styled-components';
import { RecoilRoot } from 'recoil';
// sections
import LeftPanel from './leftPanel/LeftPanel';
import Canvas from './canvas/Canvas';
import RightPanel from './rightPanel/RightPanel';
import Pixi from './canvas/pixi/Pixi';

const AppWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 200px auto 200px;
  background: #232323;
  height: 100vh;
  color: white;
`;

const App = () => {
  return (
    <RecoilRoot>
      <AppWrapper>
        <LeftPanel />
        {/* <Canvas /> */}
        <Pixi />
        <RightPanel />
      </AppWrapper>
    </RecoilRoot>
  );
};

export default App;
