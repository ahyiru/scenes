import {useEffect, useRef} from 'react';

import startScene from './scene';

const Index = props => {
  const mountDom = useRef();
  useEffect(() => {
    return startScene(mountDom.current);
  }, []);
  return <div ref={mountDom} />;
};

export default Index;
