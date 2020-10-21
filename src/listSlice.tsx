import { createSlice, nanoid } from "@reduxjs/toolkit";
import undoable from "redux-undo";

const defaultTitle = "List Name";
const defaultDescription = "List Description";
const defaultId = nanoid();

const initialState: ListState = {
    displayedList: defaultId,
    nodes: [{ id: defaultId, title: defaultTitle, description: defaultDescription }],
    childRelations: [],
    // nodeHistory: [[{id: defaultId, title: defaultTitle, description: defaultDescription}]],
    // childRelationHistory: [[]],
    // history: [{node: 0, childRelation: 0}],
    // historyIndex: 0
}

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        changeNodeTitle: (state, action) => {
            state.nodes.find(node => node.id === action.payload.id)!.title = action.payload.title;
            // const currentHistory = state.history[state.historyIndex];
            // const nodeIndex = currentHistory.node;
            // const currentNodes = state.nodeHistory[nodeIndex].slice();
            // // update the title of the current node
            // currentNodes.find(node => node.id === action.payload.id)!.title = action.payload.title;
            // // add the new node list to the node history
            // state.nodeHistory[nodeIndex+1] = currentNodes;
            // // update the history pointer to point to the updated history
            // state.historyIndex = state.historyIndex+1;
            // state.history[state.historyIndex] = {node: nodeIndex+1, childRelation: currentHistory.childRelation};  
        },
        changeNodeDescription: (state, action) => {
            state.nodes.find(node => node.id === action.payload.id)!.description = action.payload.description;
            // const currentHistory = state.history[state.historyIndex];
            // const nodeIndex = currentHistory.node;
            // const currentNodes = state.nodeHistory[nodeIndex].slice();
            // // update the description of the current node
            // currentNodes.find(node => node.id === action.payload.id)!.description = action.payload.description;
            // // add the new node list to the node history
            // state.nodeHistory[nodeIndex+1] = currentNodes;
            // // update the history pointer to point to the updated history
            // state.historyIndex = state.historyIndex+1;
            // state.history[state.historyIndex] = {node: nodeIndex+1, childRelation: currentHistory.childRelation};  
        },
        addNode: {
            reducer(state, action) {
                state.nodes.push({ id: action.payload.childId, title: action.payload.title, description: action.payload.description });
                state.childRelations.push({ parentId: action.payload.parentId, childId: action.payload.childId });
                // const currentHistory = state.history[state.historyIndex];
                // const nodeIndex = currentHistory.node;
                // const currentNodes = state.nodeHistory[nodeIndex];
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
        addParentToNode: {
            reducer(state, action) {
                // add new parent node
                state.nodes.push({ id: action.payload.parentId, title: action.payload.title, description: action.payload.description });
                // if node had a parent, point that parent to the nodes new parent
                const parent = state.childRelations.find(relation => relation.childId === action.payload.childId);
                if (parent ) parent.childId = action.payload.parentId;
                // add new childRelation
                state.childRelations.push({ parentId: action.payload.parentId, childId: action.payload.childId });

                // change the displayed node to the new parent
                state.displayedList = action.payload.parentId;
            },
            // @ts-ignore
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
        removeNode: (state, action) => {
            let currentChildren = [action.payload];
            // remove all nodes in list, then find children of those nodes and repeat
            while (currentChildren.length) {
                let idsToRemove = currentChildren;
                state.nodes = state.nodes.filter(node => !idsToRemove.includes(node.id));
                state.childRelations = state.childRelations.filter(relation => !idsToRemove.includes(relation.childId));
                currentChildren = state.childRelations.filter(relation => idsToRemove.includes(relation.parentId)).map(relation => relation.childId);
            }

        },
        changeDisplayedList: (state, action) => {
            state.displayedList = action.payload;
        }
    },
})

export const { changeNodeTitle, changeNodeDescription, addNode, addParentToNode, removeNode, changeDisplayedList, undo, redo } = listSlice.actions

export const selectDisplayedNode = (state: SystemState) => {
    return state.list.present.displayedList;
}
export const selectNode = (nodeId: string) => (state: SystemState) => {
    // const nodeIndex = state.list.history[state.list.historyIndex].node;
    // const childRelationsIndex = state.list.history[state.list.historyIndex].childRelation;
    // const nodes = state.list.nodeHistory[nodeIndex];
    // const childRelations = state.list.childRelationHistory[childRelationsIndex];

    const node = state.list.present.nodes.find(node => node.id === nodeId)!;
    const childrenIds = state.list.present.childRelations.filter(relation => relation.parentId === nodeId).map(relation => relation.childId);

    // console.log("Node History: ", state.list.nodeHistory);
    return ([node, childrenIds]) as [ListNode, string[]];
}

export const selectNodes = (state: SystemState) => state.list.present.nodes;

export const selectCanUndo = (state: any) => state.list.past.length > 0;
export const selectCanRedo = (state: any) => state.list.future.length > 0;

const undoableReducer = undoable(listSlice.reducer);
export default undoableReducer