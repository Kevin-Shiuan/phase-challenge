import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { documentState, pageState, pageSelector } from '../recoil';

const PagesWrapper = styled.div`
  border-bottom: 1px solid;
  padding-bottom: 16px;
`;
const Pages = () => {
  const document = useRecoilValue(documentState);

  return (
    <PagesWrapper>
      <h4>Pages</h4>
      {document.pages.map((page) => (
        <Page key={page} id={page} />
      ))}
    </PagesWrapper>
  );
};

const Page = ({ id }) => {
  // recoil
  // get the state of the desire frame
  const page = useRecoilValue(pageState(id));
  // update function to update the selected frame
  const updateSlectedFrame = useSetRecoilState(pageSelector(id));

  return (
    <div key={page.id} id={page.id} onClick={() => updateSlectedFrame()} style={{ padding: '0.5rem' }}>
      {page.selected ? <strong>{page.name}</strong> : page.name}
    </div>
  );
};

export default Pages;
