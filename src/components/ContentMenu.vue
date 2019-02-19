<template>
    <div>
        <v-contextmenu theme="dark" ref="contextmenu">
            <v-contextmenu-item v-if="menus.indexOf('view') >= 0" @click="redirect(selectedLink)">浏览</v-contextmenu-item>
            <v-contextmenu-item v-if="menus.indexOf('edit') >= 0" @click="edit(selectedLink)">编辑</v-contextmenu-item>
            <v-contextmenu-item v-if="menus.indexOf('addOften') >= 0" @click="addToOften(selectedLink)">添加至“常用”</v-contextmenu-item>
            <v-contextmenu-item v-if="menus.indexOf('removeOften') >= 0" @click="removeFromOften(selectedLink)">从“常用”移除</v-contextmenu-item>
            <v-contextmenu-item v-if="menus.indexOf('trans') >= 0" @click="transLink(selectedLink)">删除</v-contextmenu-item>
            <v-contextmenu-item v-if="menus.indexOf('delete') >= 0" @click="removeLink(selectedLink)">删除</v-contextmenu-item>
        </v-contextmenu>
        <el-dialog
        title="Edit Link"
        :visible.sync="dialog.addLinkDialogVisiable"
        width="40%">
        <LSLinkDetail ref="linkDetail" :link="selectedLink"></LSLinkDetail>
        <span slot="footer">
            <el-button @click="dialog.addLinkDialogVisiable = false">Cancel</el-button>
            <el-button type="primary"  @click="saveLink">Create</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
import LSLinkDetail from "./LinkDetail.vue";
export default {
    name: "LSContentMenu",
    data(){
        return{
            dialog: {
                addLinkDialogVisiable: false,
            },
            selectedLink:{},
            menus:''
        }
    },
    components: { LSLinkDetail },
    methods:{
        show(link, x, y, menus){
            this.menus = menus;
            this.selectedLink = link;
            this.$refs.contextmenu.show({top:y+10, left:x+10});
        },
        redirect(link) {
            this.$store.dispatch("visitLink", link);
        },
        edit(link){
            this.dialog.addLinkDialogVisiable = true;
            this.$nextTick(_ => {
                this.$refs.linkDetail.loadTag();
            });
        },
        saveLink: function () {
            let _this = this;
            _this.$refs.linkDetail.saveLink(() => {
                _this.dialog.addLinkDialogVisiable = false;
                _this.$emit('onSaved');
            });
        },
        transLink(link){
            let _this = this;
            _this.$confirm("" + link.title, "确认删除").then(() => {
                _this.$store.dispatch("trashLink", link.id).then(() => {
                    _this.$emit('changed');
                });
            });
        },
        removeLink(link) {
            let _this = this;
            _this.$confirm("" + link.title, "确认删除").then(() => {
                _this.$store.dispatch("removeLink", link.id).then(() => {
                    _this.$emit('changed');
                });
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
