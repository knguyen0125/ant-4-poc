import loadable from '@loadable/component';

export default {
  dummy: loadable(() => import('~/views/Exceptions/NotFound')),
  home: loadable(() => import('~/views/Home')),
  service: loadable(() => import('~/views/Service')),
  serviceWithParams: loadable(() => import('~/views/ServiceWithParams')),
};
