import { useDispatch, useSelector } from "react-redux"
import { addListData, addListItem, removeListItem } from "../Slices/ListSlice"

const useList = () => {
    const dispatch = useDispatch()
    const currentList = useSelector(state => state.list.list)

    const addToList = (name, path) => {
        dispatch(addListItem({ name, path }))
    }
    const addtoData = (data, path) => {
        dispatch(addListData({ data, path }))
    }
    const removeFromList = (name) => {
        dispatch(removeListItem(name))
    }
    return { addToList, removeFromList, addtoData, currentList }
}

export default useList
