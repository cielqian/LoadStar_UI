<template>
    <div id="nav">
        <el-menu background-color="#171717"
            text-color="#fff"
            active-text-color="#ffd04b" default-active="1" class="el-menu-vertical-demo">
            <el-menu-item index="1"  @click="goTo('/Home')">
                <template slot="title">
                    <span class="nav_menu">导航</span>
                </template>
            </el-menu-item>
            <el-menu-item index="2" @click="goTo('/Folder')">
                <template slot="title">
                    <span class="nav_menu">分类</span>
                </template>
            </el-menu-item>
            <el-menu-item index="3" @click="goTo('/Tag')">
                <template slot="title">
                    <span class="nav_menu">标签</span>
                </template>
            </el-menu-item>
            <el-menu-item index="4">
                <template slot="title">
                    <span class="nav_menu">最近</span>
                </template>
            </el-menu-item>
            <el-menu-item index="5">
                <template slot="title">
                    <span class="nav_menu">设置</span>
                </template>
            </el-menu-item>
        </el-menu>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 400px;
  height: 100%;
}

#nav{
    height: 100%;
}

.nav_menu{
    font-size: 1.2rem;
}
</style>

<script>
export default {
  methods: {
    goTo(path) {
      this.$router.push(path)
    }
  }
};
</script>

