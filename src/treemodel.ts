import { ChildrenLoadingFunction, TreeModelSettings, TreeStatus, FoldingType } from './tree.types';
import { RenamableNode } from './renamablenode';


export interface TreeModel {
  value: string | RenamableNode;
  id?: string | number;
  children?: TreeModel[];
  loadChildren?: ChildrenLoadingFunction;
  settings?: TreeModelSettings;
  _status?: TreeStatus;
  _foldingType?: FoldingType;
}