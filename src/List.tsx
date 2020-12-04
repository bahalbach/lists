import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addList,
  changeListDescription,
  changeListTitle,
  dropList,
  removeList,
  selectListById,
} from "./listSlice";

function ListTitle(props: { id: string; title: string; parentId: string }) {
  const [title, setTitle] = useState(props.title);
  const [editMode, setEditMode] = useState(true);
  const dispatch = useDispatch();

  function onDragStart(event: React.DragEvent<HTMLElement>) {
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ id: props.id, parentId: props.parentId })
    );
  }

  return (
    <summary className="ListTitle">
      {editMode ? (
        <input
          type="text"
          value={title}
          autoFocus={true}
          onBlur={() => {
            setEditMode(false);
            dispatch(changeListTitle({ id: props.id, title }));
          }}
          onChange={function (e) {
            setTitle(e.currentTarget.value);
          }}
          onFocus={function (e) {
            e.currentTarget.select();
          }}
          onKeyDown={function (e) {
            if (e.key === "Enter") e.currentTarget.blur();
          }}
        />
      ) : (
        <span>
          {props.title}
          <button
            className="EditButton EditTitleButton"
            onClick={() => {
              setTitle(props.title);
              setEditMode(true);
            }}
          >
            Edit
          </button>
          <button
            className="EditButton DragButton"
            draggable="true"
            onDragStart={onDragStart}
          >
            Drag Here
          </button>
        </span>
      )}
    </summary>
  );
}

function ListDescription(props: { id: string; description: string }) {
  const [description, setDescription] = useState(props.description);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="ListDescription">
      {editMode ? (
        <textarea
          value={description}
          autoFocus={true}
          onBlur={() => {
            setEditMode(false);
            dispatch(changeListDescription({ id: props.id, description }));
          }}
          onChange={function (e) {
            setDescription(e.currentTarget.value);
          }}
          onFocus={function (e) {
            e.currentTarget.select();
          }}
          // onKeyDown={function (e) { if (e.key === "Enter") e.currentTarget.blur() }}
        />
      ) : (
        <div>
          <pre>{props.description}</pre>
          <br />
          <button
            className="EditButton EditDescriptionButton"
            onClick={() => {
              setDescription(props.description);
              setEditMode(true);
            }}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

function List({ listId, parentId }: { listId: string; parentId: string }) {
  const dispatch = useDispatch();
  const list = useSelector((state: SystemState) =>
    selectListById(state, listId)
  );

  if (!list) return <div>missing list</div>;
  return (
    <details
      className="ListItem"
      open
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.stopPropagation();
        const { id: childId, parentId: oldParentId } = JSON.parse(
          e.dataTransfer.getData("text/plain")
        );
        dispatch(dropList({ parentId: listId, childId, oldParentId }));
        return false;
      }}
    >
      <ListTitle id={list.id} parentId={parentId} title={list.title} />

      <button
        className="EditButton RemoveTitleButton"
        onClick={() => {
          dispatch(removeList({ listId, parentId }));
        }}
      >
        Remove
      </button>

      <div className="ListChildren">
        <ListDescription id={list.id} description={list.description} />

        {list.children.map((childId) => (
          <List key={childId} listId={childId} parentId={list.id} />
        ))}

        <div>
          <button
            onClick={() => dispatch(addList(list.id))}
            className="EditButton AddChildButton"
          >
            +
          </button>
        </div>
      </div>
    </details>
  );
}

export { ListTitle, ListDescription, List };
