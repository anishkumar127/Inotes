import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";
import { title } from "process";

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
    setArr(JSON.parse(savedData));
    setIsTrue(false);
  }, [isTrue]);

  //   const fun = () => {
  //     if (
  //       input.title !== "" &&
  //       input.desc !== "" &&
  //       input.time !== "" &&
  //       input.type !== ""
  //     ) {
  //       localStorage.setItem("items", JSON.stringify(data));
  //     }
  //   };

  //  SET
  useEffect(() => {
    // fun();
    localStorage.setItem("items", JSON.stringify(data));
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
      <h1 className="display-1 text-center">iNotes</h1>
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
