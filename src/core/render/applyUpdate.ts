 
import { VDomNodeUpdater } from '../../types/diff';
import { applyChildrenDiff } from './';
import { renderElement } from './';

export const applyUpdate = (
  elem: HTMLElement | Text,
  diff: VDomNodeUpdater
): HTMLElement | Text => {
  if (diff.kind == 'skip') return elem;

  if (diff.kind == 'replace') {
    const newElem = renderElement(diff.newNode);
    elem.replaceWith(newElem);
    if (diff.callback) diff.callback(newElem);
    return newElem;
  }

  if ('wholeText' in elem) throw new Error('invalid update for Text node');

  for (const att in diff.attributes.remove) {
    elem.removeAttribute(att);
  }

  for (const att in diff.attributes.set) {
    (elem as any)[att] = diff.attributes.set[att];
  }

  applyChildrenDiff(elem, diff.childeren);

  return elem;
};
