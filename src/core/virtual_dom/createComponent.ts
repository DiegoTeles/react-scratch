import { Component } from '../component';
import { VDOMComponent } from '../../types/v_dom';

export const createComponent = <P extends object>(
  component: { new (): Component<P, any> },
  props: P & { key: string }
): VDOMComponent => {
  const key = props.key;
  delete props.key;
  console.log('component', { component, props, key, kind: 'component' });
  return {
    component,
    props,
    key,
    kind: 'component',
  };
};
