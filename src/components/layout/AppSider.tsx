import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Card, Statistic, List, Typography, Spin } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { fakeFetchCrypto, fetchAssets } from '../../API';
import { TAssets, IResult } from '../../data';

const siderStyle: React.CSSProperties = {
  padding: '1rem',
};

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

const AppSider = () => {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState<IResult>();
  const [assets, setAssets] = useState<TAssets[]>();

  useEffect(() => {
    const preload = async () => {
      setLoading(true);
      const dataCrypto = await fakeFetchCrypto();
      const dataAssets = await fetchAssets();
      //
      setCrypto(dataCrypto);
      setAssets(dataAssets);
      setLoading(false);
    };
    preload();
  }, []);

  if (loading) return <Spin fullscreen />;

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      <Card style={{ marginBottom: '1rem' }}>
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
        <List
          size="small"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />
      </Card>

      <Card>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Layout.Sider>
  );
};

export default AppSider;
