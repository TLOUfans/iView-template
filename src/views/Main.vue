<style lang="less">
@import "./main.less";
</style>
<template>
  <div class="main" :class="{'main-hide-text': shrink}">
    <div class="main-header-con" :style="{paddingLeft: 0}">
      <div class="main-header">
        <!-- <div class="navicon-con">
          <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div> -->
        <div style="display:flex;font-size:42px;width:140px;align-items: center;justify-content: center;">ATS</div>
        <div class="header-middle-con" style="margin-left:80px">
          <div class="main-breadcrumb">
            <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
          </div>
        </div>
        <div class="header-avator-con">
          <div class="full-screen-btn-con" style="position:relative" @click.stop="handleProjectBtnClick">
            <Tooltip content="选择项目" placement="bottom">
              <Icon type="search" size="23"/>
            </Tooltip>
            <Tree v-show="showProjectTree" :data="projects" class="np-tree" :render="renderContent"></Tree>
          </div>
          <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
          <lock-screen></lock-screen>
          <message-tip v-model="mesCount"></message-tip>
          <theme-switch></theme-switch>

          <div class="user-dropdown-menu-con">
            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
              <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                <a href="javascript:void(0)">
                  <span class="main-user-name">{{ userName }}</span>
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="ownSpace">个人中心</DropdownItem>
                  <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
            </Row>
          </div>
        </div>
      </div>

      <!-- <div class="tags-con">
        <Button type="primary" @click="changeMenu">横向菜单区域</Button>
        <div style="padding-left:30px;padding-top:5px;">
          <router-link to="/access" class="ivu-btn ivu-btn-primary">
            <i class="el-icon-share"></i>基础数据设置
          </router-link>
          <router-link to="/access" class="ivu-btn ivu-btn-primary">
            <i class="el-icon-share"></i>项目
          </router-link>
          <router-link to="/access" class="ivu-btn ivu-btn-primary">
            <i class="el-icon-share"></i>任务立项
          </router-link>
          <router-link to="/access" class="ivu-btn ivu-btn-primary">
            <i class="el-icon-share"></i>任务计划
          </router-link>
          <router-link to="/access" class="ivu-btn ivu-btn-primary">
            <i class="el-icon-share"></i>材料汇总
          </router-link>
          <router-link to="/access" class="ivu-btn ivu-btn-primary">
            <i class="el-icon-share"></i>任务委外
          </router-link>
          <router-link to="/access" class="ivu-btn ivu-btn-primary">
            <i class="el-icon-share"></i>任务进度
          </router-link>
          <router-link to="/access" class="ivu-btn ivu-btn-primary">
            <i class="el-icon-share"></i>数据报告
          </router-link>
          <router-link to="/access" class="ivu-btn ivu-btn-primary">
            <i class="el-icon-share"></i>系统信息
          </router-link>
          <router-link to="/component/text-editor" class="ivu-btn ivu-btn-primary">
            <i class="el-icon-share"></i>富文本编辑器（子路由示例）
          </router-link>
        </div>
        <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
      </div> -->
      <Menu mode="horizontal" theme="dark" :active-name="$route.name" @on-select="changeMenu" style="z-index:1">
        <template v-for="item in menuList">
          <MenuItem v-if="item.children.length<=1" :name="item.children[0].name" :key="'menuitem' + item.name">
            <Icon :type="item.children[0].icon || item.icon" :key="'menuicon' + item.name"></Icon>
            <span :key="'title' + item.name">{{ itemTitle(item.children[0]) }}</span>
          </MenuItem>
          <Submenu v-if="item.children.length > 1" :name="item.name" :key="item.name">
            <template slot="title">
              <Icon :type="item.icon"></Icon>
              <span class="layout-text">{{ itemTitle(item) }}</span>
            </template>
            <template v-for="child in item.children">
              <MenuItem :name="child.name" :key="'menuitem' + child.name">
                <Icon :type="child.icon" :key="'icon' + child.name"></Icon>
                <span :key="'title' + child.name">{{ itemTitle(child) }}</span>
              </MenuItem>
            </template>
          </Submenu>
        </template>
      </Menu>
    </div>
    <!-- <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
      <shrinkable-menu :shrink="shrink" @on-change="handleSubmenuChange" :theme="menuTheme" :before-push="beforePush" :open-names="openedSubmenuArr"
        :menu-list="menuList">
        <div slot="top" class="logo-con">
          <img v-show="!shrink" src="../images/logo.jpg" key="max-logo" />
          <img v-show="shrink" src="../images/logo-min.jpg" key="min-logo" />
        </div>
      </shrinkable-menu>
    </div> -->
    <!-- <Menu ref="sideMenu" mode="horizontal" :active-name="$route.name" :theme="'dark'" width="auto" @on-select="changeMenu">
        <template v-for="item in menuList">
            <MenuItem v-if="item.children.length<=1" :name="item.children[0].name" :key="'menuitem' + item.name">
                <Icon :type="item.children[0].icon || item.icon" :key="'menuicon' + item.name"></Icon>
                <span class="layout-text" :key="'title' + item.name">{{ itemTitle(item.children[0]) }}</span>
            </MenuItem>

            <Submenu v-if="item.children.length > 1" :name="item.name" :key="item.name">
                <template slot="title">
                    <Icon :type="item.icon"></Icon>
                    <span class="layout-text">{{ itemTitle(item) }}</span>
                </template>
                <template v-for="child in item.children">
                    <MenuItem :name="child.name" :key="'menuitem' + child.name">
                        <Icon :type="child.icon" :key="'icon' + child.name"></Icon>
                        <span class="layout-text" :key="'title' + child.name">{{ itemTitle(child) }}</span>
                    </MenuItem>
                </template>
            </Submenu>
        </template>
    </Menu> -->
    <div class="single-page-con" :style="{width: '100%'}">
      <div class="single-page">
        <keep-alive :include="cachePage">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import shrinkableMenu from "./main-components/shrinkable-menu/shrinkable-menu.vue";
