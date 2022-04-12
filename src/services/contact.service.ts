import { AxiosResponse } from "axios";
import { Contacts } from "../models/types";
import { apiBaseURL } from "./contacts";


export class ContactService {
    static getData() : Promise<AxiosResponse<Contacts[]>> { 
        return apiBaseURL.get('/contacts')
    }

    static getFilterData(contact:Contacts) : Promise<AxiosResponse<Contacts[]>> { 
        return apiBaseURL.get(`/contacts/${contact.name}`)
    }

    static getDataId(contact: Contacts) : Promise<AxiosResponse<Contacts[]>> { 
        return apiBaseURL.get(`/contacts/${contact.id}`)
    }

    static createData(contact: Contacts) : Promise<AxiosResponse<Contacts>> {
        return apiBaseURL.post('/contacts', contact)
    }

    static updateData(contact: Contacts) : Promise<AxiosResponse<Contacts>> {
        return apiBaseURL.put(`/contacts/${contact.id}`, contact)
    }   

    static deleteData(contactId: Contacts) : Promise<AxiosResponse<Contacts>> {
        return apiBaseURL.delete(`/contacts/${contactId.id}`,)
    }   
}