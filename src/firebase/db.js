import { getFirestore , collection, query, doc, getDocs, getDoc, addDoc, where , documentId , writeBatch, Timestamp  } from 'firebase/firestore'
import { app } from './config.js'


const db = getFirestore(app);

export const getItems = async () => {
    const querySnapshot = await getDocs(collection(db, "items"))
    const items = []
    querySnapshot.forEach((doc) => {
        items.push({...doc.data(), id: doc.id})
    })

    return items
}

export const getItem = async (id) => {
    const docRef = doc(db, "items", id);
    const docSnap = await getDoc(docRef);

/*     if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        console.log("No such document!");
    } */

    return docSnap.data()
}

export const getCategorys = async () => {
    const querySnapshot = await getDocs(collection(db, "categorys"))
    const categorys = []
    querySnapshot.forEach((doc) => {
        categorys.push({...doc.data(), id: doc.id})
    })
    categorys.sort((a, b) => a.order - b.order);
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
            data: objOrder,
            createdAt: Timestamp.now()
        });
    }
    return { orderAdded, outOfStock}

    /* const batch = writeBatch(db)
    const outOfStock = []

    docs.forEach(doc =>{
        const dataDoc = doc.data()
        const stockDb = dataDoc.stock

        const productAddedToCart = cart.find(prod => prod.id === doc.id)
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
        orderAdded = await addDoc(ordersRef, objOrder)
    }
    return { orderAdded, outOfStock} */



    /* const docRef = await addDoc(collection(db, "items"), {
        categoryId: item.categoryId,
        detalle: item.detalle,
        img: item.img,
        name: item.name,
        price: item.price,
        stock: item.stock 
    }); */
}

/* export const setItems = async (items) => {
    console.log("En firebas")
    for (const item of items) {
        console.log(item.name);
        const docRef = await addDoc(collection(db, "items"), {
            categoryId: item.categoryId,
            detalle: item.detalle,
            img: item.img,
            name: item.name,
            price: item.price,
            stock: item.stock 
        });
    }
} */


