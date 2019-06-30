<template>
  <div class="chat-wrapper">
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
        <div
          class="aside-dialog-item"
          v-for="item in topics"
          @click="send(item.start, item.id, item.topic)"
        >
          <div class="dialog-item__avatar">
            <img
              class="chat__avatar-icon"
              src="https://bootdey.com/img/Content/avatar/avatar1.png"
              alt="Михаил"
            />
          </div>
          <div class="dialog-item__main">
            <div class="dialog-item__name">{{item.topic}}</div>
          </div>
        </div>
      </div>
    </div>
    <beautiful-chat
      class="chat"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :close="closeChat"
      :colors="colors"
      :isOpen="isChatOpen"
      :messageList="messageList"
      :messageStyling="messageStyling"
      :newMessagesCount="newMessagesCount"
      :onMessageWasSent="onMessageWasSent"
      :open="openChat"
      :participants="participants"
      :showTypingIndicator="showTypingIndicator"
      :titleImageUrl="titleImageUrl"
      @onType="handleOnType"
    ></beautiful-chat>
  </div>
</template>

<script>
import messageHistory from "./messageHistory";
import chatParticipants from "./chatProfiles";
import availableColors from "./colors";
import topics from "./topics";

export default {
  name: "app",
  components: {
    topics
  },
  data() {
    return {
      participants: [
        {
          id: "0",
          name: "Выберите, с кем хотите пообщаться!",
          imageUrl: "https://avatars3.githubusercontent.com/u/1915989?s=230&v=4"
        }
      ],
      titleImageUrl:
        "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
      messageList: [{}],
      newMessagesCount: 0,
      isChatOpen: true,
      showTypingIndicator: "",
      colors: null,
      availableColors,
      chosenColor: null,
      alwaysScrollToBottom: false,
      messageStyling: true,
      userIsTyping: false,
      topics: {},
      idQuestion: undefined,
      idTopic: undefined,
      yesId: undefined,
      noId: undefined
    };
  },
  created() {
    this.setColor("blue");
    this.init();
  },
  methods: {
    sendMessage(text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen
          ? this.newMessagesCount
          : this.newMessagesCount + 1;
        this.onMessageWasSent({
          author: "support",
          type: "text",
          id: Math.random(),
          data: { text }
        });
      }
    },
    handleTyping(text) {
      this.showTypingIndicator =
        text.length > 0
          ? this.participants[this.participants.length - 1].id
          : "";
    },
    onMessageWasSent(message) {
      this.messageList = [
        ...this.messageList,
        Object.assign({}, message, { id: Math.random() })
      ];

      let start = this.idQuestion;
      let id = this.idTopic;
      let link = `https://host.j-soft.online/api/history/${id}`;
      let idNext = undefined;
      let upload = {
        id: start,
        answer: message.data.text
      };

      if (message.data.text === "Да" || message.data.text === "Ага" || message.data.text === "да") {
        fetch(link, {
          method: "POST",
          body: JSON.stringify(upload)
        })
          .then(response => {
            if (response.status !== 200) {
              return Promise.reject();
            }
            let hasSave = response.json();
          })
          .then(function(data) {});

        if (this.yesId == 0) return "";

        {
          setTimeout(_ => {
            this.send(this.yesId, this.idTopic);
          }, 400);
        }
      } else if (message.data.text === "Нет" || message.data.text === "нет" || message.data.text === "не-а" || message.data.text === "Не-а") {
        if (this.noId == 0) return "";
        else {
          fetch(link, {
            method: "POST",
            body: JSON.stringify(upload)
          })
            .then(response => {
              if (response.status !== 200) {
                return Promise.reject();
              }
              let hasSave = response.json();
            })
            .then(function(data) {});

          setTimeout(_ => {
            this.send(this.noId, this.idTopic);
          }, 400);
        }
      }
    },
    openChat() {
      this.isChatOpen = true;
      this.newMessagesCount = 0;
    },
    closeChat() {
      this.isChatOpen = false;
    },
    setColor(color) {
      this.colors = this.availableColors[color];
      this.chosenColor = color;
    },
    showStylingInfo() {
      this.$modal.show("dialog", {
        title: "Info",
        text:
          "You can use *word* to <strong>boldify</strong>, /word/ to <em>emphasize</em>, _word_ to <u>underline</u>, `code` to <code>write = code;</code>, ~this~ to <del>delete</del> and ^sup^ or ¡sub¡ to write <sup>sup</sup> and <sub>sub</sub>"
      });
    },
    messageStylingToggled(e) {
      this.messageStyling = e.target.checked;
    },
    handleOnType() {
      this.$root.$emit("onType");
      this.userIsTyping = true;
    },
    editMessage(message) {
      const m = this.messageList.find(m => m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    },
    like(id) {
      const m = this.messageList.findIndex(m => m.id === id);
      var msg = this.messageList[m];
      msg.liked = !msg.liked;
      this.$set(this.messageList, m, msg);
    },
    async init(context) {
      let response = await fetch("https://host.j-soft.online/api/topics");
      let result = await response.json();
      this.topics = result;

      
    },
    async send(start, id, title) {

 

      let response = await fetch(
        `https://host.j-soft.online/api/history/${id}`
      );
      if (response.ok) {
        let result = await response.json();
        this.messageList = result;
      }

      if (title) {
        this.participants[0].name = title;
      }

      var xmlHttp = new XMLHttpRequest();

      xmlHttp.open(
        "GET",
        `https://host.j-soft.online/api/question/${start}`,
        false
      ); // false for synchronous request
      xmlHttp.send(null);
      let answer = xmlHttp.responseText;
      let result = JSON.parse(answer);
      let message = {};
      message.type = "text";
      message.author = "bot";
      message.id = start;
      message.data = JSON.parse(result.object);

      this.idQuestion = start;
      this.idTopic = id;
      this.yesId = result.yes;
      this.noId = result.no;

      this.messageList = [
        ...this.messageList,
        Object.assign({}, message, { id })
      ]; 
    }
  },

  computed: {
    linkColor() {
      return this.chosenColor === "dark"
        ? this.colors.sentMessage.text
        : this.colors.launcher.bg;
    },
    backgroundColor() {
      return this.chosenColor === "dark" ? this.colors.messageList.bg : "#fff";
    },
    mounted() {
      this.messageList.forEach(x => (x.liked = false));
    }
  }
};
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
}
* {
  font-family: Avenir Next, Helvetica Neue, Helvetica, sans-serif;
}
.demo-description {
  max-width: 500px;
}
.demo-description img {
  max-width: 500px;
}
.demo-test-area {
  width: 300px;
  box-sizing: border-box;
}
.demo-test-area--text {
  box-sizing: border-box;
  width: 100%;
  margin: 0px;
  padding: 0px;
  resize: none;
  font-family: Avenir Next, Helvetica Neue, Helvetica, sans-serif;
  background: #fafbfc;
  color: #8da2b5;
  border: 1px solid #dde5ed;
  font-size: 16px;
  padding: 16px 15px 14px;
  margin: 0;
  border-radius: 6px;
  outline: none;
  height: 150px;
  margin-bottom: 10px;
}
.demo-monster-img {
  width: 400px;
  display: block;
  margin: 60px auto;
}
.text-center {
  text-align: center;
}
.colors a {
  color: #fff;
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 10px;
}
.toggle a {
  text-decoration: none;
}
.messageStyling {
  font-size: small;
}
</style>