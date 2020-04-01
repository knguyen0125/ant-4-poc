/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import AntIcon from '@ant-design/icons';
import { v4 as uuid } from 'uuid';
import lib from './lib';

type IconType = {
  name: keyof typeof lib | 'none';
  size?: number | string;
};

const Icon: React.FC<IconType> = ({ name, size = '1em', ...props }) => {
  const Component = lib[name] || 'div';


  return (
    <AntIcon
      key={uuid()}
      component={(local) =>
        React.cloneElement(<Component />, {
          ...local,
          width: size,
          height: size,
          style: {
            width: size,
            height: size,
          },
        })}
      {...props}
    />
  );
};

export default Icon;
