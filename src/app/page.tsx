import React, {useState, useEffect } from 'react';
// import ConfirmationModal from '../components/ConfirmationModal';
import axios from 'axios';
import Modal from "../components/Modal";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth, db } from "../../library/firebase";
import { toast, Toast } from "../components/Toast";
import Image from "next/image";
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

  // const onClickDetails = () => {
  //   setMovieID(movieID)
  // }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFinalPoint(city);
  };

  const handleOpen = (item: any) => {
    setOpen(item);
    console.log(item, "itemssssss");
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
      console.log(data.id, "dat");

      let userSavedata = {
        userId,
        ...data,
      };

      const collectionRef = collection(db, "Movies");
      console.log(collectionRef, "collectionRef");

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
      const collectionRef = collection(db, "Movies");

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
      <div className="py-5">

        <p className="text-center text-[30px] font-[700]">Enter a City </p>
        
        <form onSubmit={submitHandler}>
          <div className="flex justify-center items-center my-3">
            <input
              className="block bg-white w-[60%] h-[60px] rounded-[5px] px-3 outline-none text-black"
              type="text"
              name='city'
              value={city}
              onChange={onChangeHandler}
            ></input>
          </div>
          <div className="flex justify-center items-center ">
            <button
              className="bg-[#E9222D] py-3  lg:w-[100px] w-[80px] rounded-[5px] text-white  text-[16px]"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="w-[90%] mx-auto mb-5">

        {weatherData && <DataCard weatherData={weatherData} />}
        <div className="flex justify-between">
                      

                      <button
                        onClick={() => dataSaveInFirebaseHandler(weatherData)}
                        className="bg-[#54AEFF] p-2  px-2 rounded-[5px] text-white"
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
