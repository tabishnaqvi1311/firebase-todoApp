// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDoc, getDocs, getFirestore } from "firebase/firestore"
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
    //firebaseConfig
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize cloud firestore
const db = getFirestore(app)

//create task
export const addATask = async(name, time) => {
    try{
        const docRef = await addDoc(collection(db, 'users'), {
            name: name,
            time: time
        });
        console.log('Document written with id:', docRef.id)
    }
    catch(error){
        console.log(error)
    }
}

//get all tasks
export const getTasks = async() => {
    const emptyArr = []
    try{
        const tasks = await getDocs(collection(db, 'users'));
        tasks.forEach((doc) => {
            const data = doc.data()
            const json = {id: doc.id, name: data.name, time: data.time}
            // console.log(json)
            emptyArr.push(json)
        })
        return emptyArr
    }
    catch(error){
        console.log(error)
    }
}

//delete tasks
export const deleteTasks = async(id) => {
    console.log('ran', id)
    try{
        const taskThatBeDeleted = await getDoc(doc(db, "users", id))
        console.log(taskThatBeDeleted)
        await deleteDoc(doc(db, "users", id))
    }
    catch(e){
        console.log(e)
    }
}