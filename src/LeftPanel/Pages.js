import React from "react";
import styled from "styled-components";

const PagesWrapper = styled.div`
  border-bottom: 1px solid;
  padding-bottom: 16px;
`;
const Pages = () => {
  return (
    <PagesWrapper>
      <h4>Pages</h4>
      <div>
        <strong>Page 1</strong>
      </div>
      <div>Page 2</div>
    </PagesWrapper>
  );
};

export default Pages;
