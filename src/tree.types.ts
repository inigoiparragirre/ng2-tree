import * as _ from 'lodash';
import { TreeModel } from './treemodel';
import { CssClasses } from './cssclasses';
import { Templates } from './templates';

export class FoldingType {
  public static Expanded: FoldingType = new FoldingType('node-expanded');
  public static Collapsed: FoldingType = new FoldingType('node-collapsed');
  public static Leaf: FoldingType = new FoldingType('node-leaf');

  public constructor(private _cssClass: string) {
  }

  public get cssClass(): string {
    return this._cssClass;
  }
}

export type ChildrenLoadingFunction = (callback: (children: TreeModel[]) => void) => void;


export class TreeModelSettings {
  /* cssClasses - set custom css classes which will be used for a tree */
  public cssClasses?: CssClasses;

  /* Templates - set custom html templates to be used in a tree */
  public templates?: Templates;

  /**
   * "leftMenu" property when set to true makes left menu available.
   * @name TreeModelSettings#leftMenu
   * @type boolean
   * @default false
   */
  public leftMenu?: boolean;

  /**
   * "rightMenu" property when set to true makes right menu available.
   * @name TreeModelSettings#rightMenu
   * @type boolean
   * @default true
   */
  public rightMenu?: boolean;

  /**
   * "static" property when set to true makes it impossible to drag'n'drop tree or call a menu on it.
   * @name TreeModelSettings#static
   * @type boolean
   * @default false
   */
  public static?: boolean;

  public static merge(sourceA: TreeModel, sourceB: TreeModel): TreeModelSettings {
    return _.defaultsDeep({}, _.get(sourceA, 'settings'), _.get(sourceB, 'settings'), {static: false, leftMenu: false, rightMenu: true});
  }
}

export enum TreeStatus {
  New,
  Modified,
  IsBeingRenamed
}


