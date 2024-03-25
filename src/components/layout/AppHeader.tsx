import { Button, Layout, Select, Space, Modal } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CoinInfoModal from '../CoinInfoModal';
import { TCryptoData } from '../../data';

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
  const [select, setSelect] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [coin, setCoin] = useState<TCryptoData>();
  const { crypto } = useCrypto();

  const handleSelect = (value: string) => {
    setCoin(crypto?.result.find((c) => c.id === value));
    setModal(true);
  };

  useEffect(() => {
    const keypress = (event: KeyboardEvent) => {
      if (event.key === '/') setSelect((prev) => !prev);
    };
    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  });

  return (
    <Layout.Header style={headerStyle}>
      <Select
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        style={{ width: 250 }}
        value="press / to open"
        options={crypto?.result.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: 20 }} alt={option.data.label} src={option.data.icon} />{' '}
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary">Add asset</Button>
      <Modal
        open={modal}
        footer={null}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}>
        <CoinInfoModal name={coin?.name} />
      </Modal>
    </Layout.Header>
  );
};

export default AppHeader;
