import { VDOMAttributes, VDomNode } from './v_dom';

export type AttributesUpdater = {
  set: VDOMAttributes;
  remove: string[];
};

export interface InsertOperation {
  kind: 'insert';
  node: VDomNode;
}

export interface UpdateOperation {
  kind: 'update';
  attributes: AttributesUpdater;
  childeren: ChildUpdater[];
}

export interface ReplaceOperation {
  kind: 'replace';
  newNode: VDomNode;
  callback?: (elem: HTMLElement | Text) => void;
}

export interface RemoveOperation {
  kind: 'remove';
}

export interface SkipOperation {
  kind: 'skip';
}

export type VDomNodeUpdater =
  | UpdateOperation
  | ReplaceOperation
  | SkipOperation;

export type ChildUpdater =
  | UpdateOperation
  | ReplaceOperation
  | RemoveOperation
  | SkipOperation
  | InsertOperation;
