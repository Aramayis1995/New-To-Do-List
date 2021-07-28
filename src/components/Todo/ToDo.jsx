import React from "react";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import Input from "../Input/Input";
import ToDoItem from "../ToDoItem/ToDoItem";
import ToDoFooter from "../ToDoFooter/ToDoFooter";
import { AiFillPlusCircle } from "react-icons/ai";

export default class ToDO extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentText: "",
      filterState: "all",
    };
  }

  changeHandler = (e) => {
    this.setState({ currentText: e.target.value });
  };

  addItem = (e, text) => {
    const id = generateUniqueID();
    if (text.length > 0) {
      this.setState((prevState) => {
        return {
          items: [
            ...prevState.items,
            { text, id, isCompleted: false, isEditable: false },
          ],
          currentText: "",
        };
      });
    }
  };

  addItemEnter = (e) => {
    if (e.target.value.length > 0 && e.key === "Enter") {
      const id = generateUniqueID();
      this.setState((prevState) => {
        return {
          items: [
            ...prevState.items,
            { text: e.target.value, id, isCompleted: false, isEditable: false },
          ],
          currentText: "",
        };
      });
    }
  };

  handleDelate = (id) => {
    this.setState((prevState) => {
      return {
        items: prevState.items.filter((el) => el.id !== id),
      };
    });
  };

  handleCheck = (id) => {
    this.setState((prevState) => {
      return {
        items: prevState.items.map((el) => {
          return el.id === id ? { ...el, isCompleted: !el.isCompleted } : el;
        }),
      };
    });
  };

  handleEdit = (id) => {
    this.setState((prevState) => {
      return {
        items: prevState.items.map((el) => {
          return el.id === id ? { ...el, isEditable: !el.isEditable } : el;
        }),
      };
    });
    console.log(this.state);
  };

  handleEditEnter = (e, id) => {
    if (e.key === "Enter" || e.type === "blur") {
      this.setState((prevState) => {
        return {
          items: prevState.items.map((el) => {
            return el.id === id ? { ...el, isEditable: !el.isEditable } : el;
          }),
        };
      });
    }
  };

  handleItemInputChange = (e, id) => {
    const { items } = this.state;
    const item = items.find((el) => el.id === id);

    item.text = e.target.value;
    this.setState({ items });
  };

  deleteCompleted = () => {
    this.setState((prevState) => {
      return {
        items: prevState.items.filter((el) => el.isCompleted === false),
      };
    });
  };

  deleteAll = () => {
    this.setState({ items: [] });
  };

  handleFilterClick = (e) => {
    this.setState({ filterState: e.target.name });
  };

  componentDidUpdate = () => {
    localStorage.setItem("State", JSON.stringify(this.state));
  };

  componentDidMount = () => {
    const StateData = JSON.parse(localStorage.getItem("State"));
    if (localStorage.getItem("State")) {
      this.setState({
        items: StateData.items,
        currentText: StateData.currentText,
      });
    }
  };

  render() {
    console.log(this.state);
    const { items, currentText, filterState } = this.state;
    return (
      <div className="flex justify-center">
        <div className="w-7/12 ">
          <p className="flex justify-center bg-gradient-to-r from-green-400 to-blue-400 text-5xl py-4">
            MY TO-DO LIST
          </p>
          <div className=" flex justify-between p-6 bg-gradient-to-r from-green-400 to-blue-400 ">
            <Input
              text={currentText}
              type="text"
              changeHandler={this.changeHandler}
              enterHandler={this.addItemEnter}
            />
            <button
              className="w-2/12 flex justify-center text-4xl bg-gray-200 hover:bg-red-200"
              onClick={(e) => {
                this.addItem(e, currentText);
              }}
            >
              Add
              <AiFillPlusCircle className="w-10 h-10 text-red-700 " />
            </button>
          </div>
          <ul className="py-2">
            {filterState === "all"
              ? items.map((el) => {
                  return (
                    <ToDoItem
                      text={el.text}
                      handleDelate={this.handleDelate}
                      handleCheck={this.handleCheck}
                      handleEdit={this.handleEdit}
                      handleEditEnter={this.handleEditEnter}
                      handleItemInputChange={this.handleItemInputChange}
                      isCompleted={el.isCompleted}
                      isEditable={el.isEditable}
                      id={el.id}
                    />
                  );
                })
              : filterState === "completed"
              ? items
                  .filter((el) => el.isCompleted)
                  .map((el) => {
                    return (
                      <ToDoItem
                        text={el.text}
                        handleDelate={this.handleDelate}
                        handleCheck={this.handleCheck}
                        handleEdit={this.handleEdit}
                        handleEditEnter={this.handleEditEnter}
                        handleItemInputChange={this.handleItemInputChange}
                        isCompleted={el.isCompleted}
                        isEditable={el.isEditable}
                        id={el.id}
                      />
                    );
                  })
              : items
                  .filter((el) => el.isCompleted === false)
                  .map((el) => {
                    return (
                      <ToDoItem
                        text={el.text}
                        handleDelate={this.handleDelate}
                        handleCheck={this.handleCheck}
                        handleEdit={this.handleEdit}
                        handleEditEnter={this.handleEditEnter}
                        handleItemInputChange={this.handleItemInputChange}
                        isCompleted={el.isCompleted}
                        isEditable={el.isEditable}
                        id={el.id}
                      />
                    );
                  })}
          </ul>
          <div>
            <ToDoFooter
              handleFilterClick={this.handleFilterClick}
              deleteCompleted={this.deleteCompleted}
              deleteAll={this.deleteAll}
              itemCount={items.length}
              completedItemCount={items.filter((el) => el.isCompleted).length}
              filterState={filterState}
            />
          </div>
        </div>
      </div>
    );
  }
}
