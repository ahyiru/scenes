import {useRoute, Link} from '@huxy/router';

import {Tree} from '@huxy/components';

import Fish from '../webgl/src/fish';

import './index.less';

const List = props => {
  const {menu} = useRoute();
  return (
    <div className="nav-list-page">
      <Fish />
      <div className="nav-list">
        <Tree data={menu} Link={Link} width="100%" />
      </div>
    </div>
  );
};

export default List;
