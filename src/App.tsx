import React, { useState } from 'react';
import { nanoid } from 'nanoid'
import './App.css';

interface Node {id: string; text: string }
interface ChildRelation {parentId: string; childId: string}

const defaultId = nanoid();
const defaultText = "Double Click to Edit";
const defaultList: Node[] = [{ id: defaultId, text: defaultText }];
const defaultChildren: ChildRelation[] = [];

/*
  table 1: nodes
  id, text

  table 2: children
  id, child id
*/

// function findParent(id: string) {
//   const stack = [defaultList];
//   var node;
//   while (stack.length) {
//     node = stack.shift();
//     if (node?.id === id) {
//       return node;
//     }
//     node?.children && stack.push(...node?.children)
//   }
//   return null;
// }

// function addChild(parentID: string) {
//   const parent = findParent(parentID);
//   if(parent) 
//     parent.children = [{ id: nanoid(), text: defaultText, children: [] }, ...parent.children];
//   console.log("added child")
// }

function ListItem(props: { nodeId: string; nodes: Node[], children: ChildRelation[], handleClick: any}) {
  /*
    Displays text for this item, after the text there is a button to go into edit mode
    When clicked in normal mode expand child elements
  */
  const text = props.nodes.find(node => node.id === props.nodeId)?.text;
  const children = props.children.filter(relation => relation.parentId===props.nodeId);

  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(text);

  return (
    <details className="ListItem">
      <summary>
        {editMode ?
          <input
            type="text"
            value={content}
            autoFocus={true}
            onBlur={() => setEditMode(false)}
            onChange={function (e) { setContent(e.currentTarget.value) }}
          /> :
          <span onDoubleClick={() => { setEditMode(true) }}> {content}  </span>
        }
      </summary>
      <div className="ListChildren">
        {children.map(relation => 
          <ListItem key={relation.childId} nodeId={relation.childId} nodes={props.nodes} children={props.children} handleClick={props.handleClick}/>
        )}
        <AddListItemButton onClick={ props.handleClick(props.nodeId) } />
      </div>
    </details>
  );
}

function AddListItemButton(props: { onClick: any }) {
  return (
    <div>
      <button onClick={props.onClick}>
        New List Item
    </button>
    </div>
  );
}

function App() {
  const [nodes, setNodes] = useState(defaultList);
  const [children, setChildren] = useState(defaultChildren);

  const handleClick = (parentId: string) => () => {
    const childId = nanoid();
    setNodes([...nodes, { id: childId, text: defaultText }]);
    setChildren([...children, {parentId, childId}]);
  }

  return (
    <div className="App">
      Lists
      <br />
      <ListItem nodeId={defaultId} nodes={nodes} children={children} handleClick={handleClick}/>
    </div>
  );
}

export default App;
