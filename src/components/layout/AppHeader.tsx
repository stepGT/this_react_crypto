import { Layout } from 'antd';

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 60,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const AppHeader = () => {
  return <Layout.Header style={headerStyle}>Header</Layout.Header>;
};

export default AppHeader;
