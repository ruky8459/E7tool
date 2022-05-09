<template>
  <div class="gvgContainer">
    <h1 class="tittle">第七史詩 : 戰報產生</h1>
    <div class="subtitle">
      <input
        type="text"
        placeholder="公會名稱 "
        v-model="guildName"
      />
      <input
        type="text"
        placeholder="玩家 ID"
        v-model="playerID"
      />

      <div class="position">
        <label><input
            type="radio"
            :name="position"
            id="position1"
            v-model="position"
            value="大主堡"
            checked
          >
          大主堡</label>
        <label><input
            type="radio"
            :name="position"
            id="position2"
            v-model="position"
            value="上中塔"
          >
          上中塔</label>
        <label><input
            type="radio"
            :name="position"
            id="position3"
            v-model="position"
            value="中中塔"
          >
          中中塔</label>
        <label><input
            type="radio"
            :name="position"
            id="position4"
            v-model="position"
            value="下中塔"
          >
          下中塔</label>
      </div>

    </div>
    <!-- ==== 腳色資訊輸入欄位*6 ==== -->
    <div
      class="role6"
      v-for=" (item, index) in roles "
      :key="item.id"
    >
      <div
        class="section"
        v-if="index === 0"
      >
        <h2>P1</h2>
      </div>
      <div
        class="section"
        v-if="index === 3"
      >
        <h2>P2</h2>
      </div>
      <div class="roleInput">
        <input
          type="text"
          placeholder="角色名稱"
          v-model="roles[index].roleName"
        >
        <input
          type="number"
          placeholder="速度"
          min="100"
          max="400"
          step="1"
          oninput="if(value.length>3)value=value.slice(0,3)"
          v-model="roles[index].speed"
        >
        <input
          type="number"
          placeholder="血量(k)"
          min="5"
          max="50"
          step="0.1"
          oninput="if(value.length>4)value=value.slice(0,4)"
          v-model="roles[index].hp"
        >
        <!-- <input type="text" placeholder="神器" v-model="roles[index].artic"> -->
        <ddmenu
          ref="ddmenu"
          v-on:childData="dataFromChild"
          :roleIdx="index"
          :resetCommand="resetCommand"
        />


        <!-- 四選一 -->
        <div class="bean">
          <label>
            <input
              type="radio"
              :name="item.id"
              v-model="roles[index].mainSet"
              value=""
            >
            無四件套
          </label>
          <label>
            <input
              type="radio"
              :name="item.id"
              v-model="roles[index].mainSet"
              value="反擊"
            >
            <img
              src="../../static/img/eqivSet/Counter-set.png"
              alt="反擊套的圖檔"
            >
          </label>
          <label>
            <input
              type="radio"
              :name="item.id"
              v-model="roles[index].mainSet"
              value="吸血"
            >
            <img
              src="../../static/img/eqivSet/Lifesteal-set.png"
              alt="吸血套的圖檔"
            >
          </label>
          <label>
            <input
              type="radio"
              :name="item.id"
              v-model="roles[index].mainSet"
              value="傷口"
            >
            <img
              src="../../static/img/eqivSet/injury.png"
              alt="傷口套的圖檔"
            >
          </label>
          <!-- 單選 -->
          <label>
            <input
              type="checkbox"
              name="main-set"
              id="subSet"
              v-model="roles[index].subSet"
              :true-value="'免疫'"
              :false-value="''"
            >
            <img
              src="../../static/img/eqivSet/Immunity-set.png"
              alt="免疫套的圖檔"
            >
          </label>
        </div>
      </div>
    </div>
    <h2>備註欄位</h2>
    <textarea
      name=""
      id=""
      cols="30"
      rows="2"
      placeholder="Inyr的暗龍有夠快，堡壘給誰、史哥劈誰、瑟琳捅誰之類的"
      v-model="memo"
    ></textarea>
    <h2>預覽</h2>
    <textarea
      name="result"
      id="resultA"
      cols="30"
      rows="10"
      class="ans"
      readonly
    >
```prolog
{{ guildName }} {{ formatedDate }} {{ playerID }}
{{ autoFillStr }}
備註:
  [1]速度僅供參考   
  [2]{{ memo }}
  

```
    </textarea>

    <div class="btnArea">
      <button
        @click="copyToBoard(); showToast('已複製內容', 'toast-copied');"
        class="btn"
      >複製內容</button>
      <button
        @click="resetForm(); sendCommandToChild(); showToast('已清除表單', 'toast-reset');"
        class="btn"
      >重置表單</button>
    </div>
    <div
      class="toast "
      :class="toastState"
    >{{ toastMessage }}</div>
  </div>
</template>
<script>

