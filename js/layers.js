// ------------ 装备轮子 -------------\\
const quality=[//这个看不懂就砍死你丫的(?
    "<text style='color:grey'>破损</text>",
    "<text style='color:white'>普通</text>",
    "<text style='color:lime'>优秀</text>",
    "<text style='color:blue'>精良</text>",
    "<text style='color:magenta'>史诗</text>",
    "<text style='color:gold'>传奇</text>",
    "<text style='color:red'>神话</text>",
]
const possibility=[
    n(0.9),
    n(0.09),
    n(0.009),
    n(0.0009),
    n(0.00009),
    n(0.000009),
    n(0.0000009),
]
const part=[
    "剑",
    "护甲",
    "护手",
    "护腿",
    "靴子",
    "项链",
    "戒指",
]
const base=[
    [1,2,5,100],//表示不同品质的基础属性 , 同时属性收到装备等级影响 , (数值未填充)
    [1,2,5,100],//对了 , 不同装备应该有不同侧重点
    [1,2,5,100],//后面再说
    [1,2,5,100],
    [1,2,5,100],
    [1,2,5,100],
    [1,2,5,100],
]
const affix=[
    ["词缀1","---"],//左边是名称，右边是说明
    ["词缀2","---"],
    ["词缀3","---"],
    ["词缀4","---"],
    ["词缀5","---"],
    ["词缀6","---"],
    ["词缀7","---"],
    ["词缀8","---"],
    ["词缀9","---"],
    //肯定不止九个,以后慢慢加
]
const affixPoss=[
    [n(0),n(0),n(0),n(0),n(0),],
    [n(0.5),n(0),n(0),n(0),n(0),],
    [n(0.8),n(0.2),n(0),n(0),n(0),],
    [n(0.8),n(0.6),n(0.2),n(0),n(0),],
    [n(1),n(0.8),n(0.6),n(0.2),n(0),],
    [n(1),n(1),n(0.8),n(0.6),n(0.2)],
]
//每件装备格式如下
//[名字,att,def,hp,spd,(...),[ , , ]]-后面的数组是用来存放词缀的
//                      |
//          这个是给以后更多的属性预留的地方
function getAffix()
{
    var xx=n(0).add(Math.random())
    xx=xx.mul(affix.length).floor()
    return xx
}
function summon()
{
    var data=[]
    var affixku=[]
    //装备基础爆率 (显然 , 这个东西收到难度影响还有玩家自身属性)
    //破损:90%
    //普通:9%
    //优秀:0.9%
    //精良:0.09%
    //史诗:0.009%
    //传奇:0.0009%
    //神话:0.0001%
    var x=n(0).add(Math.random())//随机品质
    x=n(0.0000000001)
    var which=0
    var name=''
    for(var i=0;i<possibility.length;i++)
    {
        if(x.lte(possibility[i]))
        {
            name=quality[i]
            which=i
        }
    }
    name=name+'的'
    var xxx=n(0).add(Math.random())//随机词缀
    for(var i=0;i<5;i++)
    {
        if(xxx.lte(affixPoss[n(which).toNumber()][i]))
        {
            pos=getAffix()
            name=name+affix[pos][0]+'的'
            affixku.push(pos)
        }
    }
    var xx=n(0).add(Math.random())//随机部位
    xx=xx.mul(part.length).floor()
    name=name+part[xx]
    data.push(name)
    //计算装备属性区域
    data.push(1)
    data.push(2)
    data.push(5)
    data.push(10)
    /////////////////
    data.push(affixku)
    return data
}
function output(data)//根据数据打印装备
{
    var s=''
    s+=data[0]
    s+='<br>'
    if(data[1]>0)
    s+='攻击+'+format(data[1])+'<br>'
    if(data[2]>0)
    s+='防御+'+format(data[2])+'<br>'
    if(data[3]>0)
    s+='生命+'+format(data[3])+'<br>'
    if(data[4]>0)
    s+='速度+'+format(data[4])+'<br>'
    for(var i=0;i<data[5].length;i++)
    {
        s+=affix[data[5][i]][0]+' : '+affix[data[5][i]][1]+'<br>'
    }
    return s
}
// ------------ END -------------\\
addLayer("stat",
{
    symbol: "S",
    position: 0,
    startData()
    {
        return{
            unlocked: true,
            points: new ExpantaNum(0),
            atk:two,
            def:one,
            hp:n(10),hpnow:n(10),
            spd:n(1000),
            luck:one,
            playerProgress:n(0),
            level:n(1),EXPneed:n(10),EXPnow:n(0),
            money:n(0),
        }
    },
    color: "white",
    type: "none",
    tooltip:"数据",

    calcStats:{//在这里面计算属性
        atk(){
            var base = n(2)//看不懂砍死你丫的
            var result = base//计算
            player.stat.atk=result//返回
        },
        def(){
            var base = n(0)
            var result = base
            player.stat.def=result
        },
        hp(){
            var base = n(10)
            var result = base
            player.stat.hp=result
        },
        spd(){
            var base = n(1000)
            var result = base
            player.stat.spd=result
        },
        luck(){
            var base = n(1)
            var result = base
            player.stat.luck=result
        },
    },


    tabFormat:
    {
        "属性":
        {
            buttonStyle()
            {
                return {"border-radius":"0px"}
            },
            content:[
                "blank",
                ["display-text",
                    function() {
                        return output(summon())
                    },
                    { "color": "white", "font-size": "32px",}
                ],
                ["display-text",
                    function() {
                        return '<text style="color:#FF000099">攻击 : </text><text style="color:#FF0000">'+format(player[this.layer].atk)+'</text>'
                    },
                    { "color": "white", "font-size": "32px",}
                ],
                ["display-text",
                    function() {
                        return '<text style="color:#0000FF99">防御 : </text><text style="color:#0000FF">'+format(player[this.layer].def)+'</text>'
                    },
                    { "color": "white", "font-size": "32px",}
                ],
                ["display-text",
                    function() {
                        return '<text style="color:#00FF0099">生命 : </text><text style="color:#00FF00">'+format(player[this.layer].hp)+'</text>'
                    },
                    { "color": "white", "font-size": "32px",}
                ],
                ["display-text",
                    function() {
                        return '<text style="color:#FF00FF99">速度 : </text><text style="color:#FF00FF">'+format(player[this.layer].spd)+'</text>'
                    },
                    { "color": "white", "font-size": "32px",}
                ],
                ["display-text",
                    function() {
                        return '<text style="color:#FFFF0099">幸运 : </text><text style="color:#FFFF00">'+format(player[this.layer].luck)+'</text>'
                    },
                    { "color": "white", "font-size": "32px",}
                ],
            ],
        },
    },
    row: "side",
    layerShown(){return true},
})
const monster_name=[
    "史莱姆"
]
const monster_img_src=[
    '<img src="js/img/史莱姆.png" alt="">',
]
const map_img_src=[
    '<img src="js/img/地图-草.png" alt="">',
]
const monster_base=[
    [n(1),n(0),n(5),n(2000)],
]
const monster_EXP_gain=[
    n(1),
]
const monster_MONEY_gain=[
    n(1),
]
function re_calc()//重新生成怪物属性
{
    // var level=1
    var canSummon=[]
    for(var i=0;i<monster_name.length;i++)
    {
        if(1)//表示是否可以生成这一种怪物
        {
            canSummon.push(i)
        }
    }
    var x=n(0).add(Math.random()).mul(canSummon.length).floor()
    var y=canSummon[x]
    player.battle.monsterID=n(y)
    player.battle.monsterHPmx=monster_base[y][2]
    player.battle.monsterHPnow=monster_base[y][2]
    player.battle.monsterATK=monster_base[y][0]
    player.battle.monsterDEF=monster_base[y][1]
    player.battle.monsterSPD=monster_base[y][3]
    return
}
addLayer("battle",
{
    symbol: "B",
    row: 0,
    position: 0,
    startData()
    {
        return {
            unlocked: true,
            points: new ExpantaNum(0),
            currentDoingProgress:0,//现在干的进度
            currentDoingStage:0,//现在在干啥
            //stage=0:找怪
            //stage=1:打怪
            inFight:0,//在战斗中?
            monsterID:n(0),
            monsterHPmx:n(0),monsterHPnow:n(0),
            monsterATK:n(0),monsterDEF:n(0),
            monsterSPD:n(0),
            monsterProgress:n(0),
            stringstringstring:"",
        }
    },
    color: "white",
    type: "none",
    tooltip:"战场",

    update(diff)
    {//现在在干嘛
        if (player[this.layer].currentDoingProgress>=1)
        {
            if(player.battle.inFight==0)
            {
                if(player.battle.currentDoingStage==0)
                {
                    player.battle.inFight=1
                    player.stat.hpnow=player.stat.hp
                    player.battle.stringstringstring=""
                    player.battle.monsterProgress=n(0)
                    player.stat.playerProgress=n(0)
                    re_calc()
                }
                else
                {
                    player[this.layer].currentDoingProgress=0
                }
                player[this.layer].currentDoingStage=(player[this.layer].currentDoingStage+1)%2//保证事件在这两样之间循环
            }
        }
        if(player.battle.inFight==1)
        {
            player.battle.monsterProgress=player.battle.monsterProgress.add(player.battle.monsterSPD.div(5000).mul(diff))
            if(player.battle.monsterProgress.gte(1))
            {
                player.battle.monsterProgress=n(0)
                //产生一次攻击
                player.stat.hpnow=player.stat.hpnow.sub(player.battle.monsterATK.sub(player.stat.def).max(0))
            }
            player.stat.playerProgress=player.stat.playerProgress.add(player.stat.spd.div(5000).mul(diff))
            if(player.stat.playerProgress.gte(1))
            {
                player.stat.playerProgress=n(0)
                //产生一次攻击
                player.battle.monsterHPnow=player.battle.monsterHPnow.sub(player.stat.atk.sub(player.battle.monsterDEF).max(0)).max(0)
            }
            if(player.stat.hpnow.lte(0.001))
            {
                player.battle.stringstringstring="<text style='color:red'>你死了</text>"
                player.battle.inFight=0
            }
            else if(player.battle.monsterHPnow.lte(0.001))
            {
                player.battle.stringstringstring="<text style='color:gold'>你赢了</text>"
                player.battle.inFight=0
                //计算掉落
                //注意 , 掉落是需要显示的 , 即加到stringstringstring里
                var EXPgain=monster_EXP_gain[player.battle.monsterID]
                var MONEYgain=monster_MONEY_gain[player.battle.monsterID]
                player.battle.stringstringstring=player.battle.stringstringstring+'<br>'
                player.battle.stringstringstring=player.battle.stringstringstring+'你获得了 '+format(EXPgain)+' 点经验'
                player.battle.stringstringstring=player.battle.stringstringstring+'<br>'
                player.battle.stringstringstring=player.battle.stringstringstring+'你获得了 '+format(MONEYgain)+' 金币'
                player.stat.EXPnow=player.stat.EXPnow.add(EXPgain)
                player.stat.money=player.stat.money.add(MONEYgain)
            }
        }
        //下面开始处理！
        if (player[this.layer].currentDoingStage==0)
        {//stage=0:找怪
            player[this.layer].currentDoingProgress+=player.stat.spd.div(5000).mul(diff).toNumber()
            // return ['找怪',player[this.layer].currentDoingProgress]
        }
        if (player[this.layer].currentDoingStage==1)
        {//stage=1:打怪
            // player[this.layer].currentDoingProgress+=0.01
            // return ['打怪',player[this.layer].currentDoingProgress]
        }
    },

    bars:
    {
        thatBar:
        {
            direction: RIGHT,
            width: 400,
            height: 25,
            progress()
            {
                return player[this.layer].currentDoingProgress
            },
            fillStyle()
            {
                if (player[this.layer].inFight==0) return {"background-color":"#00FF00"}
                return {"background-color":"#FF0000"}
            },
        },
        monsterHPbar:{
            direction: RIGHT,
            width: 400,
            height: 20,
            progress()
            {
                return player.battle.monsterHPnow.div(player.battle.monsterHPmx)
            },
            fillStyle()
            {
                return {"background-color":"#FF0000"}
            },
            display()
            {
                return "HP "+format(player.battle.monsterHPnow)+' / '+format(player.battle.monsterHPmx)
            }
        },
        playerHPbar:{
            direction: RIGHT,
            width: 400,
            height: 20,
            progress()
            {
                return player.stat.hpnow.div(player.stat.hp)
            },
            fillStyle()
            {
                return {"background-color":"#FF0000"}
            },
            display()
            {
                return "HP "+format(player.stat.hpnow)+' / '+format(player.stat.hp)
            }
        },
        monsterSPDbar:{
            direction: RIGHT,
            width: 400,
            height: 20,
            progress() {
                return player.battle.monsterProgress
            },
            fillStyle(){
                return {"background-color":"#FFFF00"}
            },
            display()
            {
                return ""
            }
        },
        playerSPDbar:{
            direction: RIGHT,
            width: 400,
            height: 20,
            progress() {
                return player.stat.playerProgress
            },
            fillStyle(){
                return {"background-color":"#FFFF00"}
            },
            display()
            {
                return ""
            }
        },
    },

    tabFormat:[
        ["display-text",function(){return `正在${player[this.layer].currentDoingStage==1?'打怪':'找怪'}中...`}],
        ["bar","thatBar"],
        "blank",
        "blank",
        ["display-text",function(){return "<h2>怪物 : "+monster_name[0]}],
        ["display-text",function(){return monster_img_src[0]+'<br>'+map_img_src[0]}],
        "blank",
        ["bar","monsterHPbar"],
        ["bar","monsterSPDbar"],
        "blank",
        ["display-text",function(){return player.battle.stringstringstring}],
        "blank",
        ["bar","playerHPbar"],
        ["bar","playerSPDbar"],
    ],

    layerShown(){return true},
})