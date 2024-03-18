import { Layout } from 'antd';

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
  padding: '1rem',
};

const AppContent = () => {
  return <Layout.Content style={contentStyle}>Content</Layout.Content>;
};

export default AppContent;
