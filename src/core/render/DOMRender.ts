 
import { VDomNode } from '../../types/v_dom';
import { renderElement } from './';

export const renderDOM = (htmlId: string, rootNode: VDomNode): HTMLElement => {
  console.log('htmlId :>> ', htmlId);
  console.log('rootNode :>> ', rootNode);
  const elem = document.getElementById(htmlId);
  if (elem == null) {
    throw new Error('Container elem not found');
  }

  const parent = elem.parentElement;
  console.log('parent :>> ', parent);
  elem.replaceWith(renderElement(rootNode));

  return parent.children[0] as HTMLElement;
};
