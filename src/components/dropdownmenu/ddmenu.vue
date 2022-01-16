<template>
    <section class="dropdown-wrapper">
        <div class="selected-item flex-csb" @click="isVisible=!isVisible" >
            <div v-if="artifact!==null" class="flex-cc" ><img :src="artifact.img" alt="">{{artifact.name}}</div>
            
            <span v-else class="flex-cc">選擇神器</span>
        </div>
        <div class="dropdown-popover" v-if="isVisible" >
            <input type="text" name="" id="" placeholder="輸入關鍵字" v-model="searchQuery" class="searchbar"/>
            <div class="listbox">
                <span v-if="filterBySearch.length === 0" style="line-height:1.5rem; color:red; font-weight:bold;" >無匹配項目</span>
                <div class="item flex-cc" v-for="(artifact, index) in filterBySearch" :key="artifact.id">
                    <li class="flex-cc" @click="selectArtifacts(artifact)" >
                        <img :src="filterBySearch[index].img" alt="" />{{
                            filterBySearch[index].name
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
            artifact:null,
            isVisible:false,
            roleIndex: this.roleIdx,
            items: [{
                    img: "../../static/img/artifactsCategory/tanjiro.png",
                    name: "不重要",
                },
                {
                    img: "../../static/img/artifactsCategory/Knight.png",
                    name: "犧牲",
                },
                {
                    img: "../../static/img/artifactsCategory/Knight.png",
                    name: "寶劍",
                },
                {
                    img: "../../static/img/artifactsCategory/Knight.png",
                    name: "堡壘",
                },
                {
                    img: "../../static/img/artifactsCategory/Knight.png",
                    name: "高潔",
                },
                {
                    img: "../../static/img/artifactsCategory/Ranger.png",
                    name: "引導",
                },
                {
                    img: "../../static/img/artifactsCategory/Thief.png",
                    name: "提籃",
                },
                {
                    img: "../../static/img/artifactsCategory/Soul%20Weaver.png",
                    name: "波濤",
                },
                {
                    img: "../../static/img/artifactsCategory/Mage.png",
                    name: "魂書",
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
            return this.items.filter(el=>el.name.match(keyword))
        }
    },
    methods:{
        popup:function(){
            console.log('pop pop pop');
            let list = document.querySelector('.dropdown-popover');
            list.classList.toggle('hide');
        },
        selectArtifacts(artifact){
            this.artifact = artifact;
            this.isVisible = false;
            this.searchQuery = '';
            this.$emit('childData',this.artifact.name, this.roleIndex);
        },
    }
};
</script>

<style>
@import '_assets/style.css';
body{
    background: rgba(87, 211, 87, 0.671);
}
</style>