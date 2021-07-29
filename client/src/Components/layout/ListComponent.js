import { FaEdit, FaTrash } from "react-icons/fa";

const ListComponent = ({ id, title, removeItem, editItem }) => {

  return (
    <article className="task-item">
      <div className="task-title">
        <p className="title">{title}</p>
      </div>
      <div className="btn-container">
        <button
          type="button"
          className="edit-btn"
          onClick={() => editItem(id, title)}
        >
          <FaEdit />
        </button>
        <button
          type="button"
          className="delete-btn"
          onClick={() => removeItem(id)}
        >
          <FaTrash />
        </button>
      </div>
    </article>
  );
};

export default ListComponent;
