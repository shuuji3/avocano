// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { LitElement, html } from 'lit';
//import { fulfillCheckout } from '../utils/fetch.js';
import cache from '../utils/cache.js';
import styles from './styles/checkout.js';

const noimage = new URL('../../assets/noimage.png', import.meta.url).href;

export class Checkout extends LitElement {
  static get styles() {
    return styles;
  }

  constructor() {
    super();

    this.state = {
      status: 'loading',
      cart: [],
    };
  }

  async firstUpdated() {
    let cart = await cache.all();

    if (this.state.status === 'loading') {
      this.state = {
        status: 'loaded',
        cart,
      };

      this.requestUpdate();
    }
  }

  async clearCart(event) {
    if (event) {
      event.preventDefault();
    }

    await cache.clear();
    location.reload();
  }

  render() {
    const { cart } = this.state;

    return html`
      <div class="checkoutContainer">
        <h1>Checkout</h1>
        <div class="checkoutWrapper">
          <div class="panel">
            <h2>Cart</h2>
            ${cart.length
              ? cart.map(
                  item =>
                    html`<app-product-preview
                      .productItem=${item}
                    ></app-product-preview>`
                )
              : html`<p>No items in cart</p>`}
            ${cart.length &&
            html`<mwc-button
              label="Clear Cart"
              slot="primaryAction"
              @click="${this.clearCart}"
            ></mwc-button>`}
          </div>
          <div class="panel">
            <h2>Delivery</h2>
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              pattern=".+@globex.com"
              size="30"
              required
            />
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-checkout', Checkout);