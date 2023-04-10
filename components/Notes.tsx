import { useEffect, useState } from "react";
import CardDisplay from "./CardDisplay";
import InputBar from "./InputBar";

const Notes = () => {
  const [arr, setArr] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [isTrue, setIsTrue] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [input, setInput] = useState({
    title: "",
    desc: "",
    time: "",
    type: "",
    id: Date.now(),
  });

  //   INPUT
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInput((values: any) => ({ ...values, [name]: value }));
  };

  //  ------------------- START DELETE  -------------------
  //   DELETE
  const handleDelete = (index: number) => {
    // Avoid unnecessary render with useEffect
    // In the handleDelete function, we can move the localStorage code inside the setArr callback to avoid unnecessary renders.
    setArr((prevArr: any) => {
      const res = prevArr.filter((item: any) => item.id !== index);
      localStorage.setItem("items", JSON.stringify(res));
      return res;
    });
    // clear from local storage
    const savedDataM = JSON.parse(localStorage.getItem("items") || "[]");
    const deleted = savedDataM.findIndex((item: any) => item.id === index);
    if (deleted !== -1) {
      savedDataM.splice(deleted, 1);
    }
    setData(savedDataM);
  };
  //  ------------------- START EDIT -------------------
  //   EDIT
  const handleUpdate = (index: number) => {
    setEdit(true);
    setEditIndex(index);
    const savedDataM: any = JSON.parse(localStorage.getItem("items") || "[]");
    const editIndexFind = savedDataM.findIndex((item: any) => {
      return item.id === index;
    });
    if (editIndexFind !== -1) {
      const { title, desc, time, type, id } = savedDataM[editIndexFind];
      setInput({
        title,
        desc,
        time,
        type,
        id,
      });
    }
  };
  //   EDIT SUBMIT
  const UpdateSubmit = () => {
    // In the UpdateSubmit function, we can avoid using the splice method by using the map method to update the array.
    // const newData = [...data];
    // const editSubmitIndex = newData.findIndex((item: any) => {
    //   return item.id === editIndex;
    // });
    // if (editSubmitIndex !== -1) {
    //   newData[editSubmitIndex] = input;
    // }
    // setData(newData);
    // arr.splice(editSubmitIndex, 1, input);

    const newData = data.map((item: any) => {
      if (item.id === editIndex) {
        return input;
      }
      return item;
    });
    setData(newData);
    setArr(newData);
    setEdit(false);
    setInput({
      title: "",
      desc: "",
      time: "",
      type: "",
      id: Date.now(),
    });
  };
  // EDIT CANCEL
  const handleCancel = () => {
    setEdit(false);
    setInput({
      title: "",
      desc: "",
      time: "",
      type: "",
      id: Date.now(),
    });
  };

  //  ------------------- START LOCAL STORAGE -------------------
  //   GET
  useEffect(() => {
    const savedData = localStorage.getItem("items");
    setArr(savedData ? JSON.parse(savedData) : []);
    setIsTrue(false);
  }, [isTrue]);

  //   SET AGAIN
  useEffect(() => {
    if (localStorage.getItem("items")) {
      const savedDataM: any = JSON.parse(localStorage.getItem("items") || "[]");
      setData(savedDataM);
    }
  }, []);

  //  SET
  useEffect(() => {
    if (data.length !== 0) {
      localStorage.setItem("items", JSON.stringify(data));
    }
  }, [data]);

  //  ------------------- START SUBMIT -------------------
  //   SUBMIT
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // if (input.title === "" || input.desc === "") {
    if (input.title === "") {
      setDialog(true);
      setTimeout(() => {
        setDialog(false);
      }, 3000);
    } else {
      setData((prev: any) => [...prev, input]);
      setIsTrue(true);
      setInput({
        title: "",
        desc: "",
        time: "",
        type: "",
        id: Date.now(),
      });
    }
  };

  return (
    <>
      <div>
        {/* Input Section */}
        <InputBar
          input={input}
          handleChange={handleChange}
          dialog={dialog}
          edit={edit}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          UpdateSubmit={UpdateSubmit}
        />
      </div>

      {/* Card Section */}
      <CardDisplay
        arr={arr}
        edit={edit}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default Notes;
