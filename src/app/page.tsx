"use client";

import React, {useState, useEffect } from 'react';
// import ConfirmationModal from '../components/ConfirmationModal';
import axios from 'axios';
import Modal from "../components/Modal";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth, db } from "../../library/firebase";
import { toast, Toast } from "../components/Toast";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Header from "@/components/header";
import DataCard from '@/components/DataCard';

// Main Function for web app
function App() {
  const router = useRouter();
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundURL, setBackgroundUrl] = useState('https://source.unsplash.com/1600x900/?Chicago')
  const [city, setCity] = useState<string>("");
  const [container, setContainer] = useState<any[]>([]);
  const [finalPoint, setFinalPoint] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [open, setOpen] = useState(null);

  useEffect(() => {
    fetchMe();
  }, [finalPoint]);

  // Main Fetch API for Search Results
  const fetchMe = async () => {
    const api_key = 'ec47f10b6d0804fde032bbc8184e7a0e';

    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

      if (!city) return;
      try {
        const response = await axios.get(url);
        setWeatherData(response.data)
        console.log(response.data);

      } catch(error) {
        console.error(error);
      };
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFinalPoint(city);
    setBackgroundUrl(`https://source.unsplash.com/1600x900/?${city}`)
  };

  const handleOpen = (item: any) => {
    setOpen(item);
    console.log(item, "items");
  };
  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in:", user.uid);
        setUserId(user.uid);
      } else {
        // No user is signed in.
        toast.success("user Logout successfully");
        router.push("/login");
        console.log("No user is signed in.");
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);


  const dataSaveInFirebaseHandler = async (data: any) => {
    try {
      console.log(data.id, "data");

      let userSavedata = {
        userId,
        ...data,
      };

      const collectionRef = collection(db, "weatherPlace");
      console.log(collectionRef, "User");

      // const docRef = await addDoc(collectionRef, userSavedata);
      // console.log(docRef, "docRef")
      const querySnapshot = await getDocs(
        query(
          collectionRef,
          where("id", "==", data.id),
          where("userId", "==", userId)
        )
      );
      
      if (querySnapshot.docs.length > 0) {
        toast.error("already added in to cart");
      } else {
        const docRef = await addDoc(collectionRef, userSavedata);
        toast.success("added  to cart");
      }

      // console.log("Document written with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const addDocumentAndGetId = async () => {
    try {
      // Assuming "MoviesName" is your collection name
      const collectionRef = collection(db, "weatherPlace");

      // Add a document to the collection
      const querySnapshot = await getDocs(
        query(collectionRef, where("userId", "==", userId))
      );
      console.log(querySnapshot, "querySnapshot");

      let arrayof: any = [];
      // Get the ID of the added document
      querySnapshot.forEach((doc) => {
        console.log("Document ID:", doc.id);
        arrayof.push({ id: doc.id, ...doc.data() });
      });

      console.log(arrayof);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Main Function Return
  return (

    <div className="min-h-screen bg-black" style={{ backgroundImage: `url(${backgroundURL})` }}>
      <Header />
      <div className="container mx-auto py-10">
        <div className='rounded-lg bg-gray-300 bg-opacity-50 p-8 mx-auto max-w-lg shadow-lg'>
        <p className="text-white text-3xl font-semibold text-center mb-6">Enter a City </p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="flex justify-center items-center my-3">
            <input
              className="block w-3/4 bg-white rounded-lg px-4 py-2 text-gray-800 focus:outline-none"
              type="text"
              name='city'
              value={city}
              onChange={onChangeHandler}
            ></input>
          </div>
          <div className="flex justify-center items-center ">
            <button
              className="ml-4 px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="w-[40%] mx-auto mb-5 flex flex-col justify-center align-middle">

        {weatherData && <DataCard weatherData={weatherData} />}
        <div className="flex justify-between">
                      

                      <button
                        onClick={() => dataSaveInFirebaseHandler(weatherData)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
                      >
                        Add to cart
                      </button>
                    </div>
            <Modal
              // id={item.id.replace(/\D/g, '')}

              open={open}
              onClose={handleClose}
            />
            
          </div>
        </div>
      </div>
  );
};
export default App;
