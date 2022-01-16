<template>
    <div class="gvgContainer">
        <h1>宇宙第一神遊 : 第七史詩</h1>
        <div class="subtitle">
            <input
                type="text"
                placeholder="公會名稱 "
                v-model="guildName"
            />
            <input type="date" name="" id="date" v-model="date" />
            <input type="text" placeholder="玩家 ID" v-model="playerID" />

            <div class="position">
                <label><input type="radio" :name="position" id="position1" v-model="position" value="大主堡" checked>
                        大主堡</label>
                <label><input type="radio" :name="position" id="position2" v-model="position" value="上中塔" >
                        上中塔</label>
                <label><input type="radio" :name="position" id="position3" v-model="position" value="中中塔" >
                        中中塔</label>
                <label><input type="radio" :name="position" id="position4" v-model="position" value="下中塔" >
                        下中塔</label>
            </div>

        </div>
                    
            <div class="role6" v-for=" (item, index) in roles " :key="item.id">
                <div class="section" v-if="index === 0 " >
                    <h2 >P1</h2>
                </div>
                <div class="section" v-if="index=== 3" >
                    <h2 >P2</h2>
                </div>
                <div class="roleInput">
                    <input type="text" placeholder="角色名稱" v-model="roles[index].roleName">
                    <input type="number" placeholder="速度" min="100" max="400" step="1" maxlength="3" v-model="roles[index].speed">
                    <input type="number" placeholder="血量(k)" min="5" max="50" step="0.1"  maxlength="4" v-model="roles[index].hp">
                    <!-- <input type="text" placeholder="神器" v-model="roles[index].artic"> -->
                    <ddmenu v-on:childData="dataFromChild" :roleIdx="index" />


                    <!-- 四選一 -->
                    <div class="bean">
                        <label>
                        <input type="radio" :name="item.id"  v-model="roles[index].mainSet" value="" >
                        無四件套
                        </label>
                        <label>
                            <input type="radio" :name="item.id"  v-model="roles[index].mainSet" value="反擊" >
                            <img src="../../static/img/eqivSet/Counter-set.png" alt="反擊套的圖檔">
                        </label>
                        <label>
                            <input type="radio" :name="item.id" v-model="roles[index].mainSet" value="吸血" >
                            <img src="../../static/img/eqivSet/Lifesteal-set.png" alt="吸血套的圖檔">
                        </label>
                        <label>
                            <input type="radio" :name="item.id" v-model="roles[index].mainSet" value="傷口" >
                            <img src="../../static/img/eqivSet/injury.png" alt="傷口套的圖檔">
                        </label>
                        <!-- 單選 -->
                        <label >
                            <input type="checkbox" name="main-set" id="subSet" v-model="roles[index].subSet" :true-value="'免疫'" :false-value="''">
                            <img src="../../static/img/eqivSet/Immunity-set.png" alt="免疫套的圖檔">
                        </label>
                    </div>
                </div>
            </div>
        <h2>備註欄位</h2>
        <textarea name="" id="" cols="30" rows="2" placeholder="Inyr的暗龍有夠快，堡壘給誰、史哥劈誰、瑟琳捅誰之類的" v-model="memo"></textarea>
        <h2>預覽</h2>
        <textarea name="result" id="resultA" cols="30" rows="10" class="ans" readonly>
```prolog
{{ guildName }} {{ date }} {{ playerID }}
{{position}} Role Speed Hp[K] Artf. Note
[P1]  {{roles[0].roleName}}  {{roles[0].speed}}    {{roles[0].hp}}  {{roles[0].artic}} {{roles[0].subSet}} {{roles[0].artifact}} {{roles[0].mainSet}}
      {{roles[1].roleName}}  {{roles[1].speed}}    {{roles[1].hp}}  {{roles[1].artic}} {{roles[1].subSet}} {{roles[1].artifact}} {{roles[1].mainSet}} 
      {{roles[2].roleName}}  {{roles[2].speed}}    {{roles[2].hp}}  {{roles[2].artic}} {{roles[2].subSet}} {{roles[2].artifact}} {{roles[2].mainSet}}

[P2]  {{roles[3].roleName}}  {{roles[3].speed}}    {{roles[3].hp}}  {{roles[3].artic}} {{roles[3].subSet}} {{roles[3].artifact}} {{roles[3].mainSet}}
      {{roles[4].roleName}}  {{roles[4].speed}}    {{roles[4].hp}}  {{roles[4].artic}} {{roles[4].subSet}} {{roles[4].artifact}} {{roles[4].mainSet}}
      {{roles[5].roleName}}  {{roles[5].speed}}    {{roles[5].hp}}  {{roles[5].artic}} {{roles[5].subSet}} {{roles[5].artifact}} {{roles[5].mainSet}}
備註:
  [1]速度僅供參考   
  [2]{{memo}}
  
```
        </textarea>
        
        <div class="btnArea">
            <button  @click="copyToBoard" class="btn">複製內容</button>
            <button  @click="resetForm" class="btn">重置表單</button>
        </div>
    </div>
</template>
<script>

import ddmenu from '@/components/dropdownmenu/ddmenu.vue'
import '@/assets/style.css'
export default {
    name: "GuildWarReport",
    data() {
        return {
            artifact:"",
            guildName: "",
            date: "",
            playerID: "",
            position: "大主堡",
            roles:[
                {
                    roleName:"",
                    speed: "",
                    hp: "",
                    artic: "",
                    subSet: "",
                    mainSet: "",
                    artifact: "",
                },
                {
                    roleName:"",
                    speed: "",
                    hp: "",
                    artic: "",
                    subSet: "",
                    mainSet: "",
                    artifact: "",
                },
                {
                    roleName:"",
                    speed: "",
                    hp: "",
                    artic: "",
                    subSet: "",
                    mainSet: "",
                    artifact: "",
                },{
                    roleName:"",
                    speed: "",
                    hp: "",
                    artic: "",
                    subSet: "",
                    mainSet: "",
                    artifact: "",
                },{
                    roleName:"",
                    speed: "",
                    hp: "",
                    artic: "",
                    subSet: "",
                    mainSet: "",
                    artifact: "",
                },{
                    roleName:"",
                    speed: "",
                    hp: "",
                    artic: "",
                    subSet: "",
                    mainSet: "",
                    artifact: "",
                },
            ],
            memo: "",
            
        };
    },
    methods:{
        onCopy: function(e){
            alert('複製成功')
            console.log('succc');
        },
        onError: function(){
            alert('複製失敗')
            console.log('failllll');
        },
        copyToBoard: function(){
            console.log('Hello from Vue method');
            let ans = document.getElementById('resultA');
            ans.select();
            document.execCommand('copy');
            alert('你號沒了，想不到吧')
            alert('先別報警，我開玩笑的')
            alert('已複製內容')
        },
        resetForm: function(){
            Object.assign(this.$data, this.$options.data())
            alert('表單已重置，一夜回到解放前')
        },
        dataFromChild: function(data, idx){
            this.roles[idx].artifact = data;
        },
    },
    components:{
        ddmenu
    }
};
</script>

<style>
</style>