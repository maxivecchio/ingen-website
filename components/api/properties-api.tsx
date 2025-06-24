import { ServerUrl } from "@/lib/utils"
import axios from "axios"

const API_BASE_URL = `${ServerUrl}/myprops`

// Property Service
export const propertyService = {
    async getAll(filters?: {
        status?: string
        property_type?: string
        manager?: string
        min_price?: number
        max_price?: number
        city?: string
        search?: string
        page?: number
        limit?: number
    }) {
        const params = new URLSearchParams()

        if (filters?.status) params.append("status", filters.status)
        if (filters?.property_type && filters.property_type !== "all") {
            params.append("propertyTypeId", filters.property_type)
        }
        if (filters?.manager) params.append("managerId", filters.manager)
        if (filters?.min_price !== undefined) params.append("minPrice", filters.min_price.toString())
        if (filters?.max_price !== undefined) params.append("maxPrice", filters.max_price.toString())
        if (filters?.city) params.append("city", filters.city)
        if (filters?.search) params.append("search", filters.search)
        if (filters?.page) params.append("page", filters.page.toString())
        if (filters?.limit) params.append("limit", filters.limit.toString())

        const queryString = params.toString()
        const accountId = "684cb03b2d282f47c65cd8c1"
        const url = `${API_BASE_URL}/properties/visitors/properties/${accountId}${queryString ? `?${queryString}` : ""}`

        const response = await axios.get(url)
        return response.data
    },

    async getById(token, id: string) {
        const response = await axios.get(`${API_BASE_URL}/properties/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

}

// Property Type Service
export const propertyTypeService = {
    async getAll(token, filters?: {
        page?: number
        limit?: number
    }) {
        const params = new URLSearchParams()

        if (filters?.page) params.append("page", filters.page.toString())
        if (filters?.limit) params.append("limit", filters.limit.toString())

        console.log(filters);

        const queryString = params.toString()
        const url = `${API_BASE_URL}/property-types${queryString ? `?${queryString}` : ""}`

        const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async getById(token, id: string) {
        const response = await axios.get(`${API_BASE_URL}/property-types/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async create(token, data: any) {
        const response = await axios.post(`${API_BASE_URL}/property-types`, data, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async update(token, id: string, data: any) {
        const response = await axios.patch(`${API_BASE_URL}/property-types/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async delete(token, id: string) {
        await axios.delete(`${API_BASE_URL}/property-types/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    },
}

// Address Service
export const addressService = {
    async getAll(token, filters?: { city?: string; country?: string, page?: number, limit?: number }) {
        const params = new URLSearchParams()

        if (filters?.city) params.append("city", filters.city)
        if (filters?.country) params.append("country", filters.country)
        if (filters?.page) params.append("page", filters.page.toString())
        if (filters?.limit) params.append("limit", filters.limit.toString())

        const queryString = params.toString()
        const url = `${API_BASE_URL}/addresses${queryString ? `?${queryString}` : ""}`

        const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async getById(token, id: string) {
        const response = await axios.get(`${API_BASE_URL}/addresses/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async create(token, data: any) {
        const response = await axios.post(`${API_BASE_URL}/addresses`, data, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async update(token, id: string, data: any) {
        const response = await axios.patch(`${API_BASE_URL}/addresses/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async delete(token, id: string) {
        await axios.delete(`${API_BASE_URL}/addresses/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    },

    async getByCity(token, city: string) {
        const response = await axios.get(`${API_BASE_URL}/addresses?city=${city}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async getByCountry(token, country: string) {
        const response = await axios.get(`${API_BASE_URL}/addresses?country=${country}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },
}

// Manager Service
export const managerService = {
    async getAll(token, status?: string) {
        const url = status ? `${API_BASE_URL}/managers?status=${status}` : `${API_BASE_URL}/managers`

        const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async getById(token, id: string) {
        const response = await axios.get(`${API_BASE_URL}/managers/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async getByEmail(token, email: string) {
        const response = await axios.get(`${API_BASE_URL}/managers/email/${email}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async create(token, data: any) {
        const response = await axios.post(`${API_BASE_URL}/managers`, data, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async update(token, id: string, data: any) {
        const response = await axios.patch(`${API_BASE_URL}/managers/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async delete(token, id: string) {
        await axios.delete(`${API_BASE_URL}/managers/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    },

    async getByStatus(token, status: string) {
        const response = await axios.get(`${API_BASE_URL}/managers?status=${status}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },
}

// File Service
export const fileService = {
    async getAll(token, filters?: { reference_id?: string; sector?: string }) {
        const params = new URLSearchParams()

        if (filters?.reference_id) params.append("reference_id", filters.reference_id)
        if (filters?.sector) params.append("sector", filters.sector)

        const queryString = params.toString()
        const url = `${API_BASE_URL}/files${queryString ? `?${queryString}` : ""}`

        const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async getById(token, id: string) {
        const response = await axios.get(`${API_BASE_URL}/files/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async create(token, data: any) {
        const response = await axios.post(`${API_BASE_URL}/files`, data, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async update(token, id: string, data: any) {
        const response = await axios.patch(`${API_BASE_URL}/files/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async delete(token, id: string) {
        await axios.delete(`${API_BASE_URL}/files/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    },

    async getByReference(token, referenceId: string) {
        const response = await axios.get(`${API_BASE_URL}/files?reference_id=${referenceId}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async getBySector(token, sector: string) {
        const response = await axios.get(`${API_BASE_URL}/files?sector=${sector}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },
}

export const statusService = {
    async getAll(token, filters?: {
        page?: number
        limit?: number
    }) {
        const params = new URLSearchParams()

        if (filters?.page) params.append("page", filters.page.toString())
        if (filters?.limit) params.append("limit", filters.limit.toString())

        console.log(filters);

        const queryString = params.toString()
        const url = `${API_BASE_URL}/status${queryString ? `?${queryString}` : ""}`

        const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async getById(token, id: string) {
        const response = await axios.get(`${API_BASE_URL}/status/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async create(token, data: any) {
        const response = await axios.post(`${API_BASE_URL}/status`, data, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async update(token, id: string, data: any) {
        const response = await axios.patch(`${API_BASE_URL}/status/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })
        return response.data
    },

    async delete(token, id: string) {
        await axios.delete(`${API_BASE_URL}/status/${id}`, { headers: { Authorization: `Bearer ${token}` } })
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
