import { Component } from '../core/component'

export type VDOMAttributes = { [_: string]: string | number | boolean | Function }

export interface VDOMElement {
  kind: 'element'
  tagname: string
  childeren?: VDomNode[]
  props?: VDOMAttributes
  key: string
}

export interface VDOMComponent {
  kind: 'component'
  instance?: Component<any, any>
  props: object
  component: { new(): Component<any, any> }
  key: string
}

export interface VDOMText {
  kind: 'text',
  value: string
  key: string
}

export type VDomNode = 
  | VDOMText
  | VDOMElement
  | VDOMComponent