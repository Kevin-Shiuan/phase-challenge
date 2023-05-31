import { useRecoilState,useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { RenameInput } from '../components/RenameInput';
import { activePageState,frameSelector, frameState } from '../recoil';

const ElementsWrapper = styled.div``;

const Elements = () => {
  const page = useRecoilValue(activePageState);
  return (
    <ElementsWrapper>
      <h4>Elements</h4>
      {page.children.map((frame) => (
        <Element key={frame} id={frame} />
      ))}
    </ElementsWrapper>
  );
};

const Element = ({ id, indent = 1 }) => {
  // get the state of the desire frame from recoil
  const [frame, setFrame] = useRecoilState(frameState(id));
  // update function to update the selected frame
  const updateSlectedFrame = useSetRecoilState(frameSelector(id));

  const handleRenaming = () => {
    setFrame((frame) => ({ ...frame, renaming: true }));
  };
  const handleDoneRename = (newName) => {
    if (newName === '') return cancelRename();
    setFrame((frame) => ({ ...frame, name: newName, renaming: false }));
  };
  const cancelRename = () => {
    setFrame((frame) => ({ ...frame, renaming: false }));
  };

  return (
    <>
      <div onClick={updateSlectedFrame} style={{ padding: '0.5rem', paddingLeft: `${indent * 0.5}rem` }}>
        {frame.selected ? (
          <div onDoubleClick={handleRenaming}>
            {frame.renaming ? (
              <RenameInput
                type="text"
                defaultValue={frame.name}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Escape') cancelRename();
                  if (e.key === 'Enter') handleDoneRename(e.currentTarget.value);
                }}
                onBlur={(e) => handleDoneRename(e.currentTarget.value)}
              />
            ) : (
              <strong>{frame.name}</strong>
            )}
          </div>
        ) : (
          frame.name
        )}
      </div>
      {frame.childrenIds.map((childrenId) => (
        <Element key={childrenId} id={childrenId} indent={++indent} />
      ))}
    </>
  );
};

export default Elements;
