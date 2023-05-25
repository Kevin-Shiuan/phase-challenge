import React from "react";
import styled from "styled-components";
import LeftPanel from "./LeftPanel/LeftPanel";
import Canvas from "./Canvas/Canvas";
import RightPanel from "./RightPanel/RightPanel";

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
    <AppWrapper>
      <LeftPanel />
      <Canvas />
      <RightPanel />
    </AppWrapper>
  );
};

export default App;
