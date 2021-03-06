/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button';
import lib from '../icons/lib';
import Icon from '~/components/icons/Icon';

type TableIconButtonProps = {
  icon: keyof typeof lib | 'none' | ReactElement;
} & Omit<ButtonProps, 'icon'>;

const TableIconButton: React.FC<TableIconButtonProps> = ({
  icon,
  ...props
}) => {
  // @ts-ignore
  const InnerIcon: JSX.Element =
    typeof icon === 'string' ? (
      <Icon name={icon as keyof typeof lib | 'none'} size={16} />
    ) : (
      icon
    );

  console.log(InnerIcon);

  return (
    <Button
      shape="circle"
      size="small"
      style={{
        minWidth: 30,
        width: 30,
        height: 30,
        padding: 0,
      }}
      icon={React.cloneElement(InnerIcon, {
        size: 16,
        style: { width: 16, height: 16 },
      })}
      {...props}
    />
  );
};

export default TableIconButton;
