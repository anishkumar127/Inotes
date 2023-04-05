import { useState, useEffect } from "react";

const Form = () => {
  const [data, setData] = useState<any>([]);
  const [input, setInput] = useState({
    title: "",
    desc: "",
    time: "",
    type: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle form submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formSubmitted) return;
    setData((prevState) => [...prevState, input]);
    setInput({
      title: "",
      desc: "",
      time: "",
      type: "",
    });
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
    }, 1000); // Allow resubmission after 1 second
  };

  // Handle input change
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Save data to local storage when the data state changes
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  // Load data from local storage when the component mounts
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const savedData = localStorage.getItem("data");
      setData(JSON.parse(savedData || "[]"));
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={input.title}
          onChange={handleInputChange}
        />
        <textarea
          name="desc"
          value={input.desc}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="text"
          name="time"
          value={input.time}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="type"
          value={input.type}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={formSubmitted}>
          Add Data
        </button>
      </form>
      <ul>
        {data.map((item: any, index: number) => (
          <li key={index}>
            <p>{item.title}</p>
            <p>{item.desc}</p>
            <p>{item.time}</p>
            <p>{item.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Form;
