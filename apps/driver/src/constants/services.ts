export const LOCATE_SERVICE = 'LOCATE'
export const RECEIVER_SERVICE = 'RECEIVER'

export interface UserInforPayload {
    _id: string,
    full_name: string,
    phone: string,
    role: string,
    latitude: string,
    longitude: string,
    is_Vip: boolean
}