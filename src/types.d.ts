interface ListNode {
    id: string
    title: string
    description: string
}

interface ChildRelation {
    parentId: string
    childId: string
}

interface ListState {
    displayedList: string,
    nodeHistory: ListNode[][],
    childRelationHistory: ChildRelation[][],
    nodeHistoryIndex: number,
}

interface SystemState {
    list: ListState
}