import ddmenu from '@/components/dropdownmenu/ddmenu.vue'
import '@/assets/style.css'
export default {
  name: "GuildWarReport",
  data() {
    return {
      // resetCommand: null,
      resetCommand: [],
      // artifact:"",
      guildName: "",
      playerID: "",
      position: "大主堡",
      roles: [
        {
          roleName: "",
          speed: "",
          hp: "",
          subSet: "",
          mainSet: "",
          artifact: "",
        },
        {
          roleName: "",
          speed: "",
          hp: "",
          subSet: "",
          mainSet: "",
          artifact: "",
        },
        {
          roleName: "",
          speed: "",
          hp: "",
          subSet: "",
          mainSet: "",
          artifact: "",
        }, {
          roleName: "",
          speed: "",
          hp: "",
          subSet: "",
          mainSet: "",
          artifact: "",
        }, {
          roleName: "",
          speed: "",
          hp: "",
          subSet: "",
          mainSet: "",
          artifact: "",
        }, {
          roleName: "",
          speed: "",
          hp: "",
          subSet: "",
          mainSet: "",
          artifact: "",
        },
      ],
      memo: "",
      toastMessage: "welcome",
      toastState: "",
      hideTimeout: null,
    };
  },
  filters: {
    // dateFormat:function(){
    //     var dt = new Date();
    //     var y = dt.getFullYear();
    //     var m = dt.getMonth()+1;//0-11
    //     m = m.toString().padStart(2,'0');
    //     var d = dt.getDate().toString().padStart(2,'0');//1-31
    //     return `${y}-${m}-${d}`
    // }
  },
  computed: {
    autoFillStr: function () {
      var ans = `${this.position} Role Speed Hp[K] Artif. Note\n`;
      for (let i = 0; i < 6; i++) {
        if (i == 0) {
          ans += `[P1]\n`;
        }
        if (i == 3) {
          ans += `[P2]\n`;
        }
        ans += `      ${this.roles[i].roleName}  ${this.roles[i].speed.toString().padStart(3, '0')}   ${this.roles[i].hp.toString().padStart(2, ' ').padEnd(3, '.').padEnd(4, '0')}   ${this.roles[i].artifact}  ${this.roles[i].subSet + ' '}${this.roles[i].mainSet}\n`;//
      }
      return ans
    },
    formatedDate: function () {
      var dt = new Date();
      var y = dt.getFullYear();
      var m = dt.getMonth() + 1;//0-11
      m = m.toString().padStart(2, '0');
      var d = dt.getDate().toString().padStart(2, '0');//1-31
      return `${y}-${m}-${d}`
    }
  },
  methods: {
    onCopy: function (e) {
      alert('複製成功')
      console.log('succc');
    },
    onError: function () {
      alert('複製失敗')
      console.log('failllll');
    },//複製textArea內容到剪貼簿
    copyToBoard: function () {
      let ans = document.getElementById('resultA');
      // ans.select();
      // document.execCommand('copy');
      // 看到上面的劃線了嗎，exeCommand()在未來可能被棄用，雖然一直沒有預告日期。
      let clip = navigator.clipboard;
      if (clip === undefined) {
        alert("upgrade your browser to use clipboard feature. 升級你的瀏覽器，才能夠將內容複製到剪貼簿")
      } else {
        clip.writeText(ans.value);
      }
    },
    resetForm: function () {
      Object.assign(this.$data, this.$options.data());
    },
    dataFromChild: function (data, idx) {
      this.roles[idx].artifact = data;
    },//重製組件-下拉式選單
    sendCommandToChild: function () {
      for (let i = 0; i < 6; i++) {
        this.$refs.ddmenu[i].resetForm();
      }
    },//手工toast
    showToast: function (toastMessage, state) {
      clearTimeout(this.hideTimeout);
      this.toastState = state;
      this.toastMessage = toastMessage;
      this.hideTimeout = setTimeout(() => {
        this.toastState = "";

      }, 2000);
      if (state == 'toast-reset') {
        // window.scroll(top);
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
  },
  components: {
    ddmenu
  }
};
</script>

<style>
.toast {
  position: fixed;
  /* top: 10vh; */
  top: -5rem;
  left: calc(50vw - 8rem);
  background: #FFF;
  line-height: 4rem;
  height: 4rem;
  width: 16rem;
  border-left: 10px solid black;
  border-radius: .3rem;
  box-shadow: 5px 5px 5px #555;
  transition: all .5s ease-in-out;
}

.toast-copied {
  border-left: 10px solid rgb(10, 177, 10);
  top: 10vh;

}

.toast-reset {
  border-left: 10px solid rgb(226, 57, 6);
  top: 10vh;

}
input:focus{
  box-shadow: 0 0 20px #176faa;
}
</style>