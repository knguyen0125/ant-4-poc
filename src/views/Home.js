import React from 'react';
import {Button, Card, Modal, Select, Space, DatePicker} from 'antd';
import TableIconButton from '~/components/TableIconButton';
import IconButton from '~/components/IconButton';
import lib from '~/components/icons/lib';

const Home = () => {
  return (
    <Card>
      <Space direction="vertical">
        {Object.entries(lib).map(([key, value]) => (
          <IconButton icon={key} />
        ))}
      </Space>
      <Space direction="vertical">
        {Object.entries(lib).map(([key, value]) => (
          <div>
            <TableIconButton icon={key} type="primary" />
            <TableIconButton icon={key} type="danger" />
            <TableIconButton icon={key} type="warning" />
            <TableIconButton icon={key} type="success" />
          </div>
        ))}
      </Space>

      <Select data-test-id="select" data-testid="select">
        <Select.Option>Test</Select.Option>
      </Select>

      <DatePicker />

      <Space direction="vertical">
        <Button type="primary" onClick={() => Modal.success({content: 'hi'})}>Primary</Button>
        <Button type="primary" ghost>
          Primary
        </Button>
        <Button type="danger">Danger</Button>
        <Button type="danger" ghost>
          Danger
        </Button>
        <Button type="warning">Warning</Button>
        <Button type="warning" disabled>
          Warning
        </Button>
        <Button type="warning" ghost>
          Warning
        </Button>
        <Button type="success">Success</Button>
        <Button type="success" disabled>
          Success
        </Button>
        <Button type="success" ghost>
          Success
        </Button>
        <Button type="link">Link</Button>
        <Button type="default">Default</Button>
      </Space>
    </Card>
  );
};

export default Home;
