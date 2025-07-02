// Product Service with ApperClient Integration
export const getProducts = async () => {
  try {
    const { ApperClient } = window.ApperSDK
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "description" } },
        { field: { Name: "price" } },
        { field: { Name: "sale_price" } },
        { field: { Name: "image" } },
        { field: { Name: "images" } },
        { field: { Name: "in_stock" } },
        { field: { Name: "rating" } },
        { field: { Name: "reviews" } },
        { field: { Name: "featured" } },
        { field: { Name: "features" } },
        { field: { Name: "Tags" } },
        { 
          field: { name: "category" },
          referenceField: { field: { Name: "Name" } }
        }
      ],
      orderBy: [
        { fieldName: "Name", sorttype: "ASC" }
      ]
    }
    
    const response = await apperClient.fetchRecords('product', params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }
    
    // Transform response data to match existing structure
    const transformedData = (response.data || []).map(product => ({
      ...product,
      name: product.Name,
      salePrice: product.sale_price,
      inStock: product.in_stock,
      category: product.category?.Name || product.category
    }))
    
    return transformedData
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error fetching products:", error?.response?.data?.message)
      throw new Error(error.response.data.message)
    } else {
      console.error("Error fetching products:", error.message)
      throw new Error(error.message)
    }
  }
}

export const getProductById = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "description" } },
        { field: { Name: "price" } },
        { field: { Name: "sale_price" } },
        { field: { Name: "image" } },
        { field: { Name: "images" } },
        { field: { Name: "in_stock" } },
        { field: { Name: "rating" } },
        { field: { Name: "reviews" } },
        { field: { Name: "featured" } },
        { field: { Name: "features" } },
        { field: { Name: "Tags" } },
        { 
          field: { name: "category" },
          referenceField: { field: { Name: "Name" } }
        }
      ]
    }
    
    const response = await apperClient.getRecordById('product', id, params)
    
    if (!response || !response.data) {
      throw new Error('Product not found')
    }
    
    // Transform response data to match existing structure
    const product = response.data
    return {
      ...product,
      name: product.Name,
      salePrice: product.sale_price,
      inStock: product.in_stock,
      category: product.category?.Name || product.category
    }
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error(`Error fetching product with ID ${id}:`, error?.response?.data?.message)
      throw new Error(error.response.data.message)
    } else {
      console.error(`Error fetching product with ID ${id}:`, error.message)
      throw new Error(error.message)
    }
  }
}

export const getProductsByCategory = async (categoryName) => {
  try {
    const { ApperClient } = window.ApperSDK
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "description" } },
        { field: { Name: "price" } },
        { field: { Name: "sale_price" } },
        { field: { Name: "image" } },
        { field: { Name: "images" } },
        { field: { Name: "in_stock" } },
        { field: { Name: "rating" } },
        { field: { Name: "reviews" } },
        { field: { Name: "featured" } },
        { field: { Name: "features" } },
        { field: { Name: "Tags" } },
        { 
          field: { name: "category" },
          referenceField: { field: { Name: "Name" } }
        }
      ],
      whereGroups: [
        {
          operator: "AND",
          subGroups: [
            {
              conditions: [
                {
                  fieldName: "category",
                  operator: "Contains",
                  values: [categoryName]
                }
              ]
            }
          ]
        }
      ]
    }
    
    const response = await apperClient.fetchRecords('product', params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }
    
    // Transform response data to match existing structure
    const transformedData = (response.data || []).map(product => ({
      ...product,
      name: product.Name,
      salePrice: product.sale_price,
      inStock: product.in_stock,
      category: product.category?.Name || product.category
    }))
    
    return transformedData
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error fetching products by category:", error?.response?.data?.message)
      throw new Error(error.response.data.message)
    } else {
      console.error("Error fetching products by category:", error.message)
      throw new Error(error.message)
    }
  }
}

