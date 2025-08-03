export interface IAst {
  type: string;
  value: boolean | number;
  first?: IAst;
  second?: IAst;
}

export interface INode {
  name: string;
  children: INode[];
}
