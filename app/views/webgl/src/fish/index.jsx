import {useEffect, useRef} from 'react';

import startScene from './scene';

const Index = props => {
  const mountDom = useRef();
  useEffect(() => {
    const root = props.mountDom?.current ?? mountDom.current;
    return startScene(root);
  }, []);
  return <div ref={mountDom} />;
};

export default Index;
