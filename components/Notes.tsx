import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";
import { title } from "process";
import { parse } from "path";

const Notes = () => {
  const [arr, setArr] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [isTrue, setIsTrue] = useState(false);

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
  //   GET
  useEffect(() => {
    const savedData = localStorage.getItem("items");
    setArr(savedData ? JSON.parse(savedData) : []);
    setIsTrue(false);
  }, [isTrue]);

  //   SET AGAIN
  useEffect(() => {
    // if (localStorage.getItem("items")) {
    //   const savedDataM: any = localStorage.getItem("items");
    //   localStorage.setItem("items", savedDataM);
    // }
    /*
    It seems that you are missing a step in your SET AGAIN effect. You are currently getting the saved data from local storage but not parsing it and setting it to the data state. Therefore, when you submit a new data, you are only appending it to the empty data state, but not including the existing data from local storage.

    With this code, the SET AGAIN effect will now parse the saved data and set it to the data state. When you submit new data, it will append to the existing data in data state, and then be stored in local storage through the SET effect.
     */
    // fixed
    if (localStorage.getItem("items")) {
      const savedDataM: any = JSON.parse(localStorage.getItem("items") || "[]");
      setData(savedDataM);
    }
  }, []);

  //  SET
  useEffect(() => {
    // const savedData = localStorage.getItem("items");
    // const parsedData = savedData ? JSON.parse(savedData) : [];
    if (data.length !== 0) {
      localStorage.setItem("items", JSON.stringify(data));
    }
  }, [data]);

  //   SUBMIT
  const handleSubmit = (e: any) => {
    e.preventDefault();

    setData((prev: any) => [...prev, input]);
    setIsTrue(true);
    setInput({
      title: "",
      desc: "",
      time: "",
      type: "",
    });
  };
  return (
    <>
      <h1 className="display-1 text-center"> 📝iNotes</h1>
      <InputGroup className="mb-3">
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
      <div className="text-end">
        <Button variant="primary" onClick={handleSubmit} type="submit">
          Submit
        </Button>
      </div>

      {/* CARD SECTION */}

      {arr &&
        arr.map((item: any, index: number) => {
          const { title, desc, time, type } = item;
          return (
            <Card key={index} style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title className="text-center">{title}</Card.Title>
                <Card.Text>
                  Description: <b>{desc}</b>{" "}
                </Card.Text>
                <Card.Text>
                  Time: <b>{time}</b>{" "}
                </Card.Text>
                <Card.Text>
                  Type: <b>{type}</b>
                </Card.Text>
                <div className="text-end">
                  <Button variant="success">Edit</Button>
                  <Button variant="danger" className="ms-2">
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
    </>
  );
};

export default Notes;
