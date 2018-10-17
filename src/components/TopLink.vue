<template>
    <div>
        <LinkCardItem :links="links" title="Top"
        @on-click="onClick"
        @on-remove="onRemove"
        @on-up="onUp"
        @on-down="onDown"></LinkCardItem>
    </div>
</template>

<script>
import LinkCardItem from './LinkItems.vue';
import { mapGetters, mapState } from "vuex";
export default {
    name: "TopLink",
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            links: state => state.link.topLink,
        })
    },
    components:{LinkCardItem},
    methods:{
        onClick: function (row) {
            this.$emit('on-click', row);
        },
        onRemove: function (row){
            this.$emit('on-remove', row);
        },
        onUp: function (row) {
            this.$emit('on-up', row);      
        },
        onDown: function (row) {
            this.$emit('on-down', row);      
        }
    },
    mounted(){
        this.$store.dispatch('getTopLink');
    }
}
</script>

<style scoped>

</style>

