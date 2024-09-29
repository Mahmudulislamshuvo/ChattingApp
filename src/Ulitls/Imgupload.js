import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // For generating a unique ID for each image

export const Imgupload = (Imgpath) => {
  const storage = getStorage(); // Initialize Firebase storage
  const storageRef = ref(storage, `SigleMsg/Image${uuidv4()}`); // Create a reference with a unique name
  const uploadTask = uploadBytesResumable(storageRef, Imgpath);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      console.log("Error while uploading the image", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
      });
    },
  );
};
