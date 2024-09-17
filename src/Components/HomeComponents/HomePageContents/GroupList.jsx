import React, { useState, createRef } from "react";
import { HiDotsVertical } from "react-icons/hi";
import HomeContentOne from "../../../assets/Home/one.png";
import HomeContentTwo from "../../../assets/Home/two.png";
import HomeContentThree from "../../../assets/Home/three.png";
import HomeContentFour from "../../../assets/Home/one.png";
import HomeContentFive from "../../../assets/Home/two.png";
import { IoClose } from "react-icons/io5";
import ReactDOM from "react-dom";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "80%",
    width: "40%",
  },
};
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const GroupList = () => {
  // Cropper States
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();
  // Cropper State
  // Copper things
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  console.log(image);
  console.log(cropData);

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };
  // Copper things end
  const users = [
    {
      id: 1,
      imege: HomeContentOne,
      tittle: "Friends Reunion",
      description: "Hi Guys, Wassup!",
      button: "Join",
    },
    {
      id: 2,
      imege: HomeContentTwo,
      tittle: "Friends Forever",
      description: "Good to see you.",
      button: "Join",
    },
    {
      id: 3,
      imege: HomeContentThree,
      tittle: "Crazy Cousins",
      description: "What plans today?",
      button: "Join",
    },
    {
      id: 4,
      imege: HomeContentFour,
      tittle: "Tech",
      description: "Hi Guys, Welcome",
      button: "Join",
    },
    {
      id: 5,
      imege: HomeContentFive,
      tittle: "EsMern 2306",
      description: "Welcome to Torture cell",
      button: "Join",
    },
  ];

  // Modal codes start
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  // Modal codes end

  const handleopenModal = () => {
    openModal();
  };
  return (
    <div className="max-h-[450px] w-[427px] rounded-[20px] shadow-[0px_5px_7px_-2px_rgba(18,18,18,0.56)]">
      <div className="pt-[13px]">
        <div className="flex w-[90] items-center justify-between text-wrap text-center">
          <h3 className="pl-[20px] font-Poppins text-[20px] font-semibold text-[#000]">
            Groups List
          </h3>
          <button
            onClick={handleopenModal}
            type="button"
            className="rounded-lg bg-gradient-to-r from-ThemeColor to-[#4a5dab] px-3 py-2 text-center text-sm font-medium text-white"
          >
            Create Group
          </button>
          {/* <span>
            <HiDotsVertical className="cursor-pointer text-2xl text-ThemeColor" />
          </span> */}
        </div>

        {/* Parent with divide-y class */}
        <div className="h-[400px] divide-y divide-[rgba(0,0,0,0.25)] overflow-y-scroll">
          {/* Group Section 1 */}
          {users?.map((items) => (
            <div className="flex items-center justify-between py-3.5 pl-[20px] pr-[39px] pt-[17px]">
              <div className="flex items-center">
                <div className="rounded-1/2 mr-[13px] h-[70] w-[70]">
                  <picture>
                    <img src={items.imege} alt="" />
                  </picture>
                </div>

                <div>
                  <h3 className="font-Poppins text-[18px] font-semibold">
                    {items.tittle}
                  </h3>
                  <p className="font-Poppins text-[14px] font-medium text-[rgba(77,77,77,0.73)]">
                    {items.description}
                  </p>
                </div>
              </div>

              <button className="rounded-[5px] bg-ThemeColor px-[22px] font-Poppins text-[20px] font-semibold text-[#fff]">
                {items.button}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Modal Start */}
      {
        <div>
          <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <button
              onClick={closeModal}
              className="bg-red mb-2 flex h-[40px] w-[40px] items-center justify-center rounded-full text-[35px] text-white"
            >
              <IoClose />
            </button>
            <h2 className="font-open mb-3 text-center text-[25px] font-semibold">
              Group Information
            </h2>
            <form action="#" onSubmit={(e) => e.preventDefault()}>
              {/* =========== group name input =============== */}

              <div className="mb-7">
                <label
                  htmlFor="email"
                  className="text-darkBlue mb-2 flex text-[20px] font-semibold capitalize"
                >
                  Group name <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Group Name"
                  id="groupName"
                  name="groupName"
                  autoComplete="off"
                  className="border-darkBlue w-full rounded-md border-2 border-opacity-30 px-[20px] py-[15px] text-[15px] focus:outline-none"
                  // onChange={handleInput}
                />
                {/* {allInputError.GroupNameErr && (
                  <span
                    className="ms-2 mt-2 inline-block font-normal text-[red]"
                    id="GroupNameErr"
                  >
                    {allInputError.GroupNameErr}
                  </span>
                )} */}
              </div>
              {/* =========== group tag name input =============== */}

              <div className="mb-7">
                <label
                  htmlFor="email"
                  className="text-darkBlue mb-2 flex text-[20px] font-semibold capitalize"
                >
                  Group Tagname <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Group TagName"
                  id="groupTagName"
                  name="groupTagName"
                  autoComplete="off"
                  className="border-darkBlue w-full rounded-md border-2 border-opacity-30 px-[20px] py-[15px] text-[15px] focus:outline-none"
                  // onChange={handleInput}
                />
                {/* {allInputError.GroupTagNameErr && (
                  <span
                    className="ms-2 mt-2 inline-block font-normal text-[red]"
                    id="GroupTagNameErr"
                  >
                    {allInputError.GroupTagNameErr}
                  </span>
                )} */}
              </div>
              {/* =========== image croper input =============== */}
              <div className="flex justify-between">
                <div className="w-[40%]">
                  <input type="file" onChange={onChange} />
                </div>
                <div className="flex w-[44%] justify-between">
                  <h3 className="font-open font-semibold capitalize">
                    Image preview
                  </h3>
                  <button
                    className="bg-btnColor relative inline-flex items-center rounded-lg px-3 py-1 text-center text-[17px] font-medium text-white"
                    onClick={getCropData}
                  >
                    Crop Image
                  </button>
                </div>
              </div>
              <div className="flex h-[220px] w-full items-center justify-between">
                <div className="w-[44%]">
                  <Cropper
                    ref={cropperRef}
                    style={{ width: "100%", height: "200px" }}
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1.6}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    guides={true}
                  />
                </div>

                <div className="w-[44%]">
                  <div className="box h-[200px] w-full overflow-hidden bg-[rgba(0,0,0,0.4)]">
                    <div
                      className="img-preview block overflow-hidden"
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-btnColor font-nunito relative w-full rounded-lg py-4 text-center text-[20px] text-base font-semibold capitalize text-white"
                // onClick={handleCreatGroup}
              >
                Creat group
                {/* {loading && (
                  <div className="border-b-gray border-r-gray absolute left-[40%] top-[33%] h-5 w-5 animate-spin rounded-full border-[3.5px] border-l-white border-t-white bg-transparent"></div>
                )} */}
              </button>
            </form>
          </Modal>
        </div>
      }
      {/* Modal End */}
    </div>
  );
};

export default GroupList;
