<template>
    <div id="nav">
        <el-menu background-color="#171717"
            text-color="#fff"
            active-text-color="#ffd04b" default-active="1" class="el-menu-vertical-demo">
            <el-menu-item index="1" @click="goTo('/Home')">
                <img class="ls_logo_word_mid ls_inline" src="../assets/new-logo2.png">
            </el-menu-item>
            <el-menu-item index="1"  @click="goTo('/Home')">
                <template slot="title">
                    <span class="nav_menu">{{$t('nav.lblStart')}}</span>
                </template>
            </el-menu-item>
            <el-menu-item index="2" @click="goTo('/Folder')">
                <template slot="title">
                    <span class="nav_menu">{{$t('nav.lblFolder')}}</span>
                </template>
            </el-menu-item>
            <el-menu-item index="3" @click="goTo('/Tag')">
                <template slot="title">
                    <span class="nav_menu">{{$t('nav.lblTag')}}</span>
                </template>
            </el-menu-item>
            <!-- <el-menu-item index="4" @click="goTo('/Analysis')">
                <template slot="title">
                    <span class="nav_menu">{{$t('nav.lblAnalysis')}}</span>
                </template>
            </el-menu-item> -->
            <!-- <el-menu-item index="4">
                <template slot="title">
                    <span class="nav_menu">{{$t('nav.lblRecent')}}</span>
                </template>
            </el-menu-item> -->
            <el-menu-item index="5" @click="goTo('/Setting')">
                <template slot="title">
                    <span class="nav_menu">{{$t('nav.lblSetting')}}</span>
                </template>
            </el-menu-item>
        </el-menu>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 214px;
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

