import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardDisplay = ({
  arr,
  handleUpdate,
  handleDelete,
  searchText,
  edit,
}: any) => {
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
                    <Button
                      variant="success"
                      onClick={() => handleUpdate(index)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      className={`ms-2 ${edit && "bg-secondary"}`}
                      disabled={edit}
                      onClick={() => handleDelete(index)}
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
