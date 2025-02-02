'use client'
import Image from "next/image";
//import { Input } from "postcss";
import {React,useState,useEffect} from 'react';
import { db } from "./firebase";
import { collection,addDoc,getDocs, query, onSnapshot,querySnapshot, deleteDoc, doc} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Home() {
  const [items,setitems]=useState([])
  const [total,settotal] = useState(0);
  const [description,setdescription]=useState("");
  const [amount,setamount]=useState("");

  //add items to the db
  const addItems = async (e)=>{
       e.preventDefault();
      
       if(description!=='' && amount!==''){
        await addDoc(collection(db,'expense'),{
          description:description,
          amount:amount
        })

       }
      
    /*const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      console.log("User is authenticated");
      // Proceed with Firestore operations
    } else {
      console.error("User is not authenticated");

    }
  }*/
 setamount('');
 setdescription('');
  }

  //fetch items from the db
  
  useEffect(()=>{
    const q = query(collection(db,"expense"));
    const u = onSnapshot(q,(querySnapshot)=>{
      let itemsarr = [];
      querySnapshot.forEach((doc)=>{
        itemsarr.push({...doc.data(),id:doc.id})
      })
       setitems(itemsarr);
       //let s=0;

     // const newtotal = itemsarr.reduce((sum,item)=>sum+parseFloat(item.amount),0);
     let s=0;
      itemsarr.forEach((items)=>{s= s+parseFloat(items.amount)})
        settotal(s);
      
    })
  },[])
  const fetch = ()=>{
    console.log(items);
    };


  //delete items from the db
  const deleteItems = async (id)=>{
    await deleteDoc(doc(db,"expense",id));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center">
            <input value = {description} onChange={(e) => {setdescription(e.target.value)}} className="col-span-3 p-3 border" type="text" placeholder=" Enter description"></input>
            <input value ={amount} onChange={(e) => {setamount(e.target.value)}} className="col-span-2 p-3 border mx-3" type="number" placeholder=" Enter amount in Rs"></input>
            <button onClick={addItems} className="text-white bg-slate-950 hover:bg-slate-900 p-3 rounded-lg text-xl"type="submit">+</button>

          </form>
          <div>
           { items.map((items)=>(
            <div key={items.id}>
              <div className="text-white my-4 w-full flex justify-between bg-slate-950">
                <div className="p-4 w-full flex justify-between">
              <div className="capitalize">{items.description}</div>
              <div> Rs {items.amount}</div>
              </div>
              <button  onClick={()=>{deleteItems(items.id)}} className="p-4 bg-slate-950 hover:bg-slate-900 rounded-lg">X</button>
              </div>
              </div>
            ))}

          </div>
          <div>
            {items.length<1 ? (" "): (
          <div className="text-white flex justify-between p-3">
             <div>Total</div>
             <div>Rs {total}</div>
          </div>
          
            )}
            </div>
          
        </div>
      </div>
    </main>
  );
}
