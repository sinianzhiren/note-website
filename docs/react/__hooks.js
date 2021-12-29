import React, {useState, useMemo, useCallback, useRef, createRef } from 'react';

const Parent = () => {
  const [num, setNum] = useState(0);
  const _add = () => {
    console.log('child click');
  };

  // const add = useCallback(() => {
  //   _add();
  // }, []);
  // or
  const add = useMemo(() => {
    return () => {
      console.log('child click');
    };
  }, []);

  return (
    <div>
      <span>{num}</span>
      <button onClick={() => setNum((pre) => pre + 1)}>add</button>
      <Child add={add} />
    </div>
  )
};

const Child = React.memo(({add}) => {
  return <button onClick={add}>child add</button>
});
