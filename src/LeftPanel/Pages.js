import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
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
  // get the state of the desire page from recoil
  const [page, setPage] = useRecoilState(pageState(id));
  // update function to update the selected frame
  const updateSlectedFrame = useSetRecoilState(pageSelector(id));

  const handleRenaming = () => {
    setPage((page) => ({ ...page, renaming: true }));
  };
  const handleDoneRename = (newName) => {
    if (newName === '') return cancelRename();
    setPage((page) => ({ ...page, name: newName, renaming: false }));
  };
  const cancelRename = () => {
    setPage((page) => ({ ...page, renaming: false }));
  };

  return (
    <div key={page.id} id={page.id} onClick={() => updateSlectedFrame()} style={{ padding: '0.5rem' }}>
      {page.selected ? (
        <div onDoubleClick={handleRenaming}>
          {page.renaming ? (
            <input
              type="text"
              className="bg-transparent rounded-sm outline outline-2 outline-offset-4"
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
