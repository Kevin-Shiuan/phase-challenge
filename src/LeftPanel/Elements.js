import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { frameState, frameSelector, activePageState } from '../recoil';

const Elements = () => {
  const page = useRecoilValue(activePageState);
  return (
    <div>
      <h4>Elements</h4>
      {page.children.map((frame) => (
        <Element key={frame} id={frame} />
      ))}
    </div>
  );
};

const Element = ({ id, indent = 1 }) => {
  // recoil
  // get the state of the desire frame
  const [frame, setFrame] = useRecoilState(frameState(id));

  // update function to update the selected frame
  const updateSlectedFrame = useSetRecoilState(frameSelector(id));

  const handleRenaming = (e) => {
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
      <div onClick={(e) => updateSlectedFrame()} style={{ padding: '0.5rem', paddingLeft: `${indent * 0.5}rem` }}>
        {frame.selected ? (
          <div onDoubleClick={() => handleRenaming()}>
            {frame.renaming ? (
              <input
                type="text"
                className="bg-transparent rounded-sm outline outline-2 outline-offset-4"
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
