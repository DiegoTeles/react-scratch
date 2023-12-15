import { applyUpdate } from './render';
import { createDiff } from './diffs';
import { VDomNodeUpdater } from '../types/diff';
import { VDomNode } from '../types/v_dom';

export abstract class Component<P, S> {
  protected props: P;
  protected state: S;

  private currentRootNode: VDomNode;
  private elementMounted: HTMLElement | Text;

  protected setState(updater: (s: S) => S) {
    if (this.elementMounted == undefined)
      throw new Error('you are updating an unmounted component');
    this.state = updater(this.state);
    console.log('this.elementMounted :>> ', this.elementMounted);
    applyUpdate(this.elementMounted, this.getUpdateDiff());
  }

  public setProps(props: P): VDomNodeUpdater {
    if (this.elementMounted == null)
      throw new Error('You are setting the props of an inmounted component');

    this.state = this.componentWillRecieveProps(props, this.state);
    this.props = props;
    return this.getUpdateDiff();
  }

  public initProps(props: P): VDomNode {
    this.props = props;
    this.currentRootNode = this.render();
    return this.currentRootNode;
  }

  private getUpdateDiff(): VDomNodeUpdater {
    const newRootNode = this.render();
    console.log('newRootNode :>> ', newRootNode);
    console.log('this.currentRootNode :>> ', this.currentRootNode);
    const diff = createDiff(this.currentRootNode, newRootNode);
    if (diff.kind == 'replace')
      diff.callback = (elem) => (this.elementMounted = elem);
    this.currentRootNode = newRootNode;
    setTimeout(() => this.componentDidUpdate());
    return diff;
  }

  public notifyMounted(elem: HTMLElement | Text) {
    this.elementMounted = elem;
    setTimeout(() => this.componentDidMount());
  }

  public unmount() {
    this.componentWillUnmount();
    this.elementMounted = null;
  }

  public componentDidMount() {}
  public componentWillRecieveProps(props: P, state: S): S {
    return state;
  }
  public componentDidUpdate() {}
  public componentWillUnmount() {}

  public abstract render(): VDomNode;
}
