<template>
  <div id="app" class="app">
    <h1 class="app-title">Quiz后台管理</h1>

    <el-container class="app-body">
      <el-aside width="180px" class="app-aside">
        <el-menu
          router
          :default-openeds="['1']"
          :default-active="$route.path"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>系统信息管理</span>
            </template>
            <el-menu-item index="/user">用户管理</el-menu-item>
            <el-menu-item index="/question">题目管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main class="app-main">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
}

#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", Arial, sans-serif;
  color: #303133;
  background-color: #fff;
}

.app {
  padding: 16px;
  height: 100%;
}

.app-title {
  font-size: 26px;
  font-weight: 600;
  color: #303133;
  padding: 8px 8px 16px;
}

.app-body {
  height: calc(100% - 58px);
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.app-aside {
  border-right: 1px solid #ebeef5;
}

.app-aside .el-menu {
  border-right: none;
}

.app-main {
  padding: 20px 24px;
  overflow: auto;
}
</style>
