// Category Service with ApperClient Integration
export const getCategories = async () => {
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
        { field: { Name: "count" } },
        { field: { Name: "icon" } },
        { field: { Name: "Tags" } }
      ],
      orderBy: [
        { fieldName: "Name", sorttype: "ASC" }
      ]
    }
    
    const response = await apperClient.fetchRecords('category', params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }
    
    return response.data || []
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error fetching categories:", error?.response?.data?.message)
      throw new Error(error.response.data.message)
    } else {
      console.error("Error fetching categories:", error.message)
      throw new Error(error.message)
    }
  }
}

export const getCategoryById = async (id) => {
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
        { field: { Name: "count" } },
        { field: { Name: "icon" } },
        { field: { Name: "Tags" } }
      ]
    }
    
    const response = await apperClient.getRecordById('category', id, params)
    
    if (!response || !response.data) {
      throw new Error('Category not found')
    }
    
    return response.data
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error(`Error fetching category with ID ${id}:`, error?.response?.data?.message)
      throw new Error(error.response.data.message)
    } else {
      console.error(`Error fetching category with ID ${id}:`, error.message)
      throw new Error(error.message)
    }
  }
}