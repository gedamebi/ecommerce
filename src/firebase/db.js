import { getFirestore , collection, query, doc, getDocs, getDoc, addDoc, where , documentId , writeBatch } from 'firebase/firestore'
import { app } from './config.js'


const db = getFirestore(app)

export const getItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'items'))
    const items = []
    querySnapshot.forEach((doc) => {
        items.push({...doc.data(), id: doc.id})
    })
    return items
}

export const getItem = async (id) => {
    const docRef = doc(db, 'items', id)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
}

export const getCategorys = async () => {
    const querySnapshot = await getDocs(collection(db, 'categorys'))
    const categorys = []
    querySnapshot.forEach((doc) => {
        categorys.push({...doc.data(), id: doc.id})
    })
    categorys.sort((a, b) => a.order - b.order)
    return categorys
}

export const createOrder = async (objOrder) => {
    const products = objOrder.items
    const ids = products.map(prod =>  prod.producto.id)
    const productsRef = query(collection(db, 'items'), where( documentId(), 'in' , ids))
    let orderAdded = ""
    const { docs } = await getDocs(productsRef)

    const batch = writeBatch(db)
    const outOfStock = []

    docs.forEach(doc =>{
        const dataDoc = doc.data()
        const stockDb = dataDoc.stock

        const productAddedToCart = objOrder.items.find(prod => prod.producto.id === doc.id)
        const prodQuantity = productAddedToCart?.quantity

        if(stockDb >= prodQuantity){
            batch.update(doc.ref, {stock: stockDb - prodQuantity})
        }else{
            outOfStock.push({id:doc.id, ...dataDoc})
        }
    })

    if(outOfStock.length ===  0){
        batch.commit()
        const ordersRef = collection(db,'orders')
        orderAdded = await addDoc(ordersRef, {
            data: objOrder
        })
    }
    return { orderAdded, outOfStock}
}


