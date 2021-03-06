export class TreeDataProvider {
  public static treeModelSettings: any = {
    'default values': {
      treeModelA: { value: '42' },
      treeModelB: { value: '12' },
      result: { static: false, leftMenu: false, rightMenu: true }
    },
    'first settings source has higher priority': {
      treeModelA: { value: '42', settings: { static: true, leftMenu: true, rightMenu: true } },
      treeModelB: { value: '12', settings: { static: false, leftMenu: false, rightMenu: false } },
      result: { static: true, leftMenu: true, rightMenu: true }
    },
    'second settings source has priority if first settings source doesn\'t have the option': {
      treeModelA: { value: '42' },
      treeModelB: { value: '12', settings: { static: true, leftMenu: true, rightMenu: false } },
      result: { static: true, leftMenu: true, rightMenu: false }
    },
    'first expanded property of cssClasses has higher priority': {
      treeModelA: { value: '12', settings: { cssClasses: { expanded: 'arrow-down-o' } } },
      treeModelB: { value: '42', settings: { cssClasses: { expanded: 'arrow-down', collapsed: 'arrow-right', empty: 'arrow-gray', leaf: 'dot' } } },
      result: { static: false, leftMenu: false, rightMenu: true, cssClasses: { expanded: 'arrow-down-o', collapsed: 'arrow-right', empty: 'arrow-gray', leaf: 'dot' } }
    },
    'first collapsed property of cssClasses has higher priority': {
      treeModelA: { value: '12', settings: { cssClasses: { collapsed: 'arrow-right-o' } } },
      treeModelB: { value: '42', settings: { cssClasses: { expanded: 'arrow-down', collapsed: 'arrow-right', empty: 'arrow-gray', leaf: 'dot' } } },
      result: { static: false, leftMenu: false, rightMenu: true, cssClasses: { expanded: 'arrow-down', collapsed: 'arrow-right-o', empty: 'arrow-gray', leaf: 'dot' } }
    },
    'first empty property of cssClasses has higher priority': {
      treeModelA: { value: '12', settings: { cssClasses: { empty: 'arrow-gray-o' } } },
      treeModelB: { value: '42', settings: { cssClasses: { expanded: 'arrow-down', collapsed: 'arrow-right', empty: 'arrow-gray', leaf: 'dot' } } },
      result: { static: false, leftMenu: false, rightMenu: true, cssClasses: { expanded: 'arrow-down', collapsed: 'arrow-right', empty: 'arrow-gray-o', leaf: 'dot' } }
    },
    'first leaf property of cssClasses has higher priority': {
      treeModelA: { value: '12', settings: { cssClasses: { leaf: 'dot-o' } } },
      treeModelB: { value: '42', settings: { cssClasses: { expanded: 'arrow-down', collapsed: 'arrow-right', empty: 'arrow-gray', leaf: 'dot' } } },
      result: { static: false, leftMenu: false, rightMenu: true, cssClasses: { expanded: 'arrow-down', collapsed: 'arrow-right', empty: 'arrow-gray', leaf: 'dot-o' } }
    },
    'first properties of cssClasses has higher priority': {
      treeModelA: { value: '12', settings: { cssClasses: { expanded: 'arrow-down-o', collapsed: 'arrow-right-o', empty: 'arrow-gray-o', leaf: 'dot-o' } } },
      treeModelB: { value: '42', settings: { cssClasses: { expanded: 'arrow-down', collapsed: 'arrow-right', empty: 'arrow-gray', leaf: 'dot' } } },
      result: { static: false, leftMenu: false, rightMenu: true, cssClasses: { expanded: 'arrow-down-o', collapsed: 'arrow-right-o', empty: 'arrow-gray-o', leaf: 'dot-o' } }
    },
    'second properties of cssClasses in settings has priority, if first source doesn\'t have them': {
      treeModelA: { value: '42', settings: { static: true, leftMenu: true, rightMenu: false } },
      treeModelB: { value: '12', settings: { cssClasses: { expanded: 'arrow-down-o', collapsed: 'arrow-right-o', empty: 'arrow-gray-o', leaf: 'dot-o' } } },
      result: { static: true, leftMenu: true, rightMenu: false, cssClasses: { expanded: 'arrow-down-o', collapsed: 'arrow-right-o', empty: 'arrow-gray-o', leaf: 'dot-o' } }
    },
    'first node property of templates has higher priority': {
      treeModelA: { value: '12', settings: { templates: { node: '<i class="folder-o"></i>' } } },
      treeModelB: { value: '42', settings: { templates: { node: '<i class="folder"></i>', leaf: '<i class="file"></i>', leftMenu: '<i class="navigation"></i>' } } },
      result: { static: false, leftMenu: false, rightMenu: true, templates: { node: '<i class="folder-o"></i>', leaf: '<i class="file"></i>', leftMenu: '<i class="navigation"></i>' } }
    },
    'first leaf property in templates has higher priority': {
      treeModelA: { value: '12', settings: { templates: { leaf: '<i class="file-o"></i>' } } },
      treeModelB: { value: '42', settings: { templates: { node: '<i class="folder"></i>', leaf: '<i class="file"></i>', leftMenu: '<i class="navigation"></i>' } } },
      result: { static: false, leftMenu: false, rightMenu: true, templates: { node: '<i class="folder"></i>', leaf: '<i class="file-o"></i>', leftMenu: '<i class="navigation"></i>' } }
    },
    'first leftMenu property in templates has higher priority': {
      treeModelA: { value: '12', settings: { templates: { leftMenu: '<i class="navigation-o"></i>' } } },
      treeModelB: { value: '42', settings: { templates: { node: '<i class="folder"></i>', leaf: '<i class="file"></i>', leftMenu: '<i class="navigation"></i>' } } },
      result: { static: false, leftMenu: false, rightMenu: true, templates: { node: '<i class="folder"></i>', leaf: '<i class="file"></i>', leftMenu: '<i class="navigation-o"></i>' } }
    },
    'first properties of templates has higher priority': {
      treeModelA: { value: '12', settings: { templates: { node: '<i class="folder-o"></i>', leaf: '<i class="file-o"></i>', leftMenu: '<i class="navigation-o"></i>' } } },
      treeModelB: { value: '42', settings: { templates: { node: '<i class="folder"></i>', leaf: '<i class="file"></i>', leftMenu: '<i class="navigation"></i>' } } },
      result: { static: false, leftMenu: false, rightMenu: true, templates: { node: '<i class="folder-o"></i>', leaf: '<i class="file-o"></i>', leftMenu: '<i class="navigation-o"></i>' } }
    },
    'second properties of templates in settings has priority, if first source doesn\'t have them': {
      treeModelA: { value: '42', settings: { static: true, leftMenu: true, rightMenu: false } },
      treeModelB: { value: '12', settings: { templates: { node: '<i class="folder-o"></i>', leaf: '<i class="file-o"></i>', leftMenu: '<i class="navigation-o"></i>' } } },
      result: { static: true, leftMenu: true, rightMenu: false, templates: { node: '<i class="folder-o"></i>', leaf: '<i class="file-o"></i>', leftMenu: '<i class="navigation-o"></i>' } }
    }
  };
}
