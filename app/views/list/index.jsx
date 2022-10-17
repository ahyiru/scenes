import {useRoute, Link} from '@huxy/router';

import {Menu} from '@huxy/components';

import './index.less';

const List = props => {
  const {menu} = useRoute();
  return (
    <div className="menu-list">
      <Menu menu={menu} Link={Link} bgColor="rgba(0, 0, 0, 0.02)" />
    </div>
  );
};

export default List;
