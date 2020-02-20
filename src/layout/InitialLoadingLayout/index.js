import React from 'react';
import { Layout, Spin } from 'antd';

const InitialLoadingLayout = ({ loading }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin spinning={loading} tip="Loading..." size="large" />
      </Layout.Content>
    </Layout>
  );
};

export default InitialLoadingLayout;
