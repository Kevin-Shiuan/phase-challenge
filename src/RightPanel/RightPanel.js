import React from "react";
import styled from "styled-components";
import ColorPicker from "./ColorPicker";
const RightPanelWrapper = styled.div`
  padding: 8px;
`;
const Label = styled.label`
  display: grid;
  grid-template-columns: 16px auto minmax(0, 1fr);
  grid-gap: 8px;
`;
const RightPanel = () => {
  return (
    <RightPanelWrapper>
      <Label>
        X <input type="number" min={0} max={999} value={10} />
      </Label>
      <Label>
        Y <input type="number" min={0} max={999} value={10} />
      </Label>
      <Label>
        O <input type="number" min={0} max={100} value={100} />
        <input type="range" min={0} max={100} value={100} />
      </Label>
      <Label>
        B <ColorPicker /> #00FF00
      </Label>
    </RightPanelWrapper>
  );
};

export default RightPanel;
