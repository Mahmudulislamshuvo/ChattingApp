import React, { useEffect, useState } from "react";
import SearchBar from "../Components/HomeComponents/HomePageComonCompo/Searchbar.jsx";
import GroupsList from "../Components/HomeComponents/HomePageContents/GroupList.jsx";
import Frinds from "../Components/HomeComponents/HomePageContents/Friends.jsx";
import Profilepic from "../assets/Home/Userslist/userlist1.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { BsCamera } from "react-icons/bs";
import { useSelector } from "react-redux";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
import EmojiPicker from "emoji-picker-react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { Imgupload } from "../Ulitls/Imgupload.js";

const ChatPage = () => {
  const db = getDatabase();
  const auth = getAuth();

  const { Users } = useSelector((state) => state.FriendsActions);
  const [textmsg, settextmsg] = useState("");
  const [singleMsg, setsingleMsg] = useState([]);
  const [emoji, setemoji] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [imgfiles, setimgfiles] = useState(null);

  // Modal things here=============
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "30%",
    },
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  // Modal things here=============end

  /**
   * todo: avoid conflit Rename data got from Redux
   * */
  const whoGotTextInfo = {
    whoGotTextEmail: Users?.senderemail,
    whoGotTextName: Users?.SenderName,
    whoGotTextPhoto: Users?.profile_picture,
    whoGotTextUid: Users?.senderUid,
  };

  /**
   * todo: Handle Text
   *@params ({event})
   * */
  const HandleText = (event) => {
    // const { value } = event.target;
    // settextmsg(value);
    settextmsg(event.target.value);
  };

  /**
   * todo: Handle Sigle Msg
   * @params ({})
   * */
  const HandleSigleText = () => {
    if (!textmsg.trim()) return;
    settextmsg("");
    setemoji(false);
    push(ref(db, "SingleText/"), {
      whoSendTextEmail: auth.currentUser.email,
      whoSendTextName: auth.currentUser.displayName,
      whoSendTextUid: auth.currentUser.uid,
      whoSendTextphoto: auth.currentUser.photoURL,
      whoGotMsgName: whoGotTextInfo.whoGotTextName,
      whoGotMsgEmail: whoGotTextInfo.whoGotTextEmail,
      whoGotMsgUid: whoGotTextInfo.whoGotTextUid,
      whoGotMsgPhoto: whoGotTextInfo.whoGotTextPhoto,
      Text: textmsg,
      image: "",
      createdDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
    });
  };

  /**
   * todo: To fetch Data from Db for Show text Messege
   * */

  useEffect(() => {
    const SingleTextDbref = ref(db, "SingleText/");
    onValue(SingleTextDbref, (snapshot) => {
      let Textmsgblankarr = [];
      snapshot.forEach((items) => {
        if (
          (items.val().whoSendTextUid === auth.currentUser.uid &&
            items.val().whoGotMsgUid === Users.senderUid) ||
          (items.val().whoSendTextUid === Users.senderUid &&
            items.val().whoGotMsgUid === auth.currentUser.uid)
        ) {
          Textmsgblankarr.push({ ...items.val(), SingleTextkey: items.key });
        }
      });
      setsingleMsg(Textmsgblankarr);
    });
  }, [db, Users.senderUid, auth.currentUser.uid]);

  /**
   * todo: Handle Emoji render and close
   * */
  const onEmojiClick = (emojiObject) => {
    settextmsg((prevText) => {
      return prevText + emojiObject.emoji;
    }); // Append emoji to text
  };

  /**
   * todo: to open Modal on Camera btn click
   * */
  const HandleSendPic = () => {
    openModal();
  };
  /**
   * todo: Get upload file url and store it
   * */
  const onchangeInput = (e) => {
    const files = Array.from(e.target.files);
    setimgfiles(files[0]);
  };
  /**
   * todo: Send Pic to db
   * */
  const uploadImge = () => {
    if (imgfiles) {
      Imgupload(imgfiles)
        .then((downloadURL) => {
          console.log("this is photo", downloadURL);
          push(ref(db, "SingleText/"), {
            whoSendTextEmail: auth.currentUser.email,
            whoSendTextName: auth.currentUser.displayName,
            whoSendTextUid: auth.currentUser.uid,
            whoSendTextphoto: auth.currentUser.photoURL,
            whoGotMsgName: whoGotTextInfo.whoGotTextName,
            whoGotMsgEmail: whoGotTextInfo.whoGotTextEmail,
            whoGotMsgUid: whoGotTextInfo.whoGotTextUid,
            whoGotMsgPhoto: whoGotTextInfo.whoGotTextPhoto,
            Text: "",
            image: downloadURL,
            createdDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
          });
          closeModal();
        })
        .catch((error) => {
          console.log("Error Uploading Image", error.code);
        });
    } else {
      console.log("No file selected for upload");
    }
  };

  return (
    <div className="">
      <div className="flex">
        <div className="">
          <SearchBar />
          <GroupsList />
          <Frinds ischat={true} />
        </div>
        <div className="w-[765px] pl-4">
          <div className="mx-[20px] flex items-center justify-between border-b-[2px] border-[#00000025] py-3.5 pt-[17px]">
            <div className="flex items-center">
              <div className="relative mr-[13px]">
                <picture>
                  <img
                    src={
                      Users.profile_picture ? Users.profile_picture : Profilepic
                    }
                    alt={
                      Users.profile_picture ? Users.profile_picture : Profilepic
                    }
                    className="h-[54px] w-[52px] rounded-full"
                  />
                </picture>
              </div>
              <div>
                <h3 className="font-Poppins text-[22px] font-semibold">
                  {Users.SenderName ? Users.SenderName : "Mr. XYZ"}
                </h3>
                <p className="font-Poppins text-[16px] font-medium text-[rgba(77,77,77,0.73)]">
                  Online
                </p>
              </div>
            </div>
            <div className="text-center">
              <p className="pb-1 font-Poppins text-[20px] font-medium text-[rgba(0,0,0,0.51)]">
                <BsThreeDotsVertical />
              </p>
            </div>
          </div>
          <div className="mb-4 mt-6 flex h-[65vh] flex-col overflow-y-scroll px-4">
            {singleMsg.map((items) => (
              <div key={items.key}>
                {items.whoSendTextUid === auth.currentUser.uid ? (
                  items?.image ? (
                    <div className="mt-6 self-end">
                      <div className="flex items-end justify-end">
                        <div className="max-w-[75%] rounded-lg bg-green-400 p-3 text-white shadow-md">
                          <picture>
                            <img src={items.image} alt={items.image} />
                          </picture>
                        </div>
                      </div>
                      <div className="mt-1 text-end text-xs text-gray-500">
                        <span>{moment(items.createdDate).fromNow()}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-6 self-end">
                      <div className="flex items-end justify-end">
                        <div className="max-w-[75%] rounded-lg bg-green-400 p-3 text-white shadow-md">
                          <p>{items.Text}</p>
                        </div>
                      </div>
                      <div className="mt-1 text-end text-xs text-gray-500">
                        <span>{moment(items.createdDate).fromNow()}</span>
                      </div>
                    </div>
                  )
                ) : items?.image ? (
                  <div>
                    <div className="flex items-start">
                      <div className="max-w-[75%] rounded-lg bg-blue-400 p-3 text-white shadow-md">
                        <picture>
                          <img src={items.image} alt={items.image} />
                        </picture>
                      </div>
                    </div>
                    <div className="mt-1 text-start text-xs text-gray-500">
                      <span>{moment(items.createdDate).fromNow()}</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start">
                      <div className="max-w-[75%] rounded-lg bg-blue-400 p-3 text-white shadow-md">
                        <p>{items.Text}</p>
                      </div>
                    </div>
                    <div className="mt-1 text-start text-xs text-gray-500">
                      <span>{moment(items.createdDate).fromNow()}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <hr className="fixed bottom-[90px] right-4 w-[50%] border-ThemeColor" />
          <div className="fixed bottom-0 right-0 flex w-[52%] items-center justify-between bg-white p-4">
            <div className="relative w-full">
              <input
                type="text"
                className="relative w-full rounded-xl bg-[#F1F1F1] px-3 py-3"
                placeholder="Write here...."
                onChange={HandleText}
                value={textmsg}
                onKeyDown={(event) =>
                  event.key === "Enter" && HandleSigleText()
                }
              />
              <div className="absolute right-1 top-0">
                {emoji && (
                  <div className="absolute bottom-16 right-4">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                    <button
                      className="mt-2 w-full rounded bg-red-500 p-2 text-white"
                      onClick={() => setemoji(false)}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
              <div className="absolute right-4 top-1/2 flex -translate-y-1/2 transform items-center justify-center gap-x-3 text-[30px]">
                <span onClick={() => setemoji(!emoji)}>
                  <MdOutlineEmojiEmotions className="cursor-pointer" />
                </span>
                <span onClick={HandleSendPic}>
                  <BsCamera className="cursor-pointer" />
                </span>
              </div>
            </div>

            <div
              className="ml-4 rounded-xl bg-ThemeColor px-3 py-2 text-[30px] text-white"
              onClick={HandleSigleText}
            >
              <IoIosSend className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button
            onClick={closeModal}
            className="rounded-md bg-red-600 px-2 py-[2px]"
          >
            close
          </button>
          <div className="flex flex-col items-center justify-between">
            <div className="my-10">
              <input
                type="file"
                className="rounded-lg"
                onChange={onchangeInput}
              />
            </div>
            <button
              className="w-full rounded-lg bg-ThemeColor px-2 py-1 font-Poppins font-bold text-white"
              onClick={uploadImge}
            >
              Upload
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ChatPage;
