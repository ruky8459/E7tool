<template>
    <section class="dropdown-wrapper">
        <div class="selected-item flex-csb" @click="isVisible=!isVisible" >
            <div v-if="selectedItem!==null" class="flex-cc" ><img :src="selectedItem.img" alt="">{{selectedItem.artName}}</div>
            
            <span v-else class="flex-cc">選擇神器</span>
        </div>
        <div class="dropdown-popover" v-if="isVisible" >
            <input type="text" name="" id="" placeholder="輸入關鍵字" v-model="searchQuery" class="searchbar"/>
            <div class="listbox">
                <span v-if="filterBySearch.length === 0" style="line-height:1.5rem; color:red; font-weight:bold;" >無匹配項目</span>
                <div class="item flex-cc" v-for="(item, index) in filterBySearch" :key="item.id">
                    <li class="flex-cc" @click="selectTarget(item)" >
                        <img :src="filterBySearch[index].img" alt="" />{{
                            filterBySearch[index].artName
                        }}
                    </li>
                    
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ['roleIdx'],
    data() {
        return {
            searchQuery:'',
            selectedItem:null,
            isVisible:false,
            roleIdx: this.roleIdx,
            items: [{
                    img: "https://emoji.gg/assets/emoji/1705-tanjiro-hmp.png",
                    artName: "不重要",
                },
                {
                    img: "https://epic7x.com/wp-content/themes/epic-seven/assets/img/Knight.png",
                    artName: "犧牲",
                },
                {
                    img: "https://epic7x.com/wp-content/themes/epic-seven/assets/img/Knight.png",
                    artName: "寶劍",
                },
                {
                    img: "https://epic7x.com/wp-content/themes/epic-seven/assets/img/Knight.png",
                    artName: "堡壘",
                },
                {
                    img: "https://epic7x.com/wp-content/themes/epic-seven/assets/img/Knight.png",
                    artName: "高潔",
                },
                {
                    img: "https://epic7x.com/wp-content/themes/epic-seven/assets/img/Ranger.png",
                    artName: "引導",
                },
                {
                    img: "https://epic7x.com/wp-content/themes/epic-seven/assets/img/Thief.png",
                    artName: "提籃",
                },
                {
                    img: "https://epic7x.com/wp-content/themes/epic-seven/assets/img/Soul%20Weaver.png",
                    artName: "波濤",
                },
                {
                    img: "https://epic7x.com/wp-content/themes/epic-seven/assets/img/Mage.png",
                    artName: "魂書",
                },
            ],
        };
    },
    computed:{
        // 媽蛋這個else回傳的陣列是0...why
        filterItems(){
            const query = this.searchQuery.toLowerCase();
            if(this.searchQuery === ""){
                return this.items;
            }else{
                return this.items.filter((item)=>{
                    return Object.values(item).some((word)=>{
                        String(word).toLowerCase().includes(query)
                    });
                });
            }
        },
        filterBySearch(){
            let keyword = new RegExp(this.searchQuery,'i')
            return this.items.filter(el=>el.artName.match(keyword))
        }
    },
    methods:{
        popup:function(){
            console.log('pop pop pop');
            let list = document.querySelector('.dropdown-popover');
            list.classList.toggle('hide');
        },
        selectTarget(item){
            this.selectedItem = item;
            this.isVisible = false;
            this.searchQuery = '';
            this.$emit('childData',this.selectedItem.artName, this.roleIdx);
        },
    }
};
</script>

<style>
@import './style.css';
body{
    background: rgba(87, 211, 87, 0.671);
}
</style>