export const searchProducts = async (query) => {
  try {
    const { ApperClient } = window.ApperSDK
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "description" } },
        { field: { Name: "price" } },
        { field: { Name: "sale_price" } },
        { field: { Name: "image" } },
        { field: { Name: "images" } },
        { field: { Name: "in_stock" } },
        { field: { Name: "rating" } },
        { field: { Name: "reviews" } },
        { field: { Name: "featured" } },
        { field: { Name: "features" } },
        { field: { Name: "Tags" } },
        { 
          field: { name: "category" },
          referenceField: { field: { Name: "Name" } }
        }
      ],
      whereGroups: [
        {
          operator: "OR",
          subGroups: [
            {
              conditions: [
                {
                  fieldName: "Name",
                  operator: "Contains",
                  values: [query]
                }
              ]
            },
            {
              conditions: [
                {
                  fieldName: "description",
                  operator: "Contains",
                  values: [query]
                }
              ]
            },
            {
              conditions: [
                {
                  fieldName: "Tags",
                  operator: "Contains",
                  values: [query]
                }
              ]
            }
          ]
        }
      ]
    }
    
    const response = await apperClient.fetchRecords('product', params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }
    
    // Transform response data to match existing structure
    const transformedData = (response.data || []).map(product => ({
      ...product,
      name: product.Name,
      salePrice: product.sale_price,
      inStock: product.in_stock,
      category: product.category?.Name || product.category
    }))
    
    return transformedData
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error searching products:", error?.response?.data?.message)
      throw new Error(error.response.data.message)
    } else {
      console.error("Error searching products:", error.message)
      throw new Error(error.message)
    }
  }
}

export const getFeaturedProducts = async () => {
  try {
    const { ApperClient } = window.ApperSDK
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "description" } },
        { field: { Name: "price" } },
        { field: { Name: "sale_price" } },
        { field: { Name: "image" } },
        { field: { Name: "images" } },
        { field: { Name: "in_stock" } },
        { field: { Name: "rating" } },
        { field: { Name: "reviews" } },
        { field: { Name: "featured" } },
        { field: { Name: "features" } },
        { field: { Name: "Tags" } },
        { 
          field: { name: "category" },
          referenceField: { field: { Name: "Name" } }
        }
      ],
      where: [
        {
          FieldName: "featured",
          Operator: "EqualTo",
          Values: [true]
        }
      ]
    }
    
    const response = await apperClient.fetchRecords('product', params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }
    
    // Transform response data to match existing structure
    const transformedData = (response.data || []).map(product => ({
      ...product,
      name: product.Name,
      salePrice: product.sale_price,
      inStock: product.in_stock,
      category: product.category?.Name || product.category
    }))
    
    return transformedData
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error fetching featured products:", error?.response?.data?.message)
      throw new Error(error.response.data.message)
    } else {
      console.error("Error fetching featured products:", error.message)
      throw new Error(error.message)
    }
  }
}

export const getOnSaleProducts = async () => {
  try {
    const { ApperClient } = window.ApperSDK
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "description" } },
        { field: { Name: "price" } },
        { field: { Name: "sale_price" } },
        { field: { Name: "image" } },
        { field: { Name: "images" } },
        { field: { Name: "in_stock" } },
        { field: { Name: "rating" } },
        { field: { Name: "reviews" } },
        { field: { Name: "featured" } },
        { field: { Name: "features" } },
        { field: { Name: "Tags" } },
        { 
          field: { name: "category" },
          referenceField: { field: { Name: "Name" } }
        }
      ],
      where: [
        {
          FieldName: "sale_price",
          Operator: "HasValue",
          Values: []
        }
      ]
    }
    
    const response = await apperClient.fetchRecords('product', params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }
    
    // Transform response data to match existing structure
    const transformedData = (response.data || []).map(product => ({
      ...product,
      name: product.Name,
      salePrice: product.sale_price,
      inStock: product.in_stock,
      category: product.category?.Name || product.category
    }))
    
    return transformedData
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error fetching sale products:", error?.response?.data?.message)
      throw new Error(error.response.data.message)
    } else {
      console.error("Error fetching sale products:", error.message)
      throw new Error(error.message)
    }
  }
}