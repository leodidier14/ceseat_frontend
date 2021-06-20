import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

namespace ArticleChoice1 {
  interface Article {
    name: string,
    description: string,
    type: string
    price: number,
    quantity: number,
    image: string
  }
}