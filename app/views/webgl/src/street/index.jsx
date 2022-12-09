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
      <span>Up - 前进</span>
      <span>Down - 后退</span>
      <span>Right - 向右</span>
      <span>Left - 向左</span>
    </div>
    <div ref={mountDom} style={{width: '100%', height: '100%'}} />
  </div>;
};

export default Index;
