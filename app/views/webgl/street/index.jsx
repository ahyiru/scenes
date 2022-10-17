import {useEffect, useRef} from 'react';

import startScene from './scene';

import './index.less';

const Index = props => {
  const mountDom = useRef();
  useEffect(() => {
    return startScene(mountDom.current);
  }, []);
  return <div className="webgl-street-page">
    <div className="tips-bar">
      <span>Up - move forwards</span>
      <span>Down - move backwards</span>
      <span>Right - rotate right</span>
      <span>Left - rotate left</span>
    </div>
    <div ref={mountDom} />
  </div>;
};

export default Index;
