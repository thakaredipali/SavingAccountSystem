import { TRANSACTION_HISTORY } from "../../constant/constants"
import { TransactionHistory } from "../../screens/Customer/Transaction/type"

export const getTransactionHistory = (data: TransactionHistory[]) => {
    return {
        type : TRANSACTION_HISTORY,
        data: data
    }
}