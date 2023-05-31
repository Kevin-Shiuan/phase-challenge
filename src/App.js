import styled from 'styled-components';
import { RecoilRoot } from 'recoil';
// sections
import LeftPanel from './leftPanel/LeftPanel';
import RightPanel from './rightPanel/RightPanel';
import Pixi from './canvas/pixi/Pixi';
import RecoilNexus from "recoil-nexus";

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
        {/* <Canvas /> */}
        <Pixi />
        <RightPanel />
      </AppWrapper>
    </RecoilRoot>
  );

export default App;
