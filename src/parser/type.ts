export interface IAst{
    type: string;
    value: boolean | number;
    first?: IAst;
    second?: IAst;
}