import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Alert from "./AlertComponent";
import List from "./ListComponent";
import { toastConfig } from "./toastComponent";

function TodoComponent({ user }) {
  const [list, setList] = useState(user.data);
  const [item, setItem] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const token = useRef(null);
  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      token.current = localStorage.getItem("jwtToken");
    }
    const config = {
      headers: {
        Authorization: "Bearer " + token.current,
      },
    };
    try {
      axios
        .get(`/api/users/${user.id}`, config)
        .then((result) => setList(result.data.data));
    } catch (err) {
      toast.error(err.response.data.info, toastConfig);
    }
    //eslint-disable-next-line
  }, []);

  const refContainer = useRef(null);
  const submitHandler = (e) => {
    e.preventDefault();
    if (!item) {
      showAlert(true, "danger", "Pleade Enter Item");
    } else if (item && isEdit) {
      setList(
        list.map((it) => {
          if (it.id === editId) {
            return { ...it, title: item };
          }
          return it;
        })
      );
      setItem("");
      setIsEdit(false);
      refContainer.current.blur();
      showAlert(true, "success", "Item Edited");
    } else {
      setList([...list, { id: new Date().getTime().toString(), title: item }]);
      setItem("");
      setIsEdit(false);
      refContainer.current.blur();
      setAlert({ show: true, msg: "Item Added", type: "success" });
    }
  };
  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    showAlert(true, "danger", "Item Deleted");
    setList(newList);
  };
  const editItem = (id, title) => {
    setIsEdit(true);
    setItem(title);
    setEditId(id);
    refContainer.current.focus();
  };
  const clearItems = () => {
    setList([]);
    showAlert(true, "danger", "List Cleared");
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const saveItems = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + token.current,
      },
    };
    try {
      await axios.post(`/api/users/${user.id}`, list, config);
      toast.success("Saved successfully", toastConfig);
    } catch (err) {
      toast.error(err.response.data.info, toastConfig);
    }
  };

  return (
    <section className="section-center">
      <div className="task-form">
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>{`${user.name.split(" ")[0]}'s`} To-do List</h3>
        <form className="form-control" onSubmit={submitHandler}>
          <input
            className="task"
            type="text"
            name="item"
            id="item"
            ref={refContainer}
            placeholder="e.g. workout"
            onChange={(e) => setItem(e.target.value)}
            value={item}
          />
          <button className="submit-btn" type="submit">
            {isEdit ? "Edit" : "Submit"}
          </button>
        </form>
      </div>
      <div className="task-container">
        {list.map((item) => {
          return (
            <List
              key={item.id}
              {...item}
              removeItem={removeItem}
              editItem={editItem}
            />
          );
        })}
      </div>
      <div className="bottom-btns">
        <button className="save-btn" onClick={() => saveItems()}>
          Save Items
        </button>
        {list.length > 0 && (
          <button className="clear-btn" onClick={() => clearItems()}>
            Clear Items
          </button>
        )}
      </div>
    </section>
  );
}

export default TodoComponent;
