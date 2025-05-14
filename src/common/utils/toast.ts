import { toast } from "react-toastify"
import { isArray } from "./check-valid";

const customErrorToast = (error: any) => {
    let errorMessage = error?.response?.data?.message;

    if (isArray(errorMessage)) {
        errorMessage = errorMessage.join(',')
    }

    toast.error(errorMessage)
}

export {
    customErrorToast
}

