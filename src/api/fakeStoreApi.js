/**
 * Reusable Fake Store API Service
 * Handles all CRUD operations using async/await and fetch API
 * Base URL: https://fakestoreapi.com
 */

const BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetch all products from the API
 * @returns {Promise<Array>} Array of product objects
 */
export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
  }
  return await response.json();
}

/**
 * Fetch all available product categories
 * @returns {Promise<Array<string>>} Array of category names
 */
export async function getCategories() {
  const response = await fetch(`${BASE_URL}/products/categories`);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
  }
  return await response.json();
}

/**
 * Fetch a single product by ID
 * @param {number|string} id
 * @returns {Promise<Object>}
 */
export async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product #${id}: ${response.status}`);
  }
  return await response.json();
}

/**
 * Add a new product (POST)
 * @param {Object} productData - { title, price, description, category, image }
 * @returns {Promise<Object>} Created product object with ID
 */
export async function createProduct(productData) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: productData.title.trim(),
      price: parseFloat(productData.price),
      description: productData.description.trim(),
      category: productData.category.trim(),
      image: productData.image.trim(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to add product: ${response.status} ${response.statusText}`);
  }

  const created = await response.json();
  // Ensure the returned object contains the submitted fields plus the API-assigned ID
  return {
    ...productData,
    price: parseFloat(productData.price),
    id: created.id || Date.now(),
    rating: { rate: 0, count: 0 },
  };
}

/**
 * Update an existing product (PUT)
 * @param {number|string} id - Product ID
 * @param {Object} productData - Updated product fields
 * @returns {Promise<Object>} Updated product object
 */
export async function updateProduct(id, productData) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: productData.title.trim(),
        price: parseFloat(productData.price),
        description: productData.description.trim(),
        category: productData.category.trim(),
        image: productData.image.trim(),
      }),
    });

    if (!response.ok) {
      // If FakeStore API rejects ID > 20 (newly added items), fallback gracefully for testing API
      console.warn(`API PUT responded with ${response.status}. Using local state simulation.`);
    } else {
      const data = await response.json();
      if (data && data.id) {
        return {
          ...productData,
          id: Number(id),
          price: parseFloat(productData.price),
        };
      }
    }
  } catch (err) {
    console.warn('Network error or CORS during PUT simulation:', err.message);
  }

  // Return updated object for session state
  return {
    ...productData,
    id: Number(id),
    price: parseFloat(productData.price),
  };
}

/**
 * Delete a product (DELETE)
 * @param {number|string} id - Product ID to delete
 * @returns {Promise<Object>} Response confirmation
 */
export async function deleteProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.warn(`API DELETE responded with ${response.status}. Proceeding with session deletion.`);
    } else {
      const result = await response.json();
      return result || { id };
    }
  } catch (err) {
    console.warn('Network error or CORS during DELETE simulation:', err.message);
  }

  return { id };
}
