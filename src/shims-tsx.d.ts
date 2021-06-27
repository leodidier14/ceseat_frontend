import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode { }
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue { }
    interface IntrinsicElements {
      [elem: string]: any
    }

  }
}

namespace Articles {

  interface Article {
    name: string,
    description: string,
    type: string
    price: number,
    image: string,
    quantity: number,
    restaurant: string
  }

  interface Menu extends Article {
    articles: Array<Article>
  }
}

namespace Restaurants {
  interface Restaurant {
    id: number,
    name: string,
    city: string,
    type: string,
    schedule: string,
    image: string
  }
}

namespace Orders {
  interface Order {
    number: string,
    clientName: string,
    clientAddress: string,
    clientPhone: string,
    restaurantName: string,
    restaurantAddress: string,
    deliveryManName: string,
    deliveryManId: number,
    price: number,
    comment: string,
    status: string,
    articles: Array<Articles.Article>,
    date: string
  }
}

namespace Components {
  interface component
  {
    name: string,
    description: string,
    type: string,
    version: string,
    documentationLink: string,
    downloadLink: string
  }
}

namespace Logs {
  interface connexionLogs {
    time: string,
    idUser: number,
    state: boolean,
  }
  interface componentLogs {
    type: string,
    time: string,
    idUser: number,
    name: string,
    version: string,
  }
}

namespace Stats {
  interface microserviceRequest {
    id: number,
    date: string,
    name: string,
    description: string,
    requestNumber: number,
  }
}
