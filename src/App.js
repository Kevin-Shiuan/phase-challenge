import { RecoilRoot } from 'recoil';
import RecoilNexus from "recoil-nexus";
import styled from 'styled-components';

import Pixi from './canvas';
// sections
import LeftPanel from './leftPanel';
import RightPanel from './rightPanel';

const AppWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 200px auto 200px;
  background: #232323;
  height: 100vh;
  color: white;
`;

const App = () => (
    <RecoilRoot>
      <RecoilNexus />
      <AppWrapper>
        <LeftPanel />
        <Pixi />
        <RightPanel />
      </AppWrapper>
    </RecoilRoot>
  );

export default App;
