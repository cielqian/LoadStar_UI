<template>
  <el-container style="height:100%">
    <el-aside width="215px">
      <LSHeader/>
    </el-aside>
    <el-container>
      <el-main height="100%">
        <router-view/>
      </el-main>
      <!-- <el-footer height="50" class="ls_text_center ls_text_mini ls_padding_5_l">
          <img class="ls_logo_word_mini" src="../assets/new-logo.png">
          <span>Copyright ©2019 Ciel.Qian All rights reserved.</span>
      </el-footer>-->
    </el-container>
  </el-container>
</template>
<script>
import LSHeader from "./Nav.vue";
import apis from "../assets/repository/apis";
import { mapGetters, mapState } from "vuex";
import SockJS from "sockjs-client";
import utils from '../utils/commonUtils';
export default {
  name: "Home",
  components: { LSHeader },
  computed: {
    ...mapState({
      accountId: state => state.auth.loginInfo.accountId
    })
  },
  created() {
    if (!!window.RibbonsInstance) {
      window.RibbonsInstance._clear();
    }
    let _this = this;
    _this.$store.dispatch("getUserInfo").then(() => {
      var sock = new SockJS("http://ws.loadstar.com/ls-notify");

      let stompClient = Stomp.over(sock);
      // stompClient.debug = function(){};
      stompClient.connect({name: _this.accountId}, function(frame) {
        stompClient.subscribe("/user/queue/notify", function(socketMsg) {
          let message = JSON.parse(socketMsg.body);
          console.log(message);
          if (message.type == 'CLOCK') {
            let clock = message.data;
            let notification = new Notification('LoadStar', {body:utils.UTC2Format(clock.alarmTime, 'HH:mm')+'-'+clock.comment,icon:'/static/logo.png'});
            _this.$store.dispatch("removeAlarmClock", clock.id);
          }
        });
        stompClient.subscribe("/topic/greetings", function(greeting) {
          console.log(JSON.parse(greeting.body));
        });
      });
    });
  }
};
</script>
