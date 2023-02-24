export interface Field {
    name: string,
    question: string,
    placeholder: string,
    hasExtra: boolean
    extra: string,
    isSelect: boolean,
    selectList: (Array<string> | null)
}