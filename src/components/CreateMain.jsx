import { useState } from "react";
import { motion } from "framer-motion";
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from "react-icons/md";

import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { categories } from "../utils/data";
import { storage } from '../firebase.config';
import Loader from "./Loader";
import { getAllFoodItems, saveItem } from "../utils/firebaseFunction";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const CreateMain = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);

  const uploadImage = (e) => {
    setIsLoading(true);

    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on("state_changed", (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    }, (error) => {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading: Try Again");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(true);
        setIsLoading(false);
      }, 4000);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        setImageAsset(downloadURL);
        setIsLoading(false);
        setFields(true);
        setMsg("Image uploaded successfullly!");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      })
    });
  };

  const deleIamge = () => {
    setIsLoading(true);

    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfullly!");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    })
  };

  const saveDetails = () => {
    setIsLoading(true);

    try {
      if ((!title || !calories || !category || !price || !imageAsset)) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(true);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        }
        saveItem(data);
        clearData();
        setFields(true);
        setMsg("Data Uploaded successfullly!");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      };
    } catch (error) {
      setFields(true);
      setMsg("Error while uploading: Try Again");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(true);
        setIsLoading(false);
      }, 4000);
    }

    fetchData();
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("Select Category");
  };

  const [{}, dispatch] = useStateValue();
  const fetchData = async () => {
    await getAllFoodItems().then(data => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  return (
    <main className='mt-20 md:mt-24 px-4 md:px-16 py-4 w-full h-full'>
      <div className="w-full h-auto min-h-screen flex items-center justify-center">
        <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
          {fields && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'}`}>{msg}</motion.p>
          )}

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFastfood className="text-xl text-gray-700 " />
            <input type="text" className="w-full h-full text-lg bg-transparent p-1 outline-none border-none placeholder:text-gray-500 text-textColor" required value={title} placeholder="Give me a title..." onInput={(e) => setTitle(e.target.value)} />
          </div>

          <div className="w-full">
            <select className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer" onChange={(e) => setCategory(e.target.value)}>
              <option value="Other" className="bg-white text-base border-0 outline-none capitalize text-headingColor">Select Category</option>
              {categories && categories.map((category) => (
                <option key={category.id} value={category.urlParamName} className="bg-white text-base border-0 outline-none capitalize text-headingColor">{category.name}</option>
              ))}
            </select>
          </div>

          <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg overflow-hidden p-2">
            {isLoading ? (<Loader />) : (
              <>
                {!imageAsset ?
                  (<>
                    <label htmlFor="uploadimage" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-gray-700">
                        <MdCloudUpload className="text-3xl" />
                        <p>Click here to upload</p>
                      </div>
                    </label>
                    <input type="file" name="uploadimage" hidden accept="image/*" id="uploadimage" onChange={uploadImage} />
                  </>) :
                  (<>
                    <div className="relative h-full">
                      <img className="w-full h-full object-cover" src={imageAsset} alt="upload image" />
                      <button className="absolute bottom-3 right-3 p3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out" type="button" onClick={deleIamge}>
                        <MdDelete className="text-white" />
                      </button>
                    </div>
                  </>)
                }
              </>
            )}
          </div>

          <div className="w-full flex flex-col md:flex-row items-center gap-3">
            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <MdFoodBank className="text-gray-700 text-2xl" />
              <input type="text" value={calories} onInput={(e) => setCalories(e.target.value)} required placeholder="Calories" className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor" />
            </div>

            <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
              <MdAttachMoney className="text-gray-700 text-2xl" />
              <input type="text" value={price} onInput={(e) => setPrice(e.target.value)} required placeholder="Price" className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor" />
            </div>
          </div>

          <div className="flex items-center w-full">
            <button type="button" className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold" onClick={saveDetails}>Save</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CreateMain
