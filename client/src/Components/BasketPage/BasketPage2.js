import React, { useState, useEffect } from 'react'

const initialProductList = [
  { id: 1, name: 'produit 1', price: 50, quantity: 1 },
  { id: 2, name: 'produit 2', price: 75, quantity: 2 },
  { id: 3, name: 'produit 3', price: 20, quantity: 5 }
]

const BasketPage2 = () => {
  const [productList, setProductList] = useState(initialProductList)
  const [totalPriceList, setTotalPriceList] = useState(initialProductList.map(product => product.price * product.quantity))
  const [newProduct, setNewProduct] = useState({ id: '', name: '', price: '', quantity: 1 })

  const addQuantity = e => {
    const newQuantity = e.target.value
    if (newQuantity === '0' || newQuantity === '') {
      if (window.confirm('Etes-vous sûr de bien vouloir retirer ce produit de la liste ?')) {
        let arr = [...productList]
        const row = arr.find(f => f.name === e.target.name)
        arr = arr.filter(f => f !== row)
        setProductList(arr)
      } else {
        setProductList(productList)
      }
    } else if (newQuantity !== '') {
      const newArr = [...productList]
      const row = newArr.find(f => f.name === e.target.name)
      row.quantity = parseInt(newQuantity)
      setProductList(newArr)
    }
  }

  const onChange = e => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  const addProduct = e => {
    let tempIndex
    while (productList.map(product => product.id).includes(tempIndex)) {
      tempIndex = Math.floor(Math.random() * 10)
    }
    setNewProduct({ ...newProduct, id: tempIndex })
    e.preventDefault()
    const newArray = [...productList]
    newArray.push(newProduct)
    setProductList(newArray)
  }

  useEffect(() => { setTotalPriceList(productList.map(product => product.price * product.quantity)) }
    , [productList]
  )

  return (
    <div className='App'>
      <h1>Ma commande</h1>
      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
            <th>Prix total</th>
          </tr>
        </thead>
        <tbody>
          {productList.map(product =>
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price} €</td>
              <td><input id={product.id} type='number' name={product.name} value={product.quantity} onChange={addQuantity} /></td>
              <td>{product.quantity * product.price}</td>
            </tr>)}
        </tbody>
      </table>
      <p>Montant de la commande:
        <span style={{ fontWeight: 'bold' }}>
          {totalPriceList.reduce((accumulator, currentValue) => accumulator + currentValue)}€
        </span>
      </p>
      <form onSubmit={addProduct}>
        <h2>Ajouter un produit</h2>
        <div className='field'>
          <label htmlFor='name'>Nom</label>
          <input type='text' id='name' name='name' onChange={onChange} value={newProduct.name} required />
        </div>
        <div className='field'>
          <label htmlFor='price'>Prix</label>
          <input type='number' id='price' name='price' onChange={onChange} value={newProduct.price} required />
        </div>
        <button>Ajouter</button>
      </form>

    </div>
  )
}

export default BasketPage2
