import { ServerUrl } from "@/lib/utils"
import axios from "axios"

const API_BASE_URL = `${ServerUrl}/code-blog`
const accountId = "684cb03b2d282f47c65cd8c1"

// Property Service
export const blogService = {
    async getAll(filters?: {
        status?: string
        search?: string
        page?: number
        limit?: number
    }) {
        const params = new URLSearchParams()

        if (filters?.status) params.append("status", filters.status)
        if (filters?.search) params.append("search", filters.search)
        if (filters?.page) params.append("page", filters.page.toString())
        if (filters?.limit) params.append("limit", filters.limit.toString())

        const queryString = params.toString()
        const url = `${API_BASE_URL}/visitors/posts/${accountId}${queryString ? `?${queryString}` : ""}`

        const response = await axios.get(url)
        return response.data
    },

     async getAllCategories(filters?: {
        status?: string
        search?: string
        page?: number
        limit?: number
    }) {
        const params = new URLSearchParams()

        if (filters?.search) params.append("search", filters.search)
        if (filters?.page) params.append("page", filters.page.toString())
        if (filters?.limit) params.append("limit", filters.limit.toString())

        const queryString = params.toString()
        const url = `${API_BASE_URL}/visitors/categories/${accountId}${queryString ? `?${queryString}` : ""}`

        const response = await axios.get(url)
        return response.data
    },

    async getById(id: string) {
        const response = await axios.get(`${API_BASE_URL}/properties/visitors/properties/view/${id}?account=${accountId}`);
        return response.data;
    },

}

// API con autenticación
export const createMypropsApiClient = (token?: string) => {
    const apiClient = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    })

    // Interceptor para manejar respuestas
    apiClient.interceptors.response.use(
        (response) => response.data,
        (error) => {
            if (error.response?.status === 401) {
                console.error("Token expirado o inválido")
            }
            throw new Error(error.response?.data?.message || error.message)
        },
    )

    return {
        properties: {
            getAll: (filters?: any) => {
                const params = new URLSearchParams()
                if (filters) {
                    Object.entries(filters).forEach(([key, value]) => {
                        if (value !== undefined) {
                            params.append(key, String(value))
                        }
                    })
                }
                const queryString = params.toString()
                return apiClient.get(`/properties${queryString ? `?${queryString}` : ""}`)
            },
            getById: (id: string) => apiClient.get(`/properties/${id}`),
            create: (data: any) => apiClient.post("/properties", data),
            update: (id: string, data: any) => apiClient.patch(`/properties/${id}`, data),
            delete: (id: string) => apiClient.delete(`/properties/${id}`),
        },

        propertyTypes: {
            getAll: () => apiClient.get("/property-types"),
            getById: (id: string) => apiClient.get(`/property-types/${id}`),
            create: (data: any) => apiClient.post("/property-types", data),
            update: (id: string, data: any) => apiClient.patch(`/property-types/${id}`, data),
            delete: (id: string) => apiClient.delete(`/property-types/${id}`),
        },

        addresses: {
            getAll: (filters?: any) => {
                const params = new URLSearchParams()
                if (filters) {
                    Object.entries(filters).forEach(([key, value]) => {
                        if (value !== undefined) {
                            params.append(key, String(value))
                        }
                    })
                }
                const queryString = params.toString()
                return apiClient.get(`/addresses${queryString ? `?${queryString}` : ""}`)
            },
            getById: (id: string) => apiClient.get(`/addresses/${id}`),
            create: (data: any) => apiClient.post("/addresses", data),
            update: (id: string, data: any) => apiClient.patch(`/addresses/${id}`, data),
            delete: (id: string) => apiClient.delete(`/addresses/${id}`),
        },

        managers: {
            getAll: (status?: string) => apiClient.get(status ? `/managers?status=${status}` : "/managers"),
            getById: (id: string) => apiClient.get(`/managers/${id}`),
            getByEmail: (email: string) => apiClient.get(`/managers/email/${email}`),
            create: (data: any) => apiClient.post("/managers", data),
            update: (id: string, data: any) => apiClient.patch(`/managers/${id}`, data),
            delete: (id: string) => apiClient.delete(`/managers/${id}`),
        },

        files: {
            getAll: (filters?: any) => {
                const params = new URLSearchParams()
                if (filters) {
                    Object.entries(filters).forEach(([key, value]) => {
                        if (value !== undefined) {
                            params.append(key, String(value))
                        }
                    })
                }
                const queryString = params.toString()
                return apiClient.get(`/files${queryString ? `?${queryString}` : ""}`)
            },
            getById: (id: string) => apiClient.get(`/files/${id}`),
            create: (data: any) => apiClient.post("/files", data),
            update: (id: string, data: any) => apiClient.patch(`/files/${id}`, data),
            delete: (id: string) => apiClient.delete(`/files/${id}`),
        },
    }
}

// Hook personalizado para usar los servicios con autenticación
export const useMypropsApiServices = (token?: string) => {
    return createMypropsApiClient(token)
}
