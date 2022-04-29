<template>
    <section
        class="dropdown-wrapper"
        ref="ddwrapper"
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
            <input
                ref="content"
                type="text"
                name=""
                id=""
                placeholder="輸入關鍵字"
                v-model="searchQuery"
                class="searchbar"
            />
            <div class="listbox">
                <span
                    v-if="filterBySearch.length === 0"
                    style="line-height:1.5rem; color:red; font-weight:bold;"
                >無匹配項目</span>
                <div
                    class="item flex-cc"
                    v-for="(artifact, index) in filterBySearch"
                    :key="artifact.id"
                >
                    <li @click="selectArtifacts(artifact)">
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
            let keyword = new RegExp(this.searchQuery, 'i')
            return this.items.filter(el => el.matchName.match(keyword))
        }
    },
    methods: {
        openList() {
            this.isVisible = !this.isVisible;
            this.$nextTick(() => {
                if(this.isVisible){
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
        },
        bodyCloseMenus(e) {
            let self = this;
            if (this.$refs.ddwrapper && !this.$refs.ddwrapper.contains(e.target)) {
                if (self.isVisible == true) {
                    self.isVisible = false;
                }
            }
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
    mounted(){
        document.addEventListener('click',this.bodyCloseMenus);
    },
    beforeDestroy(){
        document.removeEventListener('click',this.bodyCloseMenus);
    }
};
</script>

<style>
@import '_assets/style.css';
</style>