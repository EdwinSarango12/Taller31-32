import { create } from "zustand"
import axios from "axios"
import { toast } from "react-toastify"


const getAuthHeaders = () => {
    const storedUser = JSON.parse(localStorage.getItem("auth-token"))
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser?.state?.token}`,
        }
    }
}

const storeTreatments = create(set=>({
    modal:false,
    toggleModal: (modalType) => set((state) => ({ modal: state.modal === modalType ? null : modalType })),

    
    registerTreatments:async(data)=>{
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/registro`;
            const respuesta = await axios.post(url, data,getAuthHeaders())
            console.log(respuesta)
            set((state)=>({modal:!state.modal}))
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.error(error)
        }
    },

    deleteTreatments:async(id)=>{
        const isConfirmed  = confirm("Vas a eliminar el tratamiento ¿Estás seguro de realizar esta acción?")
        if (isConfirmed ) {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/${id}`
                const respuesta = await axios.delete(url,getAuthHeaders())
                toast.success(respuesta.data.msg)
            } catch (error) {
                console.error(error)
            }
        }
    },
    payTreatments:async(data)=>{
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/pago`
            const respuesta = await axios.post(url,data,getAuthHeaders())
            set((state)=>({modal:!state.modal}))
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.error(error)
        }
        
    }
}))


export default storeTreatments
