 
import { ChildUpdater } from '../../types/diff';
import { applyUpdate, renderElement } from './';

export const applyChildrenDiff = (
  elem: HTMLElement,
  operations: ChildUpdater[]
) => {
  let offset = 0;
  for (let i = 0; i < operations.length; i++) {
    const childUpdater = operations[i];

    if (childUpdater.kind == 'skip') continue;

    if (childUpdater.kind == 'insert') {
      if (elem.childNodes[i + offset - 1])
        elem.childNodes[i + offset - 1].after(renderElement(childUpdater.node));
      else elem.appendChild(renderElement(childUpdater.node));
      continue;
    }

    const childElem = elem.childNodes[i + offset];

    if (childUpdater.kind == 'remove') {
      childElem.remove();
      offset -= 1;
      continue;
    }

    applyUpdate(childElem as HTMLElement, childUpdater);
  }
};
