import { createSlice, nanoid } from "@reduxjs/toolkit";

export const ListSlice = createSlice({
    name: "list",
    initialState: {
        list: [
            { name: 'Home', path: 'home', data: [] }
        ],
    },
    reducers: {
        addListItem: (state, action) => {
            const data = { ...action.payload, data: [] };
            state.list = [...state.list, data];
        },
        removeListItem: (state, action) => {
            state.list = state.list.filter((e) => e.name !== action.payload);
        },
        addListData: (state, action) => {
            const { path, data } = action.payload;
            const newData = { ...data, id: nanoid() }
            state.list = state.list.map(item =>
                item.path === path ? { ...item, data: [...item.data, newData] } : item
            );
            state.list[0].data = [...state.list[0].data, newData]
        },
        editListItem: (state, action) => {
            const { prevName, newName } = action.payload;
            state.list = state.list.map(item => {
                if (item.name === prevName) {
                    return { ...item, name: newName };
                }
                return item;
            });
        },
        deleteTask: (state, action) => {
            const { path, taskId } = action.payload;
            state.list = state.list.map((list) => {
                if (list.path === path) {
                    const newData = list.data.filter((task) => task.id !== taskId);
                    list = { ...list, data: newData }
                    return list
                } else {
                    return list
                }

            });

            state.list[0].data = state.list[0].data.filter((task) => task.id !== taskId);
        },
        editTaskData: (state, action) => {
            const { path, updatedTask } = action.payload;

            state.list = state.list.map((list) => {
                if (list.path === path) {
                    list.data = list.data.map((task) =>
                        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
                    );
                }
                return list;
            });

            state.list[0].data = state.list[0].data.map((task) =>
                task.id === updatedTask.id ? { ...task, ...updatedTask } : task
            );
        },

        setCheck: (state, action) => {
            const { path, id } = action.payload;
            state.list.forEach((list) => {
                if (list.path === path) {
                    list.data.forEach((task) => {
                        if (task.id === id) {
                            task.checked = !task.checked;
                        }
                    });
                }
            });
            state.list[0].data = state.list[0].data.map((task) =>
                task.id === id ? { ...task, checked: !task.checked } : task
            );
        },
        // updateHomeListData: (state, action) => {
        //     const { updatedTask } = action.payload;
        //     const id = updatedTask?.id;

        //     state.list[0].data = state.list[0].data.map((task) =>
        //         task.id === id ? {...updatedTask } : task
        //     );
        // },

    },
});

export const { addListItem, removeListItem, addListData, editListItem, setCheck, deleteTask, editTaskData } = ListSlice.actions;

export const ListReducer = ListSlice.reducer;
