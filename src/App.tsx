import React, { useState } from 'react';
import { nanoid } from 'nanoid'
import './App.css';

interface Node { id: string; text: string; desc: string }
interface ChildRelation { parentId: string; childId: string }
enum EditModes {
  None,
  Title,
  Description
}

const defaultId = nanoid();
const defaultText = "Title";
const defaultDesc = ""
const defaultList: Node[] = [];
const defaultChildren: ChildRelation[] = [];

function ListItem(props: { nodeId: string; nodes: Node[], children: ChildRelation[], addChild: any, removeThis: any }) {
  /*
    Displays text for this item, after the text there is a button to go into edit mode
    When clicked in normal mode expand child elements
  */
  const node = props.nodes.find(node => node.id === props.nodeId)
  const text = node?.text;
  const desc = node?.desc;
  const children = props.children.filter(relation => relation.parentId === props.nodeId);

  const [editMode, setEditMode] = useState(EditModes.None);
  const [title, setTitle] = useState(text+props.nodeId);
  const [description, setDescription] = useState(desc);

  return (
    <details className="ListItem">

      <summary className="ListTitle">
        {editMode === EditModes.Title ?
          <input
            type="text"
            value={title}
            autoFocus={true}
            onBlur={() => setEditMode(EditModes.None)}
            onChange={function (e) { setTitle(e.currentTarget.value) }}
            onFocus={function (e) {e.currentTarget.select()}}
          /> :
          <span>
            {title}
            <button className="EditButton EditTitleButton" onClick={() => { setEditMode(EditModes.Title) }}>Edit</button>
            <button className="EditButton RemoveTitleButton" onClick={props.removeThis(props.nodeId)}>Remove</button>
          </span>
        }
      </summary>

      <div className="ListChildren">

        <div className="ListDescription">
          {editMode === EditModes.Description ?
            <textarea
              value={description}
              autoFocus={true}
              onBlur={() => setEditMode(EditModes.None)}
              onChange={function (e) { setDescription(e.currentTarget.value) }}
            /> :
            <div>
              {description}
              <br />
              <button className="EditButton EditDescriptionButton" onClick={() => { setEditMode(EditModes.Description) }}>Edit</button>
            </div>
          }
        </div>

        {children.map(relation =>
          <ListItem key={relation.childId} nodeId={relation.childId} nodes={props.nodes} children={props.children} addChild={props.addChild} removeThis={props.removeThis} />
        )}

        <div>
          <button onClick={props.addChild(props.nodeId)} className="AddChildButton">
            +
          </button>
        </div>
      </div>

    </details>
  );
}

function SelectList() {
  return (
    <select>

    </select>
  );
}

function App() {
  const [historyIndex, setHistoryIndex] = useState(0);
  const [nodeHistory, setNodeHistory] = useState([defaultList]);
  const [childrenHistory, setChildrenHistory] = useState([defaultChildren]);

  const [editMode, setEditMode] = useState(EditModes.None);
  const [title, setTitle] = useState(defaultText);
  const [description, setDescription] = useState(defaultDesc);

  const nodes = nodeHistory[historyIndex];
  const children = childrenHistory[historyIndex];
  console.log("Nodes: ", nodes);
  console.log("Children: ", children);

  const addChild = (parentId: string) => () => {
    const childId = nanoid();
    setNodeHistory(nodeHistory.slice(0,historyIndex+1).concat([[...nodes, { id: childId, text: defaultText, desc: defaultDesc }]]));
    setChildrenHistory(childrenHistory.slice(0,historyIndex+1).concat([[...children, { parentId, childId }]]));
    setHistoryIndex(historyIndex + 1);
  }

  const removeThis = (nodeId: string) => () => {
    let currentChildren = [nodeId];
    let newNodes = nodeHistory[historyIndex];
    let newChildren = childrenHistory[historyIndex];

    let idsRemoved = 0;

    while (currentChildren.length) {
      let idsToRemove = currentChildren;
      newNodes = newNodes.filter(node => !idsToRemove.includes(node.id));
      newChildren = newChildren.filter(relation => !idsToRemove.includes(relation.childId));
      currentChildren = children.filter(relation => idsToRemove.includes(relation.parentId)).map(relation => relation.childId);
      idsRemoved += idsToRemove.length;
    }
    console.log("Removed ids: ", idsRemoved);

    setNodeHistory(nodeHistory.slice(0,historyIndex+1).concat([newNodes]));
    setChildrenHistory(childrenHistory.slice(0,historyIndex+1).concat([newChildren]));
    setHistoryIndex(historyIndex + 1);
  }

  return (
    <div className="App">
      <SelectList />
      <summary className="ListTitle">
        {editMode === EditModes.Title ?
          <input
            type="text"
            value={title}
            autoFocus={true}
            onBlur={() => setEditMode(EditModes.None)}
            onChange={function (e) { setTitle(e.currentTarget.value) }}
            onFocus={function (e) {e.currentTarget.select()}}
          /> :
          <span>
            {title}
            <button className="EditButton EditTitleButton" onClick={() => { setEditMode(EditModes.Title) }}>Edit</button>
            {/* <button className="EditButton RemoveTitleButton" onClick={props.removeThis(props.nodeId)}>Remove</button> */}
          </span>
        }
      </summary>
      <div className="ListDescription">
        {editMode === EditModes.Description ?
          <textarea
            value={description}
            autoFocus={true}
            onBlur={() => setEditMode(EditModes.None)}
            onChange={function (e) { setDescription(e.currentTarget.value) }}
          /> :
          <div>
            {description}
            <br />
            <button className="EditButton EditDescriptionButton" onClick={() => { setEditMode(EditModes.Description) }}>Edit</button>
          </div>
        }
      </div>

      {children.filter(relation => relation.parentId === defaultId).map(relation =>
        <ListItem key={relation.childId} nodeId={relation.childId} nodes={nodes} children={children} addChild={addChild} removeThis={removeThis} />
      )}

      <div>
        <button onClick={addChild(defaultId)} className="AddChildButton">
          +
          </button>
      </div>
      <button
        className="ControlButton UndoButton"
        onClick={() => {
          console.log("historyIndex: ", historyIndex);
          console.log("nodeHistory.length: ", nodeHistory.length);
          if (historyIndex > 0) setHistoryIndex(historyIndex - 1)
        }}> Undo
      </button>
      <button
        className="ControlButton RedoButton"
        onClick={() => {
          console.log("historyIndex: ", historyIndex);
          console.log("nodeHistory.length: ", nodeHistory.length);
          if (historyIndex < nodeHistory.length - 1) setHistoryIndex(historyIndex + 1)
        }}> Redo
      </button>
    </div>
  );
}

export default App;
