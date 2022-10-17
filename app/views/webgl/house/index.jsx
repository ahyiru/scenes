import {useEffect, useRef} from 'react';

import startScene from './scene';

import './index.less';

const Index = props => {
  const mountDom = useRef();
  const onChangeScene = useRef();
  const onChangeZoom = useRef();
  useEffect(() => {
    const {destory, changeScene, changeZoom} = startScene(mountDom.current);
    onChangeScene.current = changeScene;
    onChangeZoom.current = changeZoom;
    return destory;
  }, []);
  return <div className="webgl-house-page">
    <div className="switch-bar">
      <ul>
        <li onClick={e => onChangeScene.current?.(-1)}>
          <i className="ico-left" />
        </li>
        <li onClick={e => onChangeZoom.current(-1)}>
          <i className="ico-minus" />
        </li>
        <li onClick={e => onChangeZoom.current(1)}>
          <i className="ico-plus" />
        </li>
        <li onClick={e => onChangeScene.current(1)}>
          <i className="ico-right" />
        </li>
      </ul>
    </div>
    <div ref={mountDom} />
  </div>;
};

export default Index;
