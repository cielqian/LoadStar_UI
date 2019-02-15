<template>
    <div>
        <v-contextmenu theme="dark" ref="contextmenu">
            <v-contextmenu-item v-if="menus.indexOf('view') >= 0" @click="redirect(selectedLink)">浏览</v-contextmenu-item>
            <v-contextmenu-item v-if="menus.indexOf('addOften') >= 0" @click="addToOften(selectedLink)">添加至“常用”</v-contextmenu-item>
            <v-contextmenu-item v-if="menus.indexOf('removeOften') >= 0" @click="removeFromOften(selectedLink)">从“常用”移除</v-contextmenu-item>
            <v-contextmenu-item v-if="menus.indexOf('delete') >= 0" @click="removeLink(selectedLink)">删除</v-contextmenu-item>
        </v-contextmenu>
    </div>
</template>
<script>

export default {
    name: "LSContentMenu",
    data(){
        return{
            selectedLink:{},
            menus:''
        }
    },
    methods:{
        show(link, x, y, menus){
            this.menus = menus;
            this.selectedLink = link;
            this.$refs.contextmenu.show({top:y+10, left:x+10});
        },
        redirect(link) {
            this.$store.dispatch("visitLink", link);
        },
        removeLink(link) {
            let _this = this;
            _this.$confirm("" + row.title, "确认删除").then(() => {
                if (_this.selectedFolderName == "回收站") {
                _this.$store.dispatch("removeLink", row.id).then(() => {
                    api.getAllLinksUnderFolder(_this.selectedFolderId).then(res => {
                    _this.links = res.data;
                    });
                });
                } else {
                _this.$store.dispatch("trashLink", row.id).then(() => {
                    api.getAllLinksUnderFolder(_this.selectedFolderId).then(res => {
                    _this.links = res.data;
                    });
                });
                }
            });
        },
        addToOften(link) {
            let _this = this;
            _this.$store.dispatch("addLinkToOften", link).then(() => {
                _this.$notify({
                title: '提示',
                message: '添加成功'
                });
            });
        },
        removeFromOften(link){
            let _this = this;
            _this.$store.dispatch("removeLinkFromOften", link);
        }
    },
    mounted(){
        this.menus = '';
    }
}
</script>
<style lang="scss" scoped>
</style>
