import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('@/views/login.vue')
};

export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
  path: '/403',
  meta: {
    title: '403-权限不足'
  },
  name: 'error-403',
  component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
  path: '/500',
  meta: {
    title: '500-服务端错误'
  },
  name: 'error-500',
  component: () => import('@/views/error-page/500.vue')
};

export const preview = {
  path: '/preview',
  name: 'preview',
  component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
  path: '/locking',
  name: 'locking',
  component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/BasicDataList',
  component: Main,//实际上输入home路径打开的组件是Main.vue（路由嵌套）
  children: [
    { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: () => import('@/views/home/home.vue') },
    { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
    { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
    { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
    { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
  ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  // {
  //   path: '/access',
  //   icon: 'key',
  //   name: 'access',
  //   title: '权限管理',
  //   component: Main,
  //   children: [
  //     { path: 'index', title: '权限管理', name: 'access_index', component: () => import('@/views/access/access.vue') }
  //   ]
  // },
  {
    path: '/BasicDataList',
    icon: 'compose',
    name: 'BasicDataList',
    title: '基础数据',
    component: Main,
    children: [
      { path: 'index', title: '基础数据', name: 'BasicDataListIndex', component: () => import('@/views/basic-data-list/basic-data-list.vue') }
    ]
  },
  {
    path: '/TaskInfoList',
    icon: 'compose',
    name: 'TaskInfoList',
    title: '项目',
    component: Main,
    children: [
      { path: 'index', title: '项目', name: 'TaskInfoListIndex', component: () => import('@/views/task-info-list/task-info-list.vue') }
    ]
  },
  {
    path: '/ProjectList',
    icon: 'pound',
    name: 'ProjectList',
    title: '任务立项',
    component: Main,
    children: [
      { path: 'index', title: '任务立项', name: 'ProjectListIndex', component: () => import('@/views/project-list/project-list.vue') }
    ]
  },
  {
    path: '/TaskPlanList',
    icon: 'crop',
    name: 'TaskPlanList',
    title: '任务计划',
    component: Main,
    children: [
      { path: 'index', title: '任务计划', name: 'TaskPlanListIndex', component: () => import('@/views/task-plan-list/task-plan-list.vue') }
    ]
  },
  {
    path: '/MaterialsList',
    icon: 'arrow-move',
    name: 'MaterialsList',
    title: '材料汇总',
    component: Main,
    children: [
      { path: 'index', title: '材料汇总', name: 'MaterialsListIndex', component: () => import('@/views/materials-list/materials-list.vue') }
    ]
  },
  {
    path: '/ServiceProcessList',
    icon: 'ios-more',
    name: 'ServiceProcessList',
    title: '服务汇总',
    component: Main,
    children: [
      { path: 'index', title: '服务汇总', name: 'ServiceProcessListIndex', component: () => import('@/views/service-process-list/service-process-list.vue') }
    ]
  },
  {
    path: '/TaskOutsource',
    icon: 'android-upload',
    name: 'TaskOutsource',
    title: '任务委外',
    component: Main,
    children: [
      { path: 'index', title: '任务委外', name: 'TaskOutsourceIndex', component: () => import('@/views/task-outsource/task-outsource.vue') }
    ]
  },
  {
    path: '/TaskSchedule',
    icon: 'arrow-graph-up-right',
    name: 'TaskSchedule',
    title: '任务进度',
    component: Main,
    children: [
      { path: 'index', title: '任务进度', name: 'TaskScheduleIndex', component: () => import('@/views/task-schedule/task-schedule.vue') }
    ]
  },
  {
    path: '/TaskTechDisclosure',
    icon: 'arrow-graph-up-right',
    name: 'TaskTechDisclosure',
    title: '数据报告',
    component: Main,
    children: [
      { path: 'index', title: '数据报告', name: 'TaskTechDisclosureIndex', component: () => import('@/views/task-tech-disclosure/task-tech-disclosure.vue') }
    ]
  },
  {
    path: '/TasksSubmitted',
    icon: 'ios-pause',
    name: 'TasksSubmitted',
    title: '任务交底',
    component: Main,
    children: [
      { path: 'index', title: '任务交底', name: 'TasksSubmittedIndex', component: () => import('@/views/task-submitted/task-submitted.vue') }
    ]
  },
  {
    path: '/SystemInfo',
    icon: 'arrow-graph-up-right',
    name: 'SystemInfo',
    title: '系统信息',
    component: Main,
    children: [
      { path: 'index', title: '系统信息', name: 'SystemInfoIndex', component: () => import('@/views/system-info/system-info.vue') }
    ]
  },
  /*{
    path: '/np-component',
    icon: 'social-buffer',
    name: 'npComponent',
    title: '大修系统组件',
    component: Main,
    children: [
      {
        path: 'BasicDataList',
        icon: 'compose',
        name: 'BasicDataList',
        title: '基础数据',
        component: () => import('@/views/basic-data-list/basic-data-list.vue')
      },
      {
        path: 'ProjectList',
        icon: 'compose',
        name: 'ProjectList',
        title: '项目',
        component: () => import('@/views/basic-data-list/basic-data-list.vue')
      },
      {
        path: 'TaskInfoList',
        icon: 'pound',
        name: 'TaskInfoList',
        title: '任务立项',
        component: () => import('@/views/my-components/markdown-editor/markdown-editor.vue')
      },
      {
        path: 'TaskPlanList',
        icon: 'crop',
        name: 'TaskPlanList',
        title: '任务计划',
        component: () => import('@/views/my-components/image-editor/image-editor.vue')
      },
      {
        path: 'MaterialsList',
        icon: 'arrow-move',
        name: 'MaterialsList',
        title: '材料汇总',
        component: () => import('@/views/my-components/draggable-list/draggable-list.vue')
      },
      {
        path: 'ServiceProcessList',
        icon: 'ios-more',
        name: 'ServiceProcessList',
        title: '服务汇总',
        component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
      },
      {
        path: 'TaskOutsource',
        icon: 'android-upload',
        name: 'TaskOutsource',
        title: '任务委外',
        component: () => import('@/views/my-components/file-upload/file-upload.vue')
      },
      {
        path: 'TaskSchedule',
        icon: 'arrow-graph-up-right',
        name: 'TaskSchedule',
        title: '任务进度',
        // component: () => import('@/views/my-components/count-to/count-to.vue')
        component: () => import('@/views/my-components/count-to/count-to.vue')
      },
      {
        path: 'TaskTechDisclosure',
        icon: 'ios-pause',
        name: 'TaskTechDisclosure',
        title: '任务交底',
        component: () => import('@/views/my-components/split-pane/split-pane-page.vue')
      },
      {
        path: 'demo11',
        icon: 'arrow-graph-up-right',
        name: 'demo11',
        title: '数据报告',
        // component: () => import('@/views/my-components/count-to/count-to.vue')
        component: () => import('@/views/my-components/count-to/count-to.vue')
      },
      {
        path: 'demo12',
        icon: 'arrow-graph-up-right',
        name: 'demo12',
        title: '系统信息',
        // component: () => import('@/views/my-components/count-to/count-to.vue')
        component: () => import('@/views/my-components/count-to/count-to.vue')
      },
    ]
  },*/
  // {
  //     path: '/access-test',
  //     icon: 'lock-combination',
  //     title: '权限测试页',
  //     name: 'accesstest',
  //     access: 0,
  //     component: Main,
  //     children: [
  //         { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: () => import('@/views/access/access-test.vue') }
  //     ]
  // },
  // {
  //     path: '/international',
  //     icon: 'earth',
  //     title: {i18n: 'international'},
  //     name: 'international',
  //     component: Main,
  //     children: [
  //         { path: 'index', title: {i18n: 'international'}, name: 'international_index', component: () => import('@/views/international/international.vue') }
  //     ]
  // },
  // {
  //     path: '/component',
  //     icon: 'social-buffer',
  //     name: 'component',
  //     title: '组件',
  //     component: Main,
  //     children: [
  //         {
  //             path: 'text-editor',
  //             icon: 'compose',
  //             name: 'text-editor',
  //             title: '富文本编辑器',
  //             component: () => import('@/views/basic-data-list/basic-data-list.vue')
  //         },
  //         {
  //             path: 'md-editor',
  //             icon: 'pound',
  //             name: 'md-editor',
  //             title: 'Markdown编辑器',
  //             component: () => import('@/views/my-components/markdown-editor/markdown-editor.vue')
  //         },
  //         {
  //             path: 'image-editor',
  //             icon: 'crop',
  //             name: 'image-editor',
  //             title: '图片预览编辑',
  //             component: () => import('@/views/my-components/image-editor/image-editor.vue')
  //         },
  //         {
  //             path: 'draggable-list',
  //             icon: 'arrow-move',
  //             name: 'draggable-list',
  //             title: '可拖拽列表',
  //             component: () => import('@/views/my-components/draggable-list/draggable-list.vue')
  //         },
  //         {
  //             path: 'area-linkage',
  //             icon: 'ios-more',
  //             name: 'area-linkage',
  //             title: '城市级联',
  //             component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
  //         },
  //         {
  //             path: 'file-upload',
  //             icon: 'android-upload',
  //             name: 'file-upload',
  //             title: '文件上传',
  //             component: () => import('@/views/my-components/file-upload/file-upload.vue')
  //         },
  //         {
  //             path: 'count-to',
  //             icon: 'arrow-graph-up-right',
  //             name: 'count-to',
  //             title: '数字渐变',
  //             // component: () => import('@/views/my-components/count-to/count-to.vue')
  //             component: () => import('@/views/my-components/count-to/count-to.vue')
  //         },
  //         {
  //             path: 'split-pane-page',
  //             icon: 'ios-pause',
  //             name: 'split-pane-page',
  //             title: 'split-pane',
  //             component: () => import('@/views/my-components/split-pane/split-pane-page.vue')
  //         }
  //     ]
  // },
  // {
  //     path: '/form',
  //     icon: 'android-checkbox',
  //     name: 'form',
  //     title: '表单编辑',
  //     component: Main,
  //     children: [
  //         { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: () => import('@/views/form/article-publish/article-publish.vue') },
  //         { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: () => import('@/views/form/work-flow/work-flow.vue') }

  //     ]
  // },
  // // {
  // //     path: '/charts',
  // //     icon: 'ios-analytics',
  // //     name: 'charts',
  // //     title: '图表',
  // //     component: Main,
  // //     children: [
  // //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
  // //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

  // //     ]
  // // },
  // {
  //     path: '/tables',
  //     icon: 'ios-grid-view',
  //     name: 'tables',
  //     title: '表格',
  //     component: Main,
  //     children: [
  //         { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component: () => import('@/views/tables/dragable-table.vue') },
  //         { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: () => import('@/views/tables/editable-table.vue') },
  //         { path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search', component: () => import('@/views/tables/searchable-table.vue') },
  //         { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download', component: () => import('@/views/tables/exportable-table.vue') },
  //         { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: () => import('@/views/tables/table-to-image.vue') }
  //     ]
  // },
  // {
  //     path: '/advanced-router',
  //     icon: 'ios-infinite',
  //     name: 'advanced-router',
  //     title: '高级路由',
  //     component: Main,
  //     children: [
  //         { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: () => import('@/views/advanced-router/mutative-router.vue') },
  //         { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: () => import('@/views/advanced-router/argument-page.vue') }
  //     ]
  // },
  {
    path: '/error-page',
    icon: 'android-sad',
    title: '错误页面',
    name: 'errorpage',
    component: Main,
    children: [
      { path: 'index', title: '错误页面', name: 'errorpage_index', component: () => import('@/views/error-page/error-page.vue') }
    ]
  }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  otherRouter,
  preview,
  locking,
  ...appRouter,
  page500,
  page403,
  page404
];
