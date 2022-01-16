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
                    
            <div class="role6" v-for=" (item, index) in roleArray " :key="item.id" :setPocketIdx="setPocketIdx(index)">
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
                    <!-- <input type="text" placeholder="神器" v-model="roleArray[index].artic"> -->
                    <ddmenu v-on:childData="dataFromChild" :roleIdx="index" />


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
                
                <select name="" id="" v-model="artifact">
                    <option value="">選擇神器</option>
                    <option value="勇證">勇證</option>
                    <option value="團結"><img src="https://epic7x.com/wp-content/themes/epic-seven/assets/img/Ranger.png" alt="">團結</option>
                    <option value="號角">號角</option>
                    <option value="希望">希望</option>
                    <option value="指標">指標</option>
                    <option value="畫像">畫像</option>
                    <option value="音樂盒">音樂盒</option>
                    <option value="板甲">板甲</option>
                    <option value="面具">面具</option>
                    <option value="彗星">彗星</option>
                    <option value="席格">席格</option>
                    <option value="信賴">信賴</option>
                    <option value="剪刀">剪刀</option>
                    <option value="獎盃">獎盃</option>
                    <option value="開闢">開闢</option>
                    <option value="正義">正義</option>
                    <option value="分傷">分傷</option>
                    <option value="金剛">金剛</option>
                    <option value="王誕">王誕</option>
                    <option value="寶劍">寶劍</option>
                    <option value="堡壘">堡壘</option>
                    <option value="犧牲">犧牲</option>
                    <option value="雙子">雙子</option>
                    <option value="提籃">提籃</option>
                    <option value="塵埃">塵埃</option>
                    <option value="雷天">雷天</option>
                    <option value="無為">無為</option>
                    <option value="皎月">皎月</option>
                    <option value="銀光">銀光</option>
                    <option value="哈刀">哈刀</option>
                    <option value="飲料">飲料</option>
                    <option value="破防">破防</option>
                    <option value="引導">引導</option>
                    <option value="血玉">血玉</option>
                    <option value="漂浮">漂浮</option>
                    <option value="深淵">深淵</option>
                    <option value="提琴">提琴</option>
                    <option value="童話">童話</option>
                    <option value="知識種子">知識種子</option>
                    <option value="歌姬">歌姬</option>
                    <option value="波濤">波濤</option>
                    <option value="飆車">飆車</option>
                    <option value="靈藥">靈藥</option>
                    <option value="冰封">冰封</option>
                    <option value="天青">天青</option>
                    <option value="孤兒花">孤兒花</option>
                    <option value="手杖">手杖</option>
                    <option value="急救包">急救包</option>

                    
                </select>
            </div>
        <h2>備註欄位</h2>
        <textarea name="" id="" cols="30" rows="2" placeholder="Inyr的暗龍有夠快，堡壘給誰、史哥劈誰、瑟琳捅誰之類的" v-model="memo"></textarea>
        <h2>預覽</h2>
        <textarea name="result" id="resultA" cols="30" rows="10" class="ans" readonly>
```prolog{{artifact}}
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
  {{testChild[0].pocket}}
  {{testChild[1].pocket}}
  {{testChild[2].pocket}}
  {{testChild[3].pocket}}
  {{testChild[4].pocket}}
  {{testChild[5].pocket}}
  
```
        </textarea>
        
        <div class="btnArea">
            <button  @click="copyToBoard" class="btn">複製內容</button>
            <button  @click="resetForm" class="btn">重置表單</button>
        </div>
    </div>
</template>
<script>
import ddmenu from './dropdownmenu/ddmenu.vue'
export default {
    name: "GuildWarReport",
    data() {
        
        return {
            pocketIdx: 0,
            artifact:"",
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
                    mainSet: "",
                },
                {
                    roleName:"",
                    speed: "",
                    hp: "",
                    artic: "",
                    subSet: "",
                    mainSet: "",
                },
                {
                    roleName:"",
                    speed: "",
                    hp: "",
                    artic: "",
                    subSet: "",
                    mainSet: "",
                },{
                    roleName:"",
                    speed: "",
                    hp: "",
                    artic: "",
                    subSet: "",
                    mainSet: "",
                },{
                    roleName:"",
                    speed: "",
                    hp: "",
                    artic: "",
                    subSet: "",
                    mainSet: "",
                },{
                    roleName:"",
                    speed: "",
                    hp: "",
                    artic: "",
                    subSet: "",
                    mainSet: "",
                },
            ],
            memo: "",
            testChild:[{pocket:''},{pocket:''},{pocket:''},{pocket:''},{pocket:''},{pocket:''},],
            
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
        },
        dataFromChild: function(data, idx){
            this.testChild[idx].pocket = data;
        },
        setPocketIdx: function(idx) {
            this.pocketIdx = idx;
        },
    },
    components:{
        ddmenu
    }
};
</script>

<style>
@import '../components/style.css'
</style>