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
                    
            <div class="role6" v-for=" (item, index) in roleArray " :key="item.id" >
                <div class="section" v-if="index === 0 " >
                    <h2 >P1</h2>
                </div>
                <div class="section" v-if="index=== 3" >
                    <h2 >P2</h2>
                </div>
                <div class="roleInput">
                    <input type="text" placeholder="角色名稱" v-model="roleArray[index].roleName">
                    <input type="number" placeholder="速度" min="100" max="400" step="1" maxlength="3" v-model="roleArray[index].speed">
                    <input type="number" placeholder="血量(k)" min="5" max="50" step="0.1"  maxlength="4" v-model="roleArray[index].hp">
                    <input type="text" placeholder="神器" v-model="roleArray[index].artic">
                    <!-- 四選一 -->
                    <div class="bean">
                        <label>
                        <input type="radio" :name="item.id"  v-model="roleArray[index].mainSet" value="" >
                        無四件套
                        </label>
                        <label>
                            <input type="radio" :name="item.id"  v-model="roleArray[index].mainSet" value="反擊" >
                            <img src="../assets/Counter-set.png" alt="反擊套的圖檔">
                        </label>
                        <label>
                            <input type="radio" :name="item.id" v-model="roleArray[index].mainSet" value="吸血" >
                            <img src="../assets/Lifesteal-set.png" alt="吸血套的圖檔">
                        </label>
                        <label>
                            <input type="radio" :name="item.id" v-model="roleArray[index].mainSet" value="傷口" >
                            <img src="../assets/injury.png" alt="傷口套的圖檔">
                        </label>
                        <!-- 單選 -->
                        <label >
                            <input type="checkbox" name="main-set" id="subSet" v-model="roleArray[index].subSet" :true-value="'免疫'" :false-value="''">
                            <img src="../assets/Immunity-set.png" alt="免疫套的圖檔">
                        </label>
                    </div>
                </div>
                
            </div>
        <h2>備註欄位</h2>
        <textarea name="" id="" cols="30" rows="2" placeholder="Inyr的暗龍有夠快，堡壘給誰、史哥劈誰、瑟琳捅誰之類的" v-model="memo"></textarea>
        <h2>預覽(下方直接輸入，打妹。會壞掉)</h2>
        <textarea name="result" id="resultA" cols="30" rows="10" class="ans" readonly>
```prolog
{{ guildName }} {{ date }} {{ playerID }}
{{position}} Role Speed Hp[K] Artf. Note
[P1]  {{roleArray[0].roleName}}  {{roleArray[0].speed}}    {{roleArray[0].hp}}  {{roleArray[0].artic}} {{roleArray[0].subSet}} {{roleArray[0].mainSet}}
      {{roleArray[1].roleName}}  {{roleArray[1].speed}}    {{roleArray[1].hp}}  {{roleArray[1].artic}} {{roleArray[1].subSet}} {{roleArray[1].mainSet}}
      {{roleArray[2].roleName}}  {{roleArray[2].speed}}    {{roleArray[2].hp}}  {{roleArray[2].artic}} {{roleArray[2].subSet}} {{roleArray[2].mainSet}}

[P2]  {{roleArray[3].roleName}}  {{roleArray[3].speed}}    {{roleArray[3].hp}}  {{roleArray[3].artic}} {{roleArray[3].subSet}} {{roleArray[3].mainSet}}
      {{roleArray[4].roleName}}  {{roleArray[4].speed}}    {{roleArray[4].hp}}  {{roleArray[4].artic}} {{roleArray[4].subSet}} {{roleArray[4].mainSet}}
      {{roleArray[5].roleName}}  {{roleArray[5].speed}}    {{roleArray[5].hp}}  {{roleArray[5].artic}} {{roleArray[5].subSet}} {{roleArray[5].mainSet}}
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


export default {
    name: "GuildWarReport",
    data() {
        
        return {
            
            testdata:"",
            guildName: "",
            date: "",
            playerID: "",
            position: "大主堡",
            roleArray:[
                {
                    roleName:"",
                    speed: "",
                    hp: "",
                    artic: "",
                    subSet: "",
                    mainSet: ""
                },
                {
                    roleName:"",
                    speed: "",
                    hp: "",
                    artic: "",
                    subSet: "",
                    mainSet: ""
                },
                {
                    roleName:"",
                    speed: "",
                    hp: "",
                    artic: "",
                    subSet: "",
                    mainSet: ""
                },{
                    roleName:"",
                    speed: "",
                    hp: "",
                    artic: "",
                    subSet: "",
                    mainSet: ""
                },{
                    roleName:"",
                    speed: "",
                    hp: "",
                    artic: "",
                    subSet: "",
                    mainSet: ""
                },{
                    roleName:"",
                    speed: "",
                    hp: "",
                    artic: "",
                    subSet: "",
                    mainSet: ""
                },
            ],
            memo: ""
            
        };
    },
    methods:{
        onCopy: function(e){
            alert('複製成功')
            console.log('succc');
        },
        onError: function(){
            alert('複製失敗')
            console.log('falllll');
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
        }
    }
};
</script>

<style>
@import '../components/style.css'
</style>