import { VDOMAttributes, VDOMElement, VDomNode } from '../../types/v_dom';

export const createElement = (
  tagname: string,
  props: VDOMAttributes & { key: string },
  ...childeren: VDomNode[]
): VDOMElement => {
  const key = props.key;
  delete props.key;
  console.log('element', { kind: 'element', tagname, props, childeren, key });

  return { kind: 'element', tagname, props, childeren, key };
};
