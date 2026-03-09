export interface TalentsList {
  id: string;
  listName: string;
  countTalents: number;
}

export interface MyCustomTalentsListsProps {
  lists: TalentsList[];
}
