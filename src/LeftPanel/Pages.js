import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { RenameInput } from '../components/RenameInput';
import { documentState, pageState, selectPage } from '../recoil';

const PagesWrapper = styled.div`
  border-bottom: 1px solid;
  padding-bottom: 16px;
`;

const Pages = () => {
  const document = useRecoilValue(documentState);

  return (
    <PagesWrapper>
      <h4>Pages</h4>
      {document.pageIds.map((page) => (
        <Page key={page} id={page} />
      ))}
    </PagesWrapper>
  );
};

const Page = ({ id }) => {
  // get the state of the desire page from recoil
  const [page, setPage] = useRecoilState(pageState(id));
  // update function to update the selected page
  const updateSlectedPage = useSetRecoilState(selectPage(id));

  const handleRenaming = () => {
    setPage((page) => ({ ...page, isRenaming: true }));
  };
  const handleDoneRename = (newName) => {
    if (newName === '') return cancelRename();
    setPage((page) => ({ ...page, name: newName, isRenaming: false }));
  };
  const cancelRename = () => {
    setPage((page) => ({ ...page, isRenaming: false }));
  };

  return (
    <div key={page.id} id={page.id} onClick={() => updateSlectedPage()} style={{ padding: '0.5rem' }}>
      {page.isSelected ? (
        <div onDoubleClick={handleRenaming}>
          {page.isRenaming ? (
            <RenameInput
              type="text"
              defaultValue={page.name}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Escape') cancelRename();
                if (e.key === 'Enter') handleDoneRename(e.currentTarget.value);
              }}
              onBlur={(e) => handleDoneRename(e.currentTarget.value)}
            />
          ) : (
            <strong>{page.name}</strong>
          )}
        </div>
      ) : (
        page.name
      )}
    </div>
  );
};

export default Pages;
