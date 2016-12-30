import React, { PropTypes } from 'react';
import theme from '../../styles/theme';

const styles = {
  tabs: {
    display: 'flex',
    position: 'fixed',
    width: '100%',
    background: theme['@graph-bg-color'],
    borderBottom: `1px solid ${theme['@graph-border-color']}`,
    zIndex: 1000,
  },
  tab: {
    cursor: 'pointer',
    padding: '7px 24px',
    fontSize: 12,
    color: theme['@graph-font-color'],
  },
  active: {
    color: '#fff',
    background: theme['@graph-primary-color'],
  },
};

const GraphTabs = (props, context) => {
  const tabList = [
    { to: '/graph/router', title: 'Routes' },
    { to: '/graph/dataflow', title: 'Data Flow' },
  ];
  const router = context.router;
  const tabs = tabList.map((tab) => {
    const tabStyle = router.isActive(tab.to) ? { ...styles.tab, ...styles.active } : styles.tab;
    return (
      <li style={tabStyle} key={tab.to} onClick={() => { router.push(tab.to); }}>
        {tab.title}
      </li>
    );
  });
  return (
    <div>
      <ul style={styles.tabs}>
        {tabs}
      </ul>
    </div>
  );
};

GraphTabs.contextTypes = {
  router: PropTypes.object,
};

export default GraphTabs;
