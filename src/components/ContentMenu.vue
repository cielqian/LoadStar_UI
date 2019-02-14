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
    data(){
        return{
            selectedLink:{}
        }
    },
    methods:{
        show(link, x, y){
            this.selectedLink = link;
            this.$refs.contextmenu.show({top:y+10, left:x+10});
        },
        redirect(link) {
            this.$store.dispatch("visitLink", link);
        },
        removeLink(link) {
        
        },
        addToOften(link) {
            let _this = this;
            _this.$store.dispatch("addLinkToOften", link.id);
        },
        removeFromOften(link){
            
        }
    },
    mounted(){
    }
}
</script>
<style lang="scss" scoped>
</style>
