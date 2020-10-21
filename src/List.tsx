import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addNode, changeNodeDescription, changeNodeTitle, removeNode, selectNode } from "./listSlice";

function ListTitle(props: { id: string, title: string }) {
    const [title, setTitle] = useState(props.title);
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();

    return (
        <summary className="ListTitle">
            {editMode ?
                <input
                    type="text"
                    value={title}
                    autoFocus={true}
                    onBlur={() => {
                        setEditMode(false)
                        dispatch(changeNodeTitle({ id: props.id, title }));
                    }}
                    onChange={function (e) { setTitle(e.currentTarget.value) }}
                    onFocus={function (e) { e.currentTarget.select() }}
                    onKeyDown={function (e) { if(e.key === "Enter") e.currentTarget.blur()}}
                /> :
                <span>
                    {props.title}
                    <button className="EditButton EditTitleButton" onClick={() => {
                        setTitle(props.title);
                        setEditMode(true);
                    }}>Edit</button>
                </span>
            }
        </summary>
    );
}

function ListDescription(props: { id: string, description: string }) {
    const [description, setDescription] = useState(props.description);
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();

    return (
        <div className="ListDescription">
            {editMode ?
                <textarea
                    value={description}
                    autoFocus={true}
                    onBlur={() => {
                        setEditMode(false);
                        dispatch(changeNodeDescription({ id: props.id, description }));
                    }}
                    onChange={function (e) { setDescription(e.currentTarget.value) }}
                    onFocus={function (e) { e.currentTarget.select() }}
                    onKeyDown={function (e) { if(e.key === "Enter") e.currentTarget.blur()}}
                /> :
                <div>
                    {props.description}
                    <br />
                    <button className="EditButton EditDescriptionButton" onClick={() => {
                        setDescription(props.description);
                        setEditMode(true);
                    }}>Edit</button>
                </div>
            }
        </div>
    );
}

function List(props: { nodeId: string }) {
    const dispatch = useDispatch();
    const [{id, title, description}, childrenIds] = useSelector(selectNode(props.nodeId));

    return (
        <details className="ListItem">
            <ListTitle id={id} title={title} />

            <button className="EditButton RemoveTitleButton" onClick={() => {
                dispatch(removeNode(id));
            }}>Remove</button>

            <div className="ListChildren">

                <ListDescription id={id} description={description} />

                {childrenIds.map(childId =>
                    <List nodeId={childId} />
                )}

                <div>
                    <button onClick={() => dispatch(addNode(id))} className="AddChildButton">
                        +
                    </button>
                </div>
            </div>

        </details >
    );
}

export { ListTitle, ListDescription, List }