export interface IContactCard {
    userId: number
    userName: string
    email: string
    img: string
    phone: string
}

export interface IOptions {
    option: string
    icon: string
}

export interface ICreateContact {
    id: number | string | undefined
    name: string | undefined
    email: string | undefined
    phone: string | undefined
}

export interface IContactData {
    id: number | string
    name: string
    email: string
    phone: string
    cerated_at: string | Date
    updated_at: string | Date
}
