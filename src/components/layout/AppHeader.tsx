import { Button, Layout, Select, Space } from 'antd';
import { useCrypto } from '../../context/crypto-context';

const headerStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const AppHeader = () => {
  const { crypto } = useCrypto();
  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        value="press / to open"
        optionLabelProp="label"
        options={crypto.result.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: 20 }} alt={option.data.label} src={option.data.icon} /> {option.data.label}
          </Space>
        )}
      />
      <Button type="primary">Add asset</Button>
    </Layout.Header>
  );
};

export default AppHeader;
