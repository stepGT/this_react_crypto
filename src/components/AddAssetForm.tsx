import { useState } from 'react';
import { Select, Space } from 'antd';
import { TCryptoData } from '../data';
import { useCrypto } from '../context/crypto-context';

const AddAssetForm = () => {
  const [coin, setCoin] = useState<TCryptoData>();
  const { crypto } = useCrypto();
  //
  if (!coin) {
    return (
      <Select
        style={{
          width: '100%',
        }}
        onSelect={(v) => setCoin(crypto?.result.find((c) => c.id === v))}
        placeholder="Select coin"
        options={crypto.result.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} />
            {option.data.label}
          </Space>
        )}
      />
    );
  }
  return <form>FORM</form>;
};

export default AddAssetForm;
