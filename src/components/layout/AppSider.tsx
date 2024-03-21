import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Card, Statistic, List, Typography, Spin, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { fakeFetchCrypto, fetchAssets } from '../../API';
import { TAssets, IResult, TCryptoData } from '../../data';
import { capitalize, percentDifference } from '../../utils';

const siderStyle: React.CSSProperties = {
  padding: '1rem',
};

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
      setAssets(
        dataAssets.map((asset) => {
          const coin = dataCrypto.result.find((crypto) => crypto.id === asset.id)!;
          return {
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset,
          };
        }),
      );
      setLoading(false);
    };
    preload();
  }, []);

  if (loading) return <Spin fullscreen />;

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets?.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: '1rem' }}>
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              { title: 'Total profit', value: asset.totalProfit, withTag: true },
              { title: 'Asset amount', value: asset.amount, isPlain: true },
            ]}
            renderItem={(item) => (
              <List.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.title}</span>
                <span>
                  {item.withTag && (
                    <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>
                  )}
                </span>
                <span>
                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                      {item.value?.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
};

export default AppSider;
