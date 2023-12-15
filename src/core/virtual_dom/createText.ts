import { VDOMText } from '../../types/v_dom';

export const createText = (
  value: string | number | boolean,
  key: string = ''
): VDOMText => ({
  key,
  kind: 'text',
  value: value.toString(),
});
