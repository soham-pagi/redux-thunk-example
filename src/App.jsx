import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, deleteProduct, fetchProducts } from './features/products/products';

const buttonStyle = {
  padding: '1rem 1.5rem',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: 'blue',
  color: 'white'
}

export default function App() {
  const { products, error, isLoading } = useSelector(state => state.products)
  const dispatch = useDispatch();

  function handleAddProduct() {
    dispatch(addProduct());
  }

  function handleDeleteProduct(id) {
    dispatch(deleteProduct(id))
  }

  function fetch() {
    dispatch(fetchProducts())
  }

  return (
    <div style={{}}>
      <div style={{ margin: '1rem', position: 'sticky', top: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <button style={buttonStyle} onClick={handleAddProduct}>Add Product</button>

        <button style={buttonStyle} onClick={fetch}>Fetch Product</button>
      </div>

      {error && <p>Error {error}</p>}
      {isLoading && <p>Loading...</p>}

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 1rem' }}>
        {products && products.map((item, index) => (
          <li style={{ border: '1px solid blue', borderRadius: '10px', padding: '1rem', margin: '1rem 0' }} key={index}>
            <div style={{ display: 'flex', direction: 'flex-row', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4>Name: {item.title}</h4>
                <p>Category: {item.category}</p>
                <p>Price: {item.price}</p>
              </div>

              <img width={100} src={item.image} alt="image" />
            </div>
            <button style={{ ...buttonStyle, background: 'red', padding: '.5rem 1rem' }} onClick={() => handleDeleteProduct(item.id)}>Delete Product</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
