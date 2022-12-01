import {useRoute, Link} from '@huxy/router';

import {Tree} from '@huxy/components';

import Fish from '@app/views/webgl/src/fish';

import './index.less';

const List = props => {
  const {menu} = useRoute();
  return (
    <div className="nav-list-page">
      <Fish />
      <div className="nav-list">
        <Tree data={menu} Link={Link} />
      </div>
    </div>
  );
};

export default List;
