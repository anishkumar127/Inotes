import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { SearchContext } from "@/context/context";
import { useContext } from "react";

const CardDisplay = ({ arr, handleUpdate, handleDelete, edit }: any) => {
  const { searchText, themeColor, setThemeColor, theme }: any =
    useContext(SearchContext);
  return (
    <>
      <div className="containerStyleCard">
        {arr
          .filter((item: any) => {
            return searchText.toLowerCase() === ""
              ? item
              : item.title.toLowerCase().includes(searchText);
          })
          .map((item: any, index: number) => {
            const { title, desc, time, type, id } = item;
            return (
              <Card
                className={`${theme ? "light" : "dark"}`}
                key={id}
                style={{ width: "28rem", margin: "22px" }}
              >
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
                    <Button variant="success" onClick={() => handleUpdate(id)}>
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      className={`ms-2 ${edit && "bg-secondary"}`}
                      disabled={edit}
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default CardDisplay;
