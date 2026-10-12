const API_URL = "https://solving-wallpapers-dependence-annie.trycloudflare.com/api/products";

// Create or update a product using the backend API
export const productUpsert = async (productId, data) => {
  if (productId !== null && productId !== undefined && productId !== "") {
    return updateProduct(Number(productId), data);
  }

  return createProduct(data);
};
// GET: Fetch all products
export const getProducts = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  return response.json();
};

// GET: Fetch a single product by ID
export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.status}`);
  }

  return response.json();
};

// POST: Create a new product
export const createProduct = async (product) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `Failed to create product: ${response.status}`);
  }

  return response.json();
};

// PUT: Update an existing product
export const updateProduct = async (id, product) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `Failed to update product: ${response.status}`);
  }
  if (response.status === 204) {
    return { id, ...product };
  }

  return response.json();
};

// DELETE: Remove a product
export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete product: ${response.status}`);
  }

  return true;
};
