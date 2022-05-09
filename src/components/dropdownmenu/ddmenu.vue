<template>
  <section
    class="dropdown-wrapper"
    ref="ddwrapper"
    tabindex="0"
    @keydown.enter="openList"
  >
    <div
      class="selected-item flex-csb"
      @click="openList()"
    >
      <div
        v-if="artifact !== null"
        class="flex-cc"
      ><img
          :src="artifact.img"
          alt=""
        >{{ artifact.name }}</div>

      <span
        v-else
        class="flex-cc"
      >選擇神器</span>
      <svg
        :class="isVisible ? 'dropdown' : ''"
        class="dropdown-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path
          fill="none"
          d="M0 0h24v24H0z"
        />
        <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
      </svg>
    </div>
    <div
      class="dropdown-popover"
      v-if="isVisible"
    >
      <!-- prevent避免上下按鍵使光標移動到最前或最後 -->
      <input
        ref="content"
        type="text"
        name=""
        id=""
        placeholder="輸入關鍵字"
        v-model="searchQuery"
        class="searchbar"
        @keydown.esc="isVisible = false"
        @keydown.up.prevent="highlightedIndexPre"
        @keydown.down.prevent="highlightedIndexNext"
        @keydown.enter.stop="enterSelectItem"
      />
      <div
        class="listbox"
        ref="listParent"
      >
        <span
          v-if="filterBySearch.length === 0"
          style="line-height:1.5rem; color:red; font-weight:bold;"
        >無匹配項目</span>
        <div
          class="item flex-cc"
          v-for="(artifact, index) in filterBySearch"
          :key="artifact.id"
          :class="{ 'bg-blue': index == highlightedIndex }"
          @click="selectArtifacts(artifact)"
        >
          <li>
            <img
              :src="filterBySearch[index].img"
              alt=""
            />{{
                filterBySearch[index].name
            }}
          </li>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import allArtifact from '../../data/artifact.json'
export default {
  props: ['roleIdx', 'resetCommand'],
  data() {
    return {
      isCleaned: false,
      searchQuery: '',
      artifact: null,
      isVisible: false,
      roleIndex: this.roleIdx,
      items: allArtifact,
      highlightedIndex: 0,
      //存放API的陣列
      // datalist:[],
    };
  },
  computed: {
    // 媽蛋這個else回傳的陣列是0...why
    filterItems() {
      const query = this.searchQuery.toLowerCase();
      if (this.searchQuery === "") {
        return this.items;
      } else {
        return this.items.filter((item) => {
          return Object.values(item).some((word) => {
            String(word).toLowerCase().includes(query)
          });
        });
      }
    },
    filterBySearch() {
      this.highlightedIndex = 0;
      let keyword = new RegExp(this.searchQuery, 'i')
      return this.items.filter(el => el.matchName.match(keyword))
    }
  },
  methods: {
    openList() {
      this.isVisible = !this.isVisible;
      this.$nextTick(() => {
        if (this.isVisible) {
          this.$refs.content.focus();
        }
      });
    },
    popup: function () {
      let list = document.querySelector('.dropdown-popover');
      list.classList.toggle('hide');
    },
    selectArtifacts(artifact) {
      this.artifact = artifact;
      this.isVisible = false;
      this.searchQuery = '';
      this.$emit('childData', this.artifact.shortName, this.roleIndex);
    },
    //重製表單
    resetForm() {
      Object.assign(this.$data, this.$options.data.call(this));
    },//點擊空白處收起選單
    bodyCloseMenus(e) {
      let self = this;
      if (this.$refs.ddwrapper && !this.$refs.ddwrapper.contains(e.target)) {
        if (self.isVisible == true) {
          self.isVisible = false;
        }
      }
    },
    highlightedIndexNext() {
      if (this.highlightedIndex < this.filterBySearch.length - 1) {
        this.highlightedIndex += 1;
        this.scrollIntoView();
      }
    },
    highlightedIndexPre() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex -= 1;
        this.scrollIntoView();
      }
    },
    scrollIntoView() {
      this.$refs.listParent.children[this.highlightedIndex].scrollIntoView({ block: 'nearest' });
    },
    enterSelectItem() {
      let highlightedItem = this.$refs.listParent.children[this.highlightedIndex];
      highlightedItem.click();
      // this.artifact = this.$refs.listParent.children[this.highlightedIndex];
      // this.isVisible = false;
      // this.searchQuery = '';
      // this.$emit('childData', this.artifact.shortName, this.roleIndex);
    }
    //fetch API
    // async getData(){
    //     try{
    //         let res = await fetch("http://jsonplaceholder.typicode.com/posts");
    //         this.datalist = await res.json();
    //     }
    //     catch(err){
    //         console.log(err);
    //     }
    // }
  },
  // created(){
  //     this.getData();
  // },
  // watch:{
  //     resetCommand: function(){
  //         if(this.resetCommand !== null){
  //             this.artifact = null;
  //         }
  //     }
  // }
  mounted() {
    document.addEventListener('click', this.bodyCloseMenus);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.bodyCloseMenus);
  }
};
</script>

<style >
@import '_assets/style.css';
</style>