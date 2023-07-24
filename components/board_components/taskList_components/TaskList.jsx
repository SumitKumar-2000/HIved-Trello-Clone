"use client";
import "@/style/board.css";
import Image from "next/image";
import { useState } from "react";
import {
  BsThreeDotsVertical,
  BsPlusLg,
  BsXLg,
  BsCardImage,
} from "react-icons/bs";

const TaskList = ({ taskList, boardId }) => {
  const [cardAdd, setCardAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardFormData, setCardFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  
  const handleCardChange = (e) => {
    if (e.target.name !== "image") {
      setCardFormData({ ...cardFormData, [e.target.name]: e.target.value });
    } else {
      if (e.target.files.length !== 0) {
        setCardFormData({
          ...cardFormData,
          [e.target.name]: e.target.files[0],
        });
      }
    }
  };

  const handleCardAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    // sending image to cloudnary and getting image link

    if(cardFormData.image !== ""){
      const imageFormData = new FormData()
      imageFormData.append("file",cardFormData.image)
      imageFormData.append("upload_preset","hived_trello_clone")
      imageFormData.append("cloud_name","dcdwstdye")
  
      const imgData = await fetch(`https://api.cloudinary.com/v1_1/dcdwstdye/image/upload`,{
          method:"POST",
          body:imageFormData
      }).then(res => res.json())
        .catch(err => console.log("fetched-err: ",err))
  
      const {secure_url} = imgData;
      setCardFormData({...cardFormData, image:secure_url})
    }

    // sending card data to backend with image link
    const response = await fetch(`/api/board/new/${boardId}/tasklist/${taskList._id}/tasks`, {
      method: "POST",
      body: JSON.stringify({
        title: cardFormData.title,
        description: cardFormData.description,
        image: cardFormData.image,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setCardFormData({
      title: "",
      description: "",
      image: "",
    });

    setLoading(false);
    setCardAdd(false);
  };

  return (
    <section className="taskList flex_center flex-col max-h-[70vh]">
      <div className="w-full flex_between mb-4 pl-2">
        <span className="font-semibold">{taskList.title}</span>
        <button className="p-2 flex_center hover:bg-zinc-800 dark:hover:bg-white rounded-sm">
          <BsThreeDotsVertical className="cursor-pointer" />
        </button>
      </div>

      {/* card */}
      <div className="overflow-y-scroll scrollbar-none w-full">  
        {
          taskList.tasks.map(card => {
            return (
              <div 
                className="card_container"
                key={card._id}
              >
                <div className="uppercase mb-2 w-full whitespace-normal">
                  {card.title}
                </div>
                {card.image !== "" && <Image
                  src={card.image}
                  alt="card_img"
                  width="248"
                  height="240"
                  className="object-cover rounded-t-sm mb-2"
                />}
                <p 
                  className="text-sm text-gray-400 whitespace-normal"
                >
                    ↬ {card.description}
                </p>
              </div>
            )   
          })
        }

      </div>

      {cardAdd ? (
        <form
          onSubmit={handleCardAdd}
          className="addList_form flex flex-col gap-2"
        >
          <h1>Card Details</h1>
          <input
            required
            type="text"
            name="title"
            placeholder="Add title *"
            className="addList_formInput"
            value={cardFormData.title}
            onChange={(e) => handleCardChange(e)}
          />
          <textarea
            type="text"
            maxLength="60"
            name="description"
            placeholder="Add description"
            className="addList_formInput"
            value={cardFormData.description}
            onChange={(e) => handleCardChange(e)}
          />

          <div className="addImage_btn flex_between">
            <input
              hidden
              type="file"
              name="image"
              accept="image/*"
              className={`selectImage-${taskList._id}`}
              onChange={(e) => handleCardChange(e)}
            />
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() =>
                document.querySelector(`.selectImage-${taskList._id}`).click()
              }
            >
              {cardFormData.image.length === 0 ? (
                <BsCardImage className="h-[16px] w-[16px]" />
              ) : (
                <Image
                  src={URL.createObjectURL(cardFormData.image)}
                  alt="uploaded image"
                  width={32}
                  height={32}
                />
              )}
              <span>
                {cardFormData.image.length === 0
                  ? "Add image"
                  : "Add image again"}
              </span>
            </div>
            {cardFormData.image.length !== 0 && (
              <BsXLg
                onClick={() => setCardFormData({ ...cardFormData, image: "" })}
                className="cursor-pointer"
              />
            )}
          </div>

          <span className="flex items-center gap-2">
            <button type="submit" className="addList_formSubmit_btn">
              {loading ? "Adding..." : "Add"}
            </button>
            <BsXLg
              onClick={() => setCardAdd(false)}
              className="cursor-pointer"
            />
          </span>
        </form>
      ) : (
        <button
          className="flex_left addCard_btn"
          onClick={() => setCardAdd(true)}
        >
          <BsPlusLg className="text-white dark:text-black" />
          <span>Add new card</span>
        </button>
      )}
    </section>
  );
};

export default TaskList;
