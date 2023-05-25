import React from "react";
import styled from "styled-components";
import Pages from "./Pages";
import Elements from "./Elements";

const LeftPanelWrapper = styled.div`
  padding: 8px;
`;
const LeftPanel = () => {
  return (
    <LeftPanelWrapper>
      <Pages />
      <Elements />
    </LeftPanelWrapper>
  );
};

export default LeftPanel;
