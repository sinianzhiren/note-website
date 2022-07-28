/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    "intro",
    {
      type: 'doc',
      id: 'shortcut-keyboard',
      label: '快捷键'
    },
    /**
     {
      type: "category",
      label: '基础扩展',
      link: {
        type: "generated-index"
      },
      collapsed: false,
      collapsible: true,
      items: [
        "tutorial-extras/translate-your-site",
        "tutorial-extras/manage-docs-versions"
      ]
    },
     {
      type: "category",
      label: '基础教程',
      link: {
        type: 'generated-index',
        title: '基础教程汇总',
        // description: 'ddsdddsdsdsds'
      },
      collapsed: true,
      collapsible: true,
      items: [
        "tutorial-basics/congratulations",
        "tutorial-basics/create-a-blog-post",
        "tutorial-basics/markdown-features",
        "tutorial-basics/deploy-your-site",
        "tutorial-basics/create-a-document",
        "tutorial-basics/create-a-page"
      ]
    },
     */
    {
      type: "category",
      label: '数据结构和算法',
      link: {
        type: "generated-index",
        title: '数据结构和算法',
        description: '记录前端常见的数据结构和算法'
      },
      collapsed: true,
      collapsible: true,
      items: [
        "data-structure-algorithm/learn",
        {
          type: "category",
          label: '数据结构',
          link: {
            type: 'doc',
            id: 'data-structure-algorithm/data-structure/index'
          },
          collapsed: true,
          collapsible: true,
          items: [
            "data-structure-algorithm/data-structure/array",
            "data-structure-algorithm/data-structure/binary-tree",
            "data-structure-algorithm/data-structure/stack",
          ]
        },
        {
          type: "category",
          label: '前端算法',
          link: {
            type: "doc",
            id: 'data-structure-algorithm/front-algorithm/index'
          },
          collapsible: true,
          collapsed: true,
          items: [
            "data-structure-algorithm/front-algorithm/sort",
            "data-structure-algorithm/front-algorithm/string",
            "data-structure-algorithm/front-algorithm/recursion"
          ]
        }
      ]
    },
    {
      type: "category",
      label: '手写代码',
      link: {
        type: "generated-index"
      },
      collapsed: true,
      collapsible: true,
      items: [
        "write-code/promise",
        "write-code/call-bind-new-apply"
      ]
    },
    {
      type: "category",
      label: '前端基础',
      link: {
        type: "generated-index"
      },
      collapsible: true,
      collapsed: true,
      items: [
        "front-base/ES6",
        "front-base/html",
        "front-base/css",
        "front-base/asynchronous",
        "front-base/browser",
        "front-base/safe",
      ]
    },
    {
      type: "category",
      label: 'React知识',
      link: {
        type: "generated-index"
      },
      collapsed: true,
      collapsible: true,
      items: [
        "react/react18",
        "react/hooks",
        "react/skill",
        "react/custom-hooks",
        "react/reactDomApi",
      ]
    },
    {
      type: "category",
      label: 'vue知识',
      link: {
        type: "generated-index"
      },
      collapsed: true,
      collapsible: true,
      items: [
        "vue/base",
        "vue/vue-source",
        "vue/vue-msg"
      ]
    },
    {
      type: "category",
      label: '前端工程化',
      link: {
        type: "generated-index"
      },
      collapsible: true,
      collapsed: true,
      items: [
        "webpack/optimization"
      ]
    },
    {
      type: "category",
      label: '运维知识',
      link: {
        type: "generated-index"
      },
      collapsible: true,
      collapsed: true,
      items: [
        "devops/shell",
        "devops/docker/docker",
        "devops/docker/docker-compose",
      ]
    },
    {
      type: "category",
      label: 'nodejs',
      link: {
        type: "generated-index"
      },
      collapsed: true,
      collapsible: true,
      items: [
        "nodejs/koa",
        "nodejs/node-concurrent-request",
        "nodejs/nodejs-model",
        "nodejs/three-model",
        "nodejs/npm-package-update",
      ]
    },
    {
      type: "category",
      label: '数据库',
      link: {
        type: "generated-index"
      },
      collapsed: true,
      collapsible: true,
      items: [
        "dataBase/mysql",
      ]
    },
    {
      type: "category",
      label: 'typeScript',
      link: {
        type: "generated-index"
      },
      collapsed: true,
      collapsible: true,
      items: [
        "typeScript/types"
      ]
    },
    {
      type: "category",
      label: '非技术问题',
      link: {
        type: "generated-index"
      },
      collapsed: true,
      collapsible: true,
      items: [
        "other-problem/distribution"
      ]
    },
  ]
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      items: ['hello'],
    },
  ],
   */
};

module.exports = sidebars;
