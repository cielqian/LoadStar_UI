<template>
  <div class="ls_link_list ls_overflow">
    <div v-if="links.length == 0 && loading" style="width:100%;height:150px">
      <el-col class="ls_link_item" :xs="24" :sm="11" :md="5" v-for="n in 4" :key="n">
        <content-loader
          class="ls_bg_white"
          :height="120"
          :width="400"
          :speed="2"
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <rect x="100" y="50" rx="3" ry="3" :width="120 + n*12" height="12"/>
          <rect x="100" y="80" rx="3" ry="3" :width="200 - n*6" height="12"/>
          <circle cx="180" cy="20" r="20"/>
        </content-loader>
      </el-col>
    </div>
    <el-row v-if="listType == 'List'">
      <!-- <el-col
        class="ls_link_item_list ls_pointer"
        v-for="link in links"
        :key="link.id"
        :xs="24"
        :sm="12"
        :md="6"
      >
        <el-tooltip
          class=""
          effect="dark"
          :open-delay="1000"
          :content="link.title"
          placement="top"
        >
          <transition name="el-zoom-in-center">
            <div
              @contextmenu.prevent="openContentMenu(link, $event)"
              @click="onClick(link)"
              class="transition-box"
            >
              <div v-if="!!link.icon" class="ls_text_left" :class="iconClass||'ls_icon_sm'">
                <img :src="link.icon" onerror="javascript:this.src='/static/logo.png'">
                 <span class="ls_padding_left_10 label ls_in_line">{{renderTitle(link.name)}}</span>
              </div>
            </div>
          </transition>
        </el-tooltip>
      </el-col> -->
      <el-col v-if="links.length > 0" :span="24">
        <el-table
          :data="links"
          @cell-click="(row,column) => {onClick(row);}"
          class="ls_center"
          :show-header="false"
        >
          <el-table-column width="40px">
            <template slot-scope="scope">
              <div v-if="scope.row.icon != null" :class="iconClass||'ls_icon'">
                <img :src="scope.row.icon" onerror="javascript:this.src='/static/logo.png'">
              </div>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div class="ls_pointer" @contextmenu.prevent="openContentMenu(scope.row, $event)">
                <p>{{scope.row.title}}</p>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row v-else-if="listType == 'List1'">
      <el-col
        class="ls_link_item_list ls_pointer"
        v-for="link in links"
        :key="link.id"
        :span="6"
        :title="link.title"
      >
          <transition name="el-zoom-in-center">
            <div
              @contextmenu.prevent="openContentMenu(link, $event)"
              @click="onClick(link)"
              class="transition-box"
            >
              <div class="ls_text_left" :class="iconClass||'ls_icon_sm'">
                <img :src="link.icon" onerror="javascript:this.src='/static/logo.png'">
                 <span class="ls_padding_left_5 label ls_in_line">{{renderTitle(link.title)}}</span>
              </div>
            </div>
          </transition>
      </el-col>
      <div class="ls_clear"/>
    </el-row>
    <el-row v-else>
      <el-col
        class="ls_link_item ls_link_item_card"
        v-for="link in links"
        :key="link.id"
        :xs="24"
        :sm="11"
        :md="5"
      >
        <el-tooltip
          class="ls_link_item_content"
          effect="dark"
          :open-delay="1000"
          :content="link.title"
          placement="top"
        >
          <transition name="el-zoom-in-center">
            <div
              @contextmenu.prevent="openContentMenu(link, $event)"
              @click="onClick(link)"
              class="transition-box"
            >
              <div v-if="!!link.icon" :class="iconClass||'ls_icon'">
                <img :src="link.icon" onerror="javascript:this.src='/static/logo.png'">
              </div>
              <div style="padding-top:10px;">
                <span class="label ls_in_line">{{link.name}}</span>
              </div>
            </div>
          </transition>
        </el-tooltip>
      </el-col>
    </el-row>
    <LSContentMenu ref="contextmenu" @onSaved="onChanged"></LSContentMenu>
  </div>
</template>
<script>
import { ContentLoader, FacebookLoader } from "vue-content-loader";

export default {
  name: "LinkItems",
  props: ["links", "title", "listType", "loading", "iconClass"],
  components: {
    ContentLoader,
    FacebookLoader
  },
  data() {
    return {
      edit: false
    };
  },
  methods: {
    openContentMenu(link, vnode) {
      this.$refs.contextmenu.show(
        link,
        vnode.clientX,
        vnode.clientY,
        "view,removeOften,edit"
      );
    },
    onChanged(){
      this.$emit('onChanged');
    },
    onClick(link){
      this.$store.dispatch("visitLink", link);
    },
    renderTitle(title){
      if (title.length <= 14) {
        return title;
      }
      else{
        return title.substring(0,14) + '...';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.ls_link_list {
  .title {
    font-weight: bold;
    color: #929292;
  }

  .ls_link_item {
    text-align: center;
    height: 130px;
    cursor: pointer;
    margin-top: 20px;
    margin-right: 20px;
    padding: 20px 15px;
    position: relative;
    background-color: #fff;
  }

  .ls_link_item_card {
    .operate {
      position: absolute;
      top: 0px;
      width: 50%;
      right: 0px;
      height: 100%;
      color: #555;
      background-color: #000;
      opacity: 0.6;
      filter: alpha(opacity=60);

      .operate_btn:first-child {
        margin-top: 5px;
      }

      .operate_btn {
        padding: 5px;
        min-height: 20px;
      }

      .operate_btn:hover {
        background-color: #fff;
        color: #000;
      }
    }
  }

  .ls_link_item_card:hover {
    color: #5e5e5e;
    background-color: #eee;
  }

  .ls_link_item_list {
    font-size: 14px;
    padding:15px;
    background-color: #fff;
  }

  .ls_link_item_list:hover {
    color: #5e5e5e;
    background-color: #eee;
  }

  p {
    margin: 0px;
  }
}

.ls_link_item_content {
  min-height: 70px;
}

.ls_link_item_content:focus {
  outline: none;
}

.ls_link_list .ls_link_item .remove {
  height: 20px;
  width: 20px;
  position: absolute;
  top: -15px;
  right: -8px;
  font-size: 24px;
  color: #c5c5c5;
}

.ls_link_list .ls_link_item .remove i {
  font-size: 24px;
}

.ls_link_list .ls_link_item .title {
  color: #999;
  font-size: 16px;
  margin-top: 5px;
}
</style>


