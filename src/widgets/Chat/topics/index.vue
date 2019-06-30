<script>
import { mapGetters } from "vuex";

("use strict");

export default {
  data: _ => {
        return {
            topics: {},
        };
    },
   methods: {
  async init(context) {
            let response = await fetch('https://host.j-soft.online/api/topics');
            let result = await response.json();
            this.data = result;
            console.log(result);

},
   },
  created() {
    this.init();
  }
};
</script>
<template>
  <div class="chat__aside">
    <div class="chat__aside_header">
      <img
        class="chat__avatar-icon"
        src="https://bootdey.com/img/Content/avatar/avatar1.png"
        alt="Михаил"
      />
      <div class="chat__aside_header_h1">Михаил</div>
    </div>
    <div class="chat__aside_main">
      <div class="aside-dialog-item">
        <div class="dialog-item__avatar">
          <img
            class="chat__avatar-icon"
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            alt="Михаил"
          />
        </div>
        <div class="dialog-item__main">
          <div class="dialog-item__name">John Doe</div>
          <div class="dialog-item__time">18:18</div>
        </div>
      </div>
      <div class="aside-dialog-item active-chat">
        <div class="dialog-item__avatar">
          <img
            class="chat__avatar-icon"
            src="https://bootdey.com/img/Content/avatar/avatar3.png"
            alt="Михаил"
          />
        </div>
        <div class="dialog-item__main">
          <div class="dialog-item__name">Валерия</div>
          <div class="dialog-item__time">18:18</div>
        </div>
      </div>
    </div>
  </div>
</template>