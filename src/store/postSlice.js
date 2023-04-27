import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const endpoint = process.env.REACT_APP_ENDPOINT || "";

export const getPost = createAsyncThunk(
    "posts/getPost", 
    async({id}, {rejectWithValue}) => {
        try {
            const response = await fetch(
                `${endpoint}/posts/${id}`
            );

            if(!response.ok){
                throw new Error("Server error!")
            }

            const data = await response.json()
            // console.log(data);
            
            return data;

        } catch (error) {
            return rejectWithValue(error); 
        }
})

const PostSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        // простой метод
        //похоже на обычнй редьюсер, здесь мы получаем state, то есть загружаем его, идет загрузка
        [getPost.pending] : (state) => {
            state.isLoading = true;
        },
        //на случай ошибки после окончания загрузки, здесь мы хотим передать ошибку в глобальную переменную
        [getPost.rejected] : (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [getPost.fulfilled] : (state, action) => {
            state.isLoading = false
            state.error = null;
            state.posts = action.payload;
        },
    }
})

export default PostSlice;