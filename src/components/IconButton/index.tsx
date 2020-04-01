/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button';
import lib from '../icons/lib';
import Icon from '~/components/icons/Icon';

type IconButtonProps = {
  icon: keyof typeof lib | 'none' | ReactElement;
} & Omit<ButtonProps, 'icon'>;

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  ...props
}) => {
  // @ts-ignore
  const InnerIcon: JSX.Element =
    typeof icon === 'string' ? (
      <Icon name={icon as keyof typeof lib | 'none'} size={30} />
    ) : (
      icon
    );

  console.log(InnerIcon);

  return (
    <Button
      // @ts-ignore
      type="icon"
      icon={React.cloneElement(InnerIcon, {
        size: 30,
        style: { width: 30, height: 30 },
      })}
      {...props}
    />
  );
};

export default IconButton;
