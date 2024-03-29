import { useState } from 'react';
import { Select, Space, Typography, Divider, Form, InputNumber, DatePicker, Button } from 'antd';
import { TCryptoData } from '../data';
import { useCrypto } from '../context/crypto-context';

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

  const onFinish = (values: any) => {
    console.log(values);
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
        price: coin.price?.toFixed(2),
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
          onChange={() => {}}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber disabled style={{ width: '100%' }} />
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
