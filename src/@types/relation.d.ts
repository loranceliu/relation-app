interface RelationUser {
    relationUserId: number,
    relationUserName: string,
    sex: number,
    status: number,
    income: number,
    expend: number,
    remark: string
}

interface RelationUserIndex {
    type: string,
    data: RelationUser[]
}

interface RelationForm {
    relationId: number | undefined;
    relationUserId: number | undefined;
    relationTypeId: number | undefined;
    transactionType: number | undefined;
    relationUserName: string | undefined;
    relationTypeName: string | undefined;
    money: number  | undefined;
    remark: string | undefined;
    date: string | undefined;
}

interface RelationUserForm {
    relationUserId: number | undefined;
    relationUserName: string | undefined;
    sex: number | undefined;
    status: number | undefined;
    remark: string | undefined;
    income: number | undefined;
    expend: number | undefined;
}

interface RelationType {
    relationTypeId: number | undefined,
    relationTypeName: string | undefined
}