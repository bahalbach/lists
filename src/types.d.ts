interface ListNode {
    id: string
    title: string
    description: string
    children: string[]
}

interface ListState {
    topList: string,
    displayedList: string,
    ids: string[],
    entities: { ListNode }
    // nodeHistory: ListNode[][],
    // childRelationHistory: ChildRelation[][],
    // history: {node: number, childRelation: number}[],
    // historyIndex: number
}

interface SystemState {
    list: { present: ListState }
}

