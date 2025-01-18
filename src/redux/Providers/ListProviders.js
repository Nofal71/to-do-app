import { useDispatch, useSelector } from "react-redux"
import { addListData, addListItem, editListItem, removeListItem } from "../Slices/ListSlice"

const useList = () => {
    const dispatch = useDispatch()
    const currentList = useSelector(state => state.list.list)

    const addToList = (name, path) => {
        dispatch(addListItem({ name, path }))
    }
    const addtoData = (data, path, tags) => {
        dispatch(addListData({ data, path, tags }))
    }
    const removeFromList = (name) => {
        dispatch(removeListItem(name))
    }
    const editListName = (prevName, newName) => {
        dispatch(editListItem({ prevName, newName }))
    }
    return { addToList, removeFromList, addtoData, editListName, currentList }
}

export default useList
