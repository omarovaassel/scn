import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const endpoint = process.env.REACT_APP_ENDPOINT || "";

export const authUser = createAsyncThunk(
    "user/authUser", 
    async ({ login, password }, { rejectWithValue } ) => {
        try {
            const response = await fetch(
                `${endpoint}/users?login=${login}&password=${password}`
            );

            if(!response.ok){
                throw new Error("Server error!")
            }

            const data = await response.json()

            if(data.length < 1){
                throw new Error("There's no such user")
            }
            
            // самый первый пользователь, который был найден
            return data[0];

        } catch (error) {
            return rejectWithValue(error); 
        }
    }
)

export const regUser = createAsyncThunk(
    "user/regUser", 
    async ({ login, password, avatar }, { rejectWithValue } ) => {
        try {
            const response = await fetch(
                `${endpoint}/users?login=${login}&password=${password}&avatar=${avatar}`,
                {
                    method: "POST",
                    body: JSON.stringify({ login, password, avatar }),
                    headers: {"Content-type": "application/json"}
                }
            );

            const data = await response.json()

            return data[0];

        } catch (error) {
            return rejectWithValue(error); 
        }
    }
)

const UserSlice = createSlice({
    name: "user",
    initialState: {
        // user: null,
        user: {
            login: "anime",
            password: "qwerty",
            avatar: "https://img.freepik.com/free-photo/pomegranate-over-outline-floral-background_171337-11131.jpg?w=1060&t=st=1682607944~exp=1682608544~hmac=b96e569fb88fec4a578d6ddd274bd9401dcaead77f892971cc1d00042fbbd98b"
        },
        isLoading: false,
        error: null,
    },
    reducers: {
        dismissError(state){
            state.error = null
        },
        // auth(state, action){
        //     const user = users.find(
        //         (elem) => 
        //         elem.login === action.payload.login && 
        //         elem.password === action.payload.password
        //     );
        //     if(!user){
        //         state.error = "There's no such user :(";
        //     }
        //     if(user){
        //         state.user = user;
        //         state.error = null;
        //     }
        // },

        // здесь у нас функции, к примеру logout, выйти из авторизации
        // создание юзера и т.д.
        logOut(state) {
            state.user = null;
        },
        changeUser(state, action) {
          state.user.name = action.payload
        },
    },
    extraReducers: {
        // простой метод
        //похоже на обычнй редьюсер, здесь мы получаем state, то есть загружаем его, идет загрузка
        [authUser.pending] : (state) => {
            state.isLoading = true;
        },
        //на случай ошибки после окончания загрузки, здесь мы зотим передать ошибку в глобальную переменную
        [authUser.rejected] : (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [authUser.fulfilled] : (state, action) => {
            state.isLoading = false
            state.error = null;
            state.user = action.payload;
        },



        [regUser.pending] : (state) => {
            state.isLoading = true;
        },
        //на случай ошибки после окончания загрузки, здесь мы зотим передать ошибку в глобальную переменную
        [regUser.rejected] : (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [regUser.fulfilled] : (state, action) => {
            state.isLoading = false
            state.error = null;
            state.user = action.payload;
        }
    }
})

export const { changeUser, logOut, dismissError } = UserSlice.actions

export default UserSlice

// const [state, setState] = useState()

// чтобы написать это const [state, setState] пишем
// const {user, loading, error} = useSelector(state => state.user)

// чтобы написать это useState() пишем
// const dispatch = useDispatch()
// // click logout
// dispatch(logOut({id: 12}))
// dispatch(type: "user/logOut", payload: {id: 12})