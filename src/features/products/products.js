import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState = {
    products: [
    ],
    isLoading: false,
    error: '',
}

const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const res = await fetch('https://fakestoreapi.com/products?limit=5');
    const products = await res.json();

    return products;
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct(state) {
            state.products.push({
                id: 2,
                image: 'https://w7.pngwing.com/pngs/450/269/png-transparent-space-gray-iphone-x-showing-ios-and-iphone-4-iphone-8-plus-iphone-5-iphone-x-iphone-apple-gadget-electronics-mobile-phone-thumbnail.png',
                category: 'Smartphones',
                title: 'iPhone',
                price: '$599'
            })
        },
        deleteProduct(state, action) {
            state.products = state.products.filter(product => product.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                console.log(action.payload)
                state.products = action.payload;
                state.isLoading = false;
            }).addCase(fetchProducts.rejected, (state) => {
                state.isLoading = false
                state.error = 'Error loading the products. Please try again later'
            })
    }
})

export { fetchProducts }
export const { addProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;