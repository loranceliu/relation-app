interface Transaction {
    relationUserName: string,
    money: string,
    date: string,
    relationTypeName: string
    relationId: number,
    relationUserId: number,
    transactionType: number,
    relationTypeId: number
}

interface RelationApiParams extends PageParams{
    relationUserId?: number | undefined,
    transactionType?: number | undefined,
    relationTypeId?: number | undefined
    startTime?:  string | undefined,
    endTime?: string | undefined,
    remark?: string | undefined
}

interface DeleteParams {
    ids: number[] | undefined;
}