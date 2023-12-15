import { Component } from '../core/component';
import { renderDOM } from '../core/render';
import {
  createComponent,
  createElement,
  createText,
} from '../core/virtual_dom';

interface NewItemFormState {
  name: string;
}

interface NewItemFormProps {
  addItem: (name: string) => void;
}

class NewItemForm extends Component<NewItemFormProps, NewItemFormState> {
  state = { name: '' };

  render() {
    return createElement(
      'form',
      {
        key: 'f',
        onsubmit: (e: Event) => {
          e.preventDefault();
          this.props.addItem(this.state.name);
          this.setState(() => ({ name: '' }));
        },
      },
      createElement(
        'label',
        { key: 'l-n', for: 'i-n' },
        createText('Novo Item')
      ),
      createElement('input', {
        key: 'i-n',
        id: 'i-n',
        value: this.state.name,
        oninput: (e: any) =>
          this.setState((s) => ({ ...s, name: e.target.value })),
      })
    );
  }
}

interface ToDoItem {
  name: string;
  done: boolean;
}

interface ToDoState {
  items: ToDoItem[];
}

class ToDoComponent extends Component<{}, ToDoState> {
  state: ToDoState = { items: [] };

  toggleItem(index: number) {
    this.setState((s) => ({
      items: s.items.map((item, i) => {
        if (index == i) return { ...item, done: !item.done };
        return item;
      }),
    }));
  }

  render() {
    return createElement(
      'div',
      { key: 'root' },
      createComponent(NewItemForm, {
        key: 'form',
        addItem: (n) =>
          this.setState((s) => ({
            items: s.items.concat([{ name: n, done: false }]),
          })),
      }),
      createElement(
        'ul',
        { key: 'items' },
        ...this.state.items.map((item: ToDoItem, i) =>
          createElement(
            'li',
            { key: i.toString() },
            createElement(
              'button',
              {
                key: 'btn',
                onclick: () => this.toggleItem(i),
              },
              createText(item.done ? 'Concluido' : 'Pendente')
            ),
            createText(item.name, 'label')
          )
        )
      )
    );
  }
}

class HelloWorld extends Component<{}, {}> {
  /* {} = Props, {} =State */
  render() {
    return createElement('div', { key: 'opcional', className: 'Teste' });
    return createElement('div', { key: 'root' }, createText('Hello World'));
  }
}

//renderDOM('root', createComponent(HelloWorld, { key: 'root' }));

interface CounterState {
  counter: number;
}

class Counter extends Component<{}, CounterState> {
  /* {} = Props, {} =State */

  state: CounterState = { counter: 0 };

  incrementCounter() {
    this.setState(() => ({ counter: this.state.counter + 1 }));
  }

  decrementCounter() {
    this.setState(() => ({ counter: this.state.counter - 1 }));
  }

  render() {
    return createElement(
      'div',
      {
        key: 'root',
        style:
          'display: flex; justify-content: center; align-items: center; gap: 12px; font-size: 20px;',
      },

      createElement(
        'button',
        {
          key: 'btn',
          style:
            'background: #f97e7e; font-size: 20px; color: #FFF; border: none; padding: 3px 12px;cursor: pointer',
          onclick: () => this.decrementCounter(),
        },
        createText(` - `)
      ),

      createText(`  ${this.state.counter}  `),

      createElement(
        'button',
        {
          key: 'btn',

          style:
            'background: #4caf50; font-size: 20px; color: #FFF; border: none; padding: 3px 12px; cursor: pointer',
          onclick: () => this.incrementCounter(),
        },
        createText(` + `)
      )
    );
  }
}

//renderDOM('root', createComponent(Counter, { key: 'root' }));
renderDOM('root', createComponent(HelloWorld, { key: 'root' }));
