import { useDispatch, useSelector } from "react-redux"
import { addListItem, removeListItem } from "../Slices/ListSlice"

const useList = () => {
    const dispatch = useDispatch()
    const currentList = useSelector(state => state.list.list)

    const addToList = (name, path) => {
        dispatch(addListItem({ name, path }))
    }
    const removeFromList = (name) => {
        dispatch(removeListItem(name))
    }
    return { addToList, removeFromList, currentList }
}

export default useList
