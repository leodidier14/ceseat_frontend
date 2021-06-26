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
    quantity: number
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
    type: string
    schedule: string,
    image: string
  }
}

namespace Orders {
  interface RestaurantOrder {
    number: string,
    clientName: string,
    deliveryManName: string,
    price: float,
    comment: string,
    status: string,
    articles: Array<object>,
    date: string,
  }

  interface DeliveryManOrder {
    number: string,
    clientName: string,
    clientAddress: object,
    clientPhone: string,
    restaurantName: string,
    restaurantAddress: object,
    deliveryManId : number,
    comment: string,
    status: string,
    date: string,
  }

  interface ClientOrder {
    number: string,
    restaurantName: string,
    deliveryManName: string,
    price: float,
    comment: string,
    status: string,
    articles: Array<object>,
    date: string,
  }
}

namespace Components {
  interface component
  {
    name: string,
    description: string,
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
    time: string,
    idUser: number,
    name: string,
    version: string,
  }
}
