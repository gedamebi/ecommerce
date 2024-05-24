import { cartContext } from "./cartContext"
import { useState } from "react"

export default function CartProvider ({ children }) {
    const [cart, setCart] = useState([])

    const addToCart = product => setCart([...cart, product])

    const removeItem = (id) => {
        const updatedCart = cart.filter(prod => prod.producto.id !== id)
        setCart(updatedCart)
    }

    const getTotal = () => {
        let total = 0
        cart.forEach(prod => {
            total += prod.quantity * prod.producto.price
        })
        return total
    }

    const clearCart = () => {
        setCart([])
    }

    const isInCart = (id) => {
        return cart.some(prod => prod.producto.id === id)
    }

    return (
        <cartContext.Provider value={{cart, addToCart, removeItem, getTotal, clearCart, isInCart}}>
            {children}
        </cartContext.Provider>
    )
}