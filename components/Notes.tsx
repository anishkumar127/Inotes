import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useContext, useEffect, useState, useId } from "react";
import CardDisplay from "./CardDisplay";
import { SearchContext } from "@/context/context";
const Notes = () => {
  const [arr, setArr] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [isTrue, setIsTrue] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const { inputGroupText, inputGroupPlaceholder }: any =
    useContext(SearchContext);
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

  //   DELETE
  const handleDelete = (index: number) => {
    console.log("I", index);

    const res = arr.filter((item: any) => {
      return item.id !== index;
    });
    setArr(res);
    // clear from local storage
    const savedDataM: any = JSON.parse(localStorage.getItem("items") || "[]");

    const deleted = savedDataM.findIndex((item: any) => {
      return item.id === index;
    });
    if (deleted !== -1) {
      savedDataM.splice(deleted, 1);
    }
    data.splice(deleted, 1);
    localStorage.setItem("items", JSON.stringify(savedDataM));
  };

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

  //   SUBMIT
  const handleSubmit = (e: any) => {
    e.preventDefault();
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
  //   EDIT SUBMIT
  const UpdateSubmit = () => {
    const newData = [...data];
    const editSubmitIndex = newData.findIndex((item: any) => {
      return item.id === editIndex;
    });
    if (editSubmitIndex !== -1) {
      newData[editSubmitIndex] = input;
    }
    setData(newData);
    arr.splice(editSubmitIndex, 1, input);
    setEdit(false);
    setInput({
      title: "",
      desc: "",
      time: "",
      type: "",
      id: Date.now(),
    });
  };

  // CANCEL HANDLE
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
  return (
    <>
      <div>
        <div className="input-box-style ">
          <InputGroup className={`${!dialog && "mb-3"} `}>
            <InputGroup.Text id="basic-addon1" className={inputGroupText}>
              Title
            </InputGroup.Text>

            <Form.Control
              className={inputGroupPlaceholder}
              placeholder="add title..."
              aria-label="title"
              aria-describedby="basic-addon1"
              name="title"
              value={input.title}
              onChange={handleChange}
            />
          </InputGroup>
          {dialog && <p className=" text-danger mb-0">Please Enter Title</p>}

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" className={inputGroupText}>
              Description
            </InputGroup.Text>
            <Form.Control
              className={inputGroupPlaceholder}
              placeholder="add desc..."
              aria-label="desc"
              aria-describedby="basic-addon1"
              name="desc"
              value={input.desc}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" className={inputGroupText}>
              Time
            </InputGroup.Text>
            <Form.Control
              className={inputGroupPlaceholder}
              placeholder="add time..."
              aria-label="time"
              aria-describedby="basic-addon1"
              name="time"
              value={input.time}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" className={inputGroupText}>
              Type
            </InputGroup.Text>
            <Form.Control
              className={inputGroupPlaceholder}
              placeholder="add type..."
              aria-label="type"
              aria-describedby="basic-addon1"
              name="type"
              value={input.type}
              onChange={handleChange}
            />
          </InputGroup>

          <div className="text-end m-2">
            {edit ? (
              <div>
                <Button variant="success" onClick={UpdateSubmit} type="submit">
                  Update
                </Button>
                <Button
                  className="ms-2"
                  variant="success"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button variant="primary" onClick={handleSubmit} type="submit">
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* CARD SECTION */}
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
