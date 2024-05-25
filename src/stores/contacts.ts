import { defineStore } from 'pinia'
import { axiosInstance } from '@/helpers/axiosInstance'
import type { IContactData, ICreateContact } from '@/interface/IContact'

interface IState {
    allContacts: {
        contacts: IContactData[]
        loading: boolean
        errorMessage: string
    }
    currentContact: {
        contact: IContactData | null
        loading: boolean
        errorMessage: string
    }
}

export const useContacts = defineStore('contacts', {
    state: (): IState => ({
        allContacts: {
            contacts: [],
            loading: false,
            errorMessage: ''
        },
        currentContact: {
            contact: null,
            loading: false,
            errorMessage: ''
        }
    }),
    getters: {
        getContacts(): IContactData[] {
            return this.allContacts.contacts
        },
        getCurrentContact(): IContactData | null {
            return this.currentContact.contact
        }
    },
    actions: {
        fetchContacts() {
            return new Promise((resolve, reject) => {
                try {
                    const res = axiosInstance.get('/api/contacts')
                    resolve(res)
                } catch (err) {
                    reject(err)
                }
            })
                .then((res) => [res, null])
                .catch((err) => [null, err])
        },
        createContact(data: ICreateContact) {
            return new Promise((resolve, reject) => {
                try {
                    const res = axiosInstance.post('/api/contact/create', data)
                    resolve(res)
                } catch (err) {
                    reject(err)
                }
            })
                .then((res) => [res, null])
                .catch((err) => [null, err])
        },
        fetchCurrentContact(id: string) {
            return new Promise((resolve, reject) => {
                try {
                    const res = axiosInstance.get(`/api/contact/${id}`)
                    resolve(res)
                } catch (err) {
                    reject(err)
                }
            })
                .then((res) => [res, null])
                .catch((err) => [null, err])
        },
        updateContact(id: string | number | undefined, data: ICreateContact) {
            return new Promise((resolve, reject) => {
                try {
                    const res = axiosInstance.put(`/api/contact/update/${id}`, data)
                    resolve(res)
                } catch (err) {
                    reject(err)
                }
            })
                .then((res) => [res, null])
                .catch((err) => [null, err])
        },
        deleteContact(id: string | number) {
            return new Promise((resolve, reject) => {
                try {
                    const res = axiosInstance.delete(`/api/contact/delete/${id}`)
                    resolve(res)
                } catch (err) {
                    reject(err)
                }
            })
                .then((res) => [res, null])
                .catch((err) => [null, err])
        }
    }
})
