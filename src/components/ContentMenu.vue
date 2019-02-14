<template>
    <div>
        <v-contextmenu theme="dark" ref="contextmenu">
            <v-contextmenu-item @click="redirect(selectedLink)">浏览</v-contextmenu-item>
            <v-contextmenu-item @click="addToOften(selectedLink)">添加至“常用”</v-contextmenu-item>
            <v-contextmenu-item @click="removeLink(selectedLink)">删除</v-contextmenu-item>
        </v-contextmenu>
    </div>
</template>
<script>

export default {
    name: "LSContentMenu",
    methods:{
        redirect(link) {
            this.$store.dispatch("visitLink", link);
        },
        removeLink(link) {
        
        },
        addToOften(link) {
            let _this = this;
            _this.$store.dispatch("addLinkToOften", link.id);
        },
    },
    mounted(){
        console.log('e' + this.$refs.contextmenu)
    }
}
</script>
<style lang="scss" scoped>
</style>
