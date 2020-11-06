import { createEntityAdapter, createSlice, EntityState, nanoid } from "@reduxjs/toolkit";
import undoable from "redux-undo";

const defaultTitle = "List Name";
const defaultDescription = "";
const defaultId = nanoid();

const listAdapter = createEntityAdapter<ListNode>();

let initialState = listAdapter.getInitialState({
    topList: defaultId,
    displayedList: defaultId,
});
initialState = listAdapter.addOne(initialState, { id: defaultId, title: defaultTitle, description: defaultDescription, children: [] });

function descendsFrom(state: EntityState<ListNode>, { parentId, childId }: { parentId: string, childId: string }) {
    let parentList = state.entities[parentId];
    if (!parentList?.children) return false
    if (parentList?.children.includes(childId)) return true;
    for (let child of parentList.children) {
        if (descendsFrom(state, { parentId: child, childId })) return true;
    }
    return false;
}

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        changeListTitle: (state, action: { payload: { id: string, title: string } }) => {
            const { id, title } = action.payload;
            const existingList = state.entities[id];
            if (existingList) existingList.title = title;
        },
        changeListDescription: (state, action: { payload: { id: string, description: string } }) => {
            const { id, description } = action.payload;
            const existingList = state.entities[id];
            if (existingList) existingList.description = description;
        },
        addList: {
            reducer(state, action) {
                // add the new node to the state
                listAdapter.addOne(state, { id: action.payload.childId, title: action.payload.title, description: action.payload.description, children: [] });

                // update the new child's parent (node where this was called) with the parent's new child
                state.entities[action.payload.parentId]!.children.push(action.payload.childId);
            },
            // @ts-ignore
            prepare(parentId: string) {
                return {
                    payload: {
                        parentId,
                        childId: nanoid(),
                        title: defaultTitle,
                        description: defaultDescription
                    }
                }
            }
        },
        addParentToList: {
            reducer(state, action) {
                // add new parent node
                listAdapter.addOne(state, { id: action.payload.parentId, title: action.payload.title, description: action.payload.description, children: [action.payload.childId] });
                // if node had a parent, point that parent (now grandparent) to the nodes new parent
                // find parent
                const oldParent = Object.values(state.entities).find(list => list?.children.includes(action.payload.childId));
                // if parent exists, change it's children array to include the new parent instead of the old child
                if (oldParent) {
                    // find old child's location in old parents children array
                    const index = state.entities[oldParent.id]!.children.findIndex(childId => childId === action.payload.childId);
                    // set old parents children array to have new parent in old child's location
                    state.entities[oldParent.id]!.children[index] = action.payload.parentId;
                }

                // change the displayed node to the new parent
                state.displayedList = action.payload.parentId;
                // if child is old top node, make parent new top node
                if (state.topList === action.payload.childId) state.topList = action.payload.parentId;
            },
            // @ts-ignore
            // prepare(grandparentId: string | null, childId: string) {
            prepare(childId: string) {
                return {
                    payload: {
                        parentId: nanoid(),
                        childId,
                        title: defaultTitle,
                        description: defaultDescription
                    }
                }
            }
        },
        dropList: (state, action: { payload: { parentId: string, childId: string, oldParentId: string } }) => {
            // childId is the id of the dragged list, parentId is the id of the last where the dragged item is dropped, 
            // oldParentId is the Id of the list that contained the dragged item.
            const { parentId, childId, oldParentId } = action.payload;

            // stop impossible/meaningless drags
            if (!oldParentId || parentId === childId || parentId === oldParentId) return;

            // check if you are dragging a list to it's own descendent
            if (descendsFrom(state, { parentId: childId, childId: parentId })) return;

            const parentList = state.entities[parentId]!;
            //const childList = state.entities[childId]!;
            const oldParentList = state.entities[oldParentId]!;

            // find where the dragged item was and remove it from it's old containing list
            const childsOldIndex = oldParentList.children.findIndex(id => id === childId);
            oldParentList.children.splice(childsOldIndex, 1);

            // add the dragged item as a child of it's new parent
            parentList.children.push(childId);

            // if ( childId === state.topList) {
            //     const parentsChildren = parentList.children;
            //     const childsChildren = childList.children;
            //     state.topList = parentId;
            //     parentList.children.push(childId);
            //     childList.children.findIndex(id => id === parentI)
            // }


        },
        removeList: (state, action: { payload: { listId: string, parentId: string } }) => {
            const { listId, parentId } = action.payload;
            const parentList = state.entities[parentId]!;
            const index = parentList.children.findIndex(id => id === listId);

            // just remove the list id from it's parents children, don't remove it because it can have multiple parents
            parentList.children.splice(index, 1);

            // 
            // let currentChildren = [action.payload.listId];
            // // remove all nodes in list, then find children of those nodes and repeat
            // while (currentChildren.length) {
            //     let idsToRemove = currentChildren;
            //     currentChildren = currentChildren.flatMap(listId => state.entities[listId]!.children);
            //     listAdapter.removeMany(state, idsToRemove);
            // }

        },
        changeDisplayedList: (state, action) => {
            state.displayedList = action.payload;
        }
    },
})

export const { changeListTitle, changeListDescription, addList, addParentToList, dropList, removeList, changeDisplayedList, undo, redo } = listSlice.actions

export const selectDisplayedList = (state: SystemState) => {
    return state.list.present.displayedList;
}
export const selectTopList = (state: SystemState) => {
    return state.list.present.topList;
}

// export const selectIsValidNode = (state: SystemState) => {
//     return state.list.present.nodes.find;
// }
export const {
    selectAll: selectAllLists,
    selectById: selectListById,
    selectIds: selectListIds,
} = listAdapter.getSelectors((state: SystemState) => state.list.present)

// export const selectNode = (nodeId: string) => (state: SystemState) => {
//     // const nodeIndex = state.list.history[state.list.historyIndex].node;
//     // const childRelationsIndex = state.list.history[state.list.historyIndex].childRelation;
//     // const nodes = state.list.nodeHistory[nodeIndex];
//     // const childRelations = state.list.childRelationHistory[childRelationsIndex];

//     // find the node
//     const node = state.list.present.nodes.find(node => node.id === nodeId);
//     const childrenIds = state.list.present.childRelations.filter(relation => relation.parentId === nodeId).map(relation => relation.childId);

//     // console.log("Node History: ", state.list.nodeHistory);
//     return ([node, childrenIds]) as [ListNode, string[]];
// }

// export const selectNodes = (state: SystemState) => state.list.present.nodes;

export const selectCanUndo = (state: any) => state.list.past.length > 0;
export const selectCanRedo = (state: any) => state.list.future.length > 0;

const undoableReducer = undoable(listSlice.reducer);
export default undoableReducer