import tagsPageOpened from "./main-components/tags-page-opened.vue";
import breadcrumbNav from "./main-components/breadcrumb-nav.vue";
import fullScreen from "./main-components/fullscreen.vue";
import lockScreen from "./main-components/lockscreen/lockscreen.vue";
import messageTip from "./main-components/message-tip.vue";
import themeSwitch from "./main-components/theme-switch/theme-switch.vue";
import Cookies from "js-cookie";
import util from "@/libs/util.js";

export default {
  components: {
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    fullScreen,
    lockScreen,
    messageTip,
    themeSwitch
  },
  data() {
    return {
      shrink: false,
      userName: "",
      isFullScreen: false,
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
      showProjectTree: false,
      projects: [
        {
          title: "贵阳镁铝设计研究院有限公司",
          expand: true,
          children: [
            {
              title: "总承包业务部",
              expand: true,
              children: [
                {
                  title: "项目部/项目公司"
                },
                {
                  title:
                    "国家电力投资集团公司中电投贵州务正道1000kt/a氧化铝工程"
                }
              ]
            },
            {
              title: "监理公司项目",
              expand: true,
              children: [
                {
                  title:
                    "铜仁大龙煤电锰一体化循环经济工业园锰矿制粉及还原焙烧项目"
                },
                {
                  title: "甘肃省陇西县北关十字铝合金过街人行天桥项目"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  computed: {
    menuList() {
      return this.$store.state.app.menuList;
    },
    pageTagsList() {
      return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
    },
    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    },
    avatorPath() {
      return localStorage.avatorImgPath;
    },
    cachePage() {
      return this.$store.state.app.cachePage;
    },
    lang() {
      return this.$store.state.app.lang;
    },
    menuTheme() {
      return this.$store.state.app.menuTheme;
    },
    mesCount() {
      return this.$store.state.app.messageCount;
    }
  },
  methods: {
    init() {
      let pathArr = util.setCurrentPath(this, this.$route.name);
      this.$store.commit("updateMenulist");
      if (pathArr.length >= 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      this.userName = Cookies.get("user");
      let messageCount = 3;
      this.messageCount = messageCount.toString();
      this.checkTag(this.$route.name);
      this.$store.commit("setMessageCount", 3);
    },
    toggleClick() {
      this.shrink = !this.shrink;
    },
    handleClickUserDropdown(name) {
      if (name === "ownSpace") {
        util.openNewPage(this, "ownspace_index");
        this.$router.push({
          name: "ownspace_index"
        });
      } else if (name === "loginout") {
        // 退出登录
        this.$store.commit("logout", this);
        this.$store.commit("clearOpenedSubmenu");
        this.$router.push({
          name: "login"
        });
      }
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) {
          return true;
        }
      });
      if (!openpageHasTag) {
        //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(
          this,
          name,
          this.$route.params || {},
          this.$route.query || {}
        );
      }
    },
    handleSubmenuChange(val) {
      // console.log(val)
    },
    beforePush(name) {
      // if (name === 'accesstest_index') {
      //     return false;
      // } else {
      //     return true;
      // }
      return true;
    },
    fullscreenChange(isFullScreen) {
      // console.log(isFullScreen);
    },
    changeMenu(active) {
      // debugger;
      // this.$emit("on-change", active);
      // this.$emit("on-change", accesstest);
      this.$router.push({ name: active });
    },
    itemTitle(item) {
      if (typeof item.title === "object") {
        return this.$t(item.title.i18n);
      } else {
        return item.title;
      }
    },
    handleProjectBtnClick() {
      this.showProjectTree = !this.showProjectTree;
    },
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%",
            cursor: 'pointer'
          },
          class: {
            'ivu-tree-title': true
          },
          attrs: {
            title: data.title
          },
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: "ios-paper-outline"
              },
              style: {
                marginRight: "8px"
              }
            }),
            h("span", data.title)
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "32px"
              }
            }
          )
        ]
      );
    },
    append (data) {
        const children = data.children || [];
        children.push({
            title: 'appended node',
            expand: true
        });
        this.$set(data, 'children', children);
    },
    remove (root, node, data) {
        const parentKey = root.find(el => el === node).parent;
        const parent = root.find(el => el.nodeKey === parentKey).node;
        const index = parent.children.indexOf(data);
        parent.children.splice(index, 1);
    }
  },
  watch: {
    $route(to) {
      this.$store.commit("setCurrentPageName", to.name);
      let pathArr = util.setCurrentPath(this, to.name);
      if (pathArr.length > 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      this.checkTag(to.name);
      localStorage.currentPageName = to.name;
    },
    lang() {
      util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
    }
  },
  mounted() {
    this.init();
  },
  created() {
    // 显示打开的页面的列表
    this.$store.commit("setOpenedList");
  }
};
</script>

<style lang="less">
.np-tree {
  position: absolute;
  top: 60px;
  z-index: 11;
  background-color: #fff;
  padding: 10px 10px 10px 0px;
  max-width: 310px;
  left: -50px;
  text-align: left;
  /* font-size: 14px !important; */
  box-shadow: 3px 3px 20px #aaa;
  ul {
    font-size: 14px;
    li {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
