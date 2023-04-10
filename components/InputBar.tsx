import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { SearchContext } from "@/context/context";
const InputBar = ({
  input,
  handleChange,
  dialog,
  edit,
  handleSubmit,
  handleCancel,
  UpdateSubmit,
}: any) => {
  const { inputGroupText, inputGroupPlaceholder }: any =
    useContext(SearchContext);
  return (
    <>
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
              <Button className="ms-2" variant="success" onClick={handleCancel}>
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
    </>
  );
};

export default InputBar;
