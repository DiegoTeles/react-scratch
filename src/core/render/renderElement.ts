import { VDomNode } from '../../types/v_dom';

export const renderElement = (rootNode: VDomNode): HTMLElement | Text => {
  console.log('renderElement = rootNode :>> ', rootNode.kind);
  if (rootNode.kind == 'text') {
    return document.createTextNode(rootNode.value);
  }

  if (rootNode.kind == 'component') {
    console.log('Bateu aqui');
    if (rootNode.instance) {
      const elem = renderElement(rootNode.instance.render());
      rootNode.instance.notifyMounted(elem as HTMLElement);
      return elem;
    }

    rootNode.instance = new rootNode.component();
    const elem = renderElement(rootNode.instance.initProps(rootNode.props));
    rootNode.instance.notifyMounted(elem as HTMLElement);
    return elem;
  }

  const elem = document.createElement(rootNode.tagname);
  for (const att in rootNode.props || {}) {
    (elem as any)[att] = rootNode.props[att];
  }

  console.log('elem :>> ', rootNode.childeren);
  (rootNode.childeren || []).forEach((child) =>
    elem.appendChild(renderElement(child))
  );

  //return elem.appendChild(renderElement(rootNode.childeren[0]));

  return elem;
};
