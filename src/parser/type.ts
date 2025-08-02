export interface IAst{
    type: string;
    value: boolean;
    first?: IAst;
    second?: IAst;
}