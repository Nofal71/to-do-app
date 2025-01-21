import { useDispatch, useSelector } from "react-redux"
import { addListData, addListItem, deleteTask, editListItem, editTaskData, refreshHome, removeListItem, setCheck } from "../Slices/ListSlice"

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
    const setMarkAsDone = (path, id) => {
        dispatch(setCheck({ path, id }))
    }
    const DeleteTask = (path, taskId) => {
        dispatch(deleteTask({ path, taskId }))
    }
    const EditTask = (path, updatedTask) => {
        dispatch(editTaskData({ path, updatedTask }))
    }
    const refreshHomeData = (name) => {
        let data = [];
        currentList?.map(list => {
            if (name !== list.name) {
                data = [...list?.data]
            }
        })
        console.log(data)
        dispatch(refreshHome(data))
    }

    return { addToList, removeFromList, addtoData, editListName, setMarkAsDone, DeleteTask, EditTask, refreshHomeData, currentList }
}

export default useList
