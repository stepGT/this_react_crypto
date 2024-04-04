import { useState } from 'react';
import { Select, Space, Typography, Divider, Form, InputNumber, DatePicker, Button } from 'antd';
import { TCryptoData } from '../data';
import { useCrypto } from '../context/crypto-context';

type TValues = {
  amount: number;
  date?: object;
  price?: number;
  total?: number;
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} in not valid number',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const AddAssetForm = () => {
  const [coin, setCoin] = useState<TCryptoData>();
  const { crypto } = useCrypto();
  const [form] = Form.useForm();
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

  const onFinish = (values: TValues) => {
    console.log(values);
  };

  const handleAmountChange = (value: number | null): void => {
    const price = form.getFieldValue('price');
    form.setFieldsValue({
      total: value && Number(value * price).toFixed(2),
    });
  };

  const handlePriceChange = (value: number | null): void => {
    const amount = form.getFieldValue('amount');
    form.setFieldsValue({
      total: value && Number(value * amount).toFixed(2),
    });
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: Number(coin.price?.toFixed(2)),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}>
      <Typography.Title level={2}>{coin.name}</Typography.Title>
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
          },
        ]}>
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAssetForm;
