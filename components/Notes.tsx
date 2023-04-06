import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import NavbarSection from "./NavbarSection";
import CardDisplay from "./CardDisplay";

const Notes = () => {
  const [arr, setArr] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [isTrue, setIsTrue] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [searchText, setSearchText] = useState("");
  //   const [isSearch, setIsSearch] = useState(true);

  const [input, setInput] = useState({
    title: "",
    desc: "",
    time: "",
    type: "",
  });

  //   INPUT
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInput((values: any) => ({ ...values, [name]: value }));
  };

  //   DELETE
  const handleDelete = (index: number) => {
    const res = arr.filter((item: any, i: number) => {
      return i !== index;
    });
    setArr(res);
    // clear from local storage
    const savedDataM: any = JSON.parse(localStorage.getItem("items") || "[]");
    savedDataM.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(savedDataM));
  };

  //   UPDATE
  const handleUpdate = (index: number) => {
    setEdit(true);
    setEditIndex(index);
    const savedDataM: any = JSON.parse(localStorage.getItem("items") || "[]");
    const { title, desc, time, type } = savedDataM[index];
    setInput({
      title,
      desc,
      time,
      type,
    });
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
      });
    }
  };
  //   UPDATE HANDLE
  const UpdateSubmit = () => {
    const newData = [...data];
    newData[editIndex] = input;
    setData(newData);
    arr.splice(editIndex, 1, input);
    setEdit(false);
    setInput({
      title: "",
      desc: "",
      time: "",
      type: "",
    });
  };

  //   SEARCH
  const onSearch = (e: any) => {
    const { value } = e.target;
    setSearchText(value);
  };

  return (
    <>
      <NavbarSection onSearch={onSearch} />
      <div className="">
        <InputGroup className={`${!dialog && "mb-3"} `}>
          <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>

          <Form.Control
            placeholder="add title..."
            aria-label="title"
            aria-describedby="basic-addon1"
            name="title"
            value={input.title}
            onChange={handleChange}
          />
        </InputGroup>
        {dialog && <p className="text-danger mb-0">Please Enter Title</p>}

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
          <Form.Control
            placeholder="add desc..."
            aria-label="desc"
            aria-describedby="basic-addon1"
            name="desc"
            value={input.desc}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Time</InputGroup.Text>
          <Form.Control
            placeholder="add time..."
            aria-label="time"
            aria-describedby="basic-addon1"
            name="time"
            value={input.time}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Type</InputGroup.Text>
          <Form.Control
            placeholder="add type..."
            aria-label="type"
            aria-describedby="basic-addon1"
            name="type"
            value={input.type}
            onChange={handleChange}
          />
        </InputGroup>
      </div>

      <div className="text-end">
        {edit ? (
          <Button variant="success" onClick={UpdateSubmit} type="submit">
            Update
          </Button>
        ) : (
          <Button variant="primary" onClick={handleSubmit} type="submit">
            Submit
          </Button>
        )}
      </div>
      {/* CARD SECTION */}
      <CardDisplay
        arr={arr}
        edit={edit}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        searchText={searchText}
      />
    </>
  );
};

export default Notes;
