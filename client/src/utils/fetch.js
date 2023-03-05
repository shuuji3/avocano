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

import { getConfig } from '../utils/config.js';

/**
 * getProduct()
 *
 * Retrieves product at specified id defined from django api
 * GET /product/{productId}
 */
export const getProduct = async productId => {
  const { API_URL } = getConfig();
  let product;

  var credentials = 'include';
  if (API_URL.includes('//localhost')) {
    credentials = 'omit';
  }

  if (productId) {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'GET',
        credentials: credentials,
      });
      product = await response.json();
    } catch (e) {
      console.error(e);
    }
  } else {
    console.error('Error: id required');
  }

  return product;
};

/**
 * getActiveProduct()
 *
 * Retrieves active product as defined from django api
 * GET /active/product/
 */
export const getActiveProduct = async () => {
  const { API_URL } = getConfig();
  let activeProduct;

  var credentials = 'include';
  if (API_URL.includes('//localhost')) {
    credentials = 'omit';
  }

  try {
    const response = await fetch(`${API_URL}/active/product/`, {
      method: 'GET',
      credentials: credentials,
    });
    activeProduct = await response.json();
  } catch (e) {
    console.error(e);
  }

  return activeProduct;
};

/**
 * buyProduct()
 *
 * Achieves "product" purchase as defined from django api
 * GET /products/{productId}/purchase/
 */
export const buyProduct = async (productId, callback) => {
  const { API_URL } = getConfig();

  var credentials = 'include';
  if (API_URL.includes('//localhost')) {
    credentials = 'omit';
  }

  if (productId) {
    try {
      await fetch(`${API_URL}/products/${productId}/purchase/`, {
        method: 'POST',
        credentials: credentials,
      });
      callback && callback();
    } catch (e) {
      console.error(e);
    }
  } else {
    console.error('Error: id required');
  }
};

/**
 * getProductTestimonials()
 *
 * Retrieves testimonials for product as defined from django api
 * GET /testimonials/{productId}
 */
export const getProductTestimonials = async productId => {
  const { API_URL } = getConfig();
  let testimonials = [];

  var credentials = 'include';
  if (API_URL.includes('//localhost')) {
    credentials = 'omit';
  }

  if (productId) {
    try {
      const response = await fetch(
        `${API_URL}/testimonials/?product_id=${productId}`,
        {
          method: 'GET',
          credentials: credentials,
        }
      );
      testimonials = response.json();
    } catch (e) {
      console.error(e);
    }
  } else {
    console.error('Error: id required');
  }

  return testimonials;
};

/**
 * getProductList()
 *
 * Retrieves product list as defined from django api
 * GET /products
 */
export const getProductList = async () => {
  const { API_URL } = getConfig();
  let products;

  var credentials = 'include';
  if (API_URL.includes('//localhost')) {
    credentials = 'omit';
  }

  try {
    const response = await fetch(`${API_URL}/products/`, {
      method: 'GET',
      credentials: credentials,
    });
    products = await response.json();
  } catch (e) {
    console.error(e);
  }

  return products;
};

/**
 * getSiteConfig()
 *
 * Retrieves site_config as defined from django api
 * GET /active/site_config
 */
export const getSiteConfig = async () => {
  const { API_URL } = getConfig();
  let config;

  var credentials = 'include';
  if (API_URL.includes('//localhost')) {
    credentials = 'omit';
  }

  try {
    const response = await fetch(`${API_URL}/active/site_config/`, {
      method: 'GET',
      credentials: credentials,
    });
    config = await response.json();
  } catch (e) {
    console.error(e);
  }

  return config;
};
