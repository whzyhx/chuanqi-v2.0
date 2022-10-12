//测试通讯编号 : YH-I
// ------------ 装备轮子 -------------\\
const quality=[//这个看不懂就砍死你丫的(?
    "<text style='color:grey'>破损的</text>",
    "<text style='color:white'>普通的</text>",
    "<text style='color:lime'>优秀的</text>",
    "<text style='color:blue'>精良的</text>",
    "<text style='color:magenta'>史诗的</text>",
    "<text style='color:gold'>传奇的</text>",
    "<text style='color:red'>神话的</text>",
]
const possibility=[
    n(1),
    n(0.1),
    n(0.01),
    n(0.001),
    n(0.0001),
    n(0.00001),
    n(0.000001),
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
const part_base=[
    [n(3),n(0),n(0),n(0)],
    [n(0),n(3),n(0),n(0)],
    [n(1),n(1),n(1),n(0)],
    [n(0.5),n(1.5),n(1),n(0)],
    [n(0),n(0),n(0),n(3)],
    [n(1),n(0),n(2),n(0)],
    [n(0),n(1.5),n(1.5),n(0)],
]
const base=[n(2),n(1),n(5),n(10)]
const quality_base=[n(1),n(2),n(5),n(10),n(20),n(50),n(100)]
const affix=[
    ["<text style='color:grey'>力量I</text>"  , "攻击+10%"],
    ["<text style='color:white'>力量II</text>" ,"攻击+20%"],
    ["<text style='color:lime'>力量III</text>" ,"攻击+30%"],
    ["<text style='color:blue'>力量IV</text>" , "攻击+40%"],
    ["<text style='color:magenta'>力量V</text>","攻击+50%"],
    ["<text style='color:gold'>力量VI</text>" , "攻击+60%"],
    ["<text style='color:red'>力量VII</text>" , "攻击+70%"],

    ["<text style='color:grey'>强壮I</text>"  , "生命+10%"],
    ["<text style='color:white'>强壮II</text>" ,"生命+20%"],
    ["<text style='color:lime'>强壮III</text>" ,"生命+30%"],
    ["<text style='color:blue'>强壮IV</text>" , "生命+40%"],
    ["<text style='color:magenta'>强壮V</text>","生命+50%"],
    ["<text style='color:gold'>强壮VI</text>" , "生命+60%"],
    ["<text style='color:red'>强壮VII</text>" , "生命+70%"],

    ["<text style='color:grey'>韧性I</text>"  , "防御+10%"],
    ["<text style='color:white'>韧性II</text>" ,"防御+20%"],
    ["<text style='color:lime'>韧性III</text>" ,"防御+30%"],
    ["<text style='color:blue'>韧性IV</text>" , "防御+40%"],
    ["<text style='color:magenta'>韧性V</text>","防御+50%"],
    ["<text style='color:gold'>韧性VI</text>" , "防御+60%"],
    ["<text style='color:red'>韧性VII</text>" , "防御+70%"],
]
const affixPoss=[
    [n(0),n(0),n(0),n(0),n(0)],
    [n(0),n(0),n(0),n(0),n(0)],
    [n(0.5),n(0),n(0),n(0),n(0)],
    [n(0.8),n(0.2),n(0),n(0),n(0)],
    [n(0.8),n(0.6),n(0.2),n(0),n(0)],
    [n(1),n(0.8),n(0.6),n(0.2),n(0)],
    [n(1),n(1),n(0.8),n(0.6),n(0.2)]
]
//每件装备格式如下
//[名字,部位,att,def,hp,spd,(...),[ , , ],level]-后面的数组是用来存放词缀的
//                           |
//              这个是给以后更多的属性预留的地方
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
    // x=n(0.0000000001)
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
    var xxx=n(0).add(Math.random())//随机词缀
    var xxxx=n(which)
    for(var j=0;j<7;j++)
    {
        if(xxxx.eq(j))
        {
            for(var i=0;i<5;i++)
            {
                var gailv=affixPoss[j][i]
                if(xxx.lte(gailv))
                {
                    pos=getAffix()
                    name=name+affix[pos][0]+'的'
                    affixku.push(pos)
                }
            }
        }
    }
    var xx=n(0).add(Math.random())//随机部位
    xx=xx.mul(part.length).floor()
    name=name+part[xx]
    data.push(name)
    data.push(xx)
    //计算装备等级对属性的影响
    var mult=n(1.05).pow(player.battle.currentLvl.sub(1))
    //计算装备属性区域
    for(var i=0;i<4;i++)
    {
        if(i==3)
        {
            mult=n(1)
        }
        data.push(n(base[i].mul(quality_base[xxxx]).mul(part_base[xx][i])).mul(mult))
    }
    /////////////////
    data.push(affixku)
    data.push(player.battle.currentLvl)
    return data
}
function output(data)//根据数据打印装备
{
    var s='<h2>LV.'+format(data[7])+' '
    s+=data[0]
    s+='</h2><br>'
    var xxx=n(data[1])
    s+='部位 : '+part[xxx]
    s+='<br><h1>---------</h1><br><h2>'
    if(n(data[2]).gte(0.001))
    s+='<text style="color:#FF0000">攻击+'+format(data[2])+'<br></text>'
    if(n(data[3]).gte(0.001))
    s+='<text style="color:lightblue">防御+'+format(data[3])+'<br></text>'
    if(n(data[4]).gte(0.001))
    s+='<text style="color:#00FF00">生命+'+format(data[4])+'<br></text>'
    if(n(data[5]).gte(0.001))
    s+='<text style="color:#FF00FF">速度+'+format(data[5])+'<br></text>'
    for(var i=0;i<data[6].length;i++)
    {
        var j=n(data[6][i])
        s+=affix[j][0]+' : '+affix[j][1]+'<br>'
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
            var base = n(2)//坏也 , 我看不懂/kel/kel , ajchen救救我 , ajchen带带我 , ajchen涩涩我 (?(?(?(?))))
            var result = base//计算
            var mult=n(1)
            for(var i=0;i<7;i++)
            {
                if(n(player.equip.weaponCurrent[i].length).lte(3))
                {
                    continue
                }
                result=result.add(player.equip.weaponCurrent[i][2])
                //计算词缀对属性的影响
                for(var j=0;j<player.equip.weaponCurrent[i][6].length;j++)
                {
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(0))mult=mult.mul(1.1)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(1))mult=mult.mul(1.2)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(2))mult=mult.mul(1.3)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(3))mult=mult.mul(1.4)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(4))mult=mult.mul(1.5)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(5))mult=mult.mul(1.6)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(6))mult=mult.mul(1.7)
                }
            }
            player.stat.atk=result.mul(mult)//返回
        },
        def(){
            var base = n(0)
            var result = base
            var mult=n(1)
            for(var i=0;i<7;i++)
            {
                if(n(player.equip.weaponCurrent[i].length).lte(3))
                {
                    continue
                }
                result=result.add(player.equip.weaponCurrent[i][3])
                //计算词缀对属性的影响
                for(var j=0;j<player.equip.weaponCurrent[i][6].length;j++)
                {
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(7))mult=mult.mul(1.1)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(8))mult=mult.mul(1.2)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(9))mult=mult.mul(1.3)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(10))mult=mult.mul(1.4)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(11))mult=mult.mul(1.5)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(12))mult=mult.mul(1.6)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(13))mult=mult.mul(1.7)
                }
            }
            player.stat.def=result.mul(mult)//返回
        },
        hp(){
            var base = n(10)
            var result = base
            var mult=n(1)
            for(var i=0;i<7;i++)
            {
                if(n(player.equip.weaponCurrent[i].length).lte(3))
                {
                    continue
                }
                result=result.add(player.equip.weaponCurrent[i][4])
                //计算词缀对属性的影响
                for(var j=0;j<player.equip.weaponCurrent[i][6].length;j++)
                {
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(14))mult=mult.mul(1.1)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(15))mult=mult.mul(1.2)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(16))mult=mult.mul(1.3)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(17))mult=mult.mul(1.4)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(18))mult=mult.mul(1.5)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(19))mult=mult.mul(1.6)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(20))mult=mult.mul(1.7)
                }
            }
            player.stat.hp=result.mul(mult)//返回
        },
        spd(){
            var base = n(1000)
            var result = base
            for(var i=0;i<7;i++)
            {
                if(n(player.equip.weaponCurrent[i].length).lte(3))
                {
                    continue
                }
                result=result.add(player.equip.weaponCurrent[i][5])
            }
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
                        return '<text style="color:#FF000099">攻击 : </text><text style="color:#FF0000">'+format(player[this.layer].atk)+'</text>'
                    },
                    { "color": "white", "font-size": "32px",}
                ],
                ["display-text",
                    function() {
                        return '<text style="color:#0000FF99">防御 : </text><text style="color:lightblue">'+format(player[this.layer].def)+'</text>'
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
    "幼年史莱姆",
    "史莱姆<text style='color:#FF0000'>战士</text>",
    "史莱姆<text style='color:#00FF00'>弓手</text>",
    "史莱姆<text style='color:#0000FF'>法师</text>",
    "史莱姆<text style='color:#00FFFF'>精英</text>",
]
const monster_img_src=[
    '<img src="js/img/史莱姆.png" alt="">',
    '<img src="js/img/史莱姆战士.png" alt="">',
    '<img src="js/img/史莱姆弓手.png" alt="">',
    '<img src="js/img/史莱姆法师.png" alt="">',
    '<img src="js/img/史莱姆精英.png" alt="">',
]
const map_img_src=[
    '<img src="js/img/地图-草.png" alt="">',
]
const monster_base=[
    [n(1),n(0),n(5),n(2000)],
    [n(5),n(2),n(20),n(2000)],
    [n(10),n(5),n(40),n(2500)],
    [n(15),n(5),n(50),n(2500)],
    [n(25),n(15),n(100),n(1500)],
]
const monster_EXP_gain=[
    n(1),
    n(2),
    n(4),
    n(8),
    n(15),
]
const monster_MONEY_gain=[
    n(1),
    n(3),
    n(6),
    n(15),
    n(30),
]
const monster_lvl_require=[//规定怪物最少在多少级的地图出现
    n(1),
    n(2),
    n(4),
    n(6),
    n(10),
]
const monster_map_require=[//有些怪物只在特定地图出现 , 0表示暂时没有要求
    [n(0)],
    [n(0)],
    [n(0)],
    [n(0)],
    [n(0)],
]
function re_calc(lvl)//重新生成怪物属性
{
    var level=n(lvl)
    var canSummon=[]

    for(var i=0;i<monster_name.length;i++)
    {//是否可以生成这一种怪物
        if(level.gte(n(monster_lvl_require[i])))
        {
            canSummon.push(i)
        }
    }
    var x=n(0).add(Math.random()).mul(canSummon.length).floor()
    var y=canSummon[x]

    //计算高等级地图对低等级怪物属性的影响
    var mult=n(1),cha=level.sub(monster_lvl_require[x])
    mult=n(1.1).pow(cha)

    player.battle.monsterID=n(y)
    player.battle.monsterHPmx=monster_base[y][2].mul(mult)
    player.battle.monsterHPnow=monster_base[y][2].mul(mult)
    player.battle.monsterATK=monster_base[y][0].mul(mult)
    player.battle.monsterDEF=monster_base[y][1].mul(mult)
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
            currentLvl:n(1),
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
                    re_calc(player.battle.currentLvl)
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
                player.battle.stringstringstring=player.battle.stringstringstring+'<br>'
                player.battle.stringstringstring=player.battle.stringstringstring+'你获得了一件装备 !'
                player.stat.EXPnow=player.stat.EXPnow.add(EXPgain)
                player.stat.money=player.stat.money.add(MONEYgain)
                var wea=summon()
                player.equip.weapon.push(wea)
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

    clickables:
    {
        "SUB":
        {
            display()
            {
                return '←'
            },
            unlocked(){return true},
            style(){
               return {"width":"50px","height":"50px","min-height":"50px",}},
            canClick(){return player.battle.currentLvl.gte(2)},
            onClick(){
                player.battle.currentLvl=player.battle.currentLvl.sub(1)
            },
        },
        "ADD":
        {
            display()
            {
                return '→'
            },
            unlocked(){return true},
            style(){
               return {"width":"50px","height":"50px","min-height":"50px",}},
            canClick(){return player.battle.currentLvl.lte(9)},
            onClick(){
                player.battle.currentLvl=player.battle.currentLvl.add(1)
            },
        },
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
        ["row",[["clickable","SUB"],"blank",
                                    ["display-text",function(){return 'Level : '+format(player.battle.currentLvl)}],
                                    ,"blank",["clickable","ADD"],]],
        "blank",
        ["display-text",function(){return `正在${player[this.layer].currentDoingStage==1?'打怪':'找怪'}中...`}],
        ["bar","thatBar"],
        "blank",
        "blank",
        ["display-text",function(){return "<h2>怪物 : "+monster_name[player.battle.monsterID]}],
        ["display-text",function(){return monster_img_src[player.battle.monsterID]+'<br>'+map_img_src[0]}],
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
addLayer("equip",
{
    symbol: "Z",
    position: 1,
    startData()
    {
        return{
            unlocked: true,
            points: new ExpantaNum(0),
            currentPage:n(1),currentPos:n(1),maxPage:n(1),maxPos:n(1),
            weapon:[
            ],
            weaponCurrent:[
                [1,1],
                [1,1],
                [1,1],
                [1,1],
                [1,1],
                [1,1],
                [1,1],
                [1,1],
            ],
        }
    },
    color: "white",
    type: "none",
    tooltip:"装备",
    update(diff)
    {
        player.equip.maxPage=n(player.equip.weapon.length).div(10).add(1).floor()
        player.equip.maxPos=n(player.equip.weapon.length).sub(player.equip.currentPage.sub(1).mul(10)).min(10)
    },
    clickables:
    {
        "Left":
        {
            display()
            {
                return '←'
            },
            unlocked(){return true},
            style(){
               return {"width":"50px","height":"50px","min-height":"50px","transition-duration":"0s",}},
            canClick(){return player.equip.currentPage.gte(1.5)},
            onClick(){
                player.equip.currentPage=player.equip.currentPage.sub(1)
                player.equip.currentPos=n(1)
            },
        },
        "Right":
        {
            display()
            {
                return '→'
            },
            unlocked(){return true},
            style(){
               return {"width":"50px","height":"50px","min-height":"50px","transition-duration":"0s",}},
            canClick(){return player.equip.currentPage.lte(player.equip.maxPage.sub(0.5))},
            onClick(){
                player.equip.currentPage=player.equip.currentPage.add(1)
                player.equip.currentPos=n(1)
            },
        },
        "Up":
        {
            display()
            {
                return '↑'
            },
            unlocked(){return true},
            style(){
               return {"width":"50px","height":"50px","min-height":"50px","transition-duration":"0s",}},
            canClick(){return player.equip.currentPos.gte(1.5)},
            onClick(){
                player.equip.currentPos=player.equip.currentPos.sub(1)
            },
        },
        "Down":
        {
            display()
            {
                return '↓'
            },
            unlocked(){return true},
            style(){
               return {"width":"50px","height":"50px","min-height":"50px","transition-duration":"0s",}},
            canClick(){return player.equip.currentPos.lte(player.equip.maxPos.sub(0.5))},
            onClick(){
                player.equip.currentPos=player.equip.currentPos.add(1)
            },
        },
        "Now":
        {
            display()
            {
                var l=player.equip.currentPage.sub(1).mul(10).add(player.equip.currentPos).sub(1)
                if(n(player.equip.weapon.length).lte(l))
                {
                    return "<text style='color:white'><h1>"+"无"
                }
                if(n(player.equip.weapon[l].length).lte(1))
                {
                    return "<text style='color:white'><h1>"+"无"
                }
                return "<text style='color:white'>"+output(player.equip.weapon[l])
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",}},
            canClick(){return false},
            onClick(){
            },
        },
        "Player":
        {
            display()
            {
                var l=player.equip.currentPage.sub(1).mul(10).add(player.equip.currentPos).sub(1)
                if(n(player.equip.weapon.length).lte(l))
                {
                    return "<text style='color:white'><h1>"+"无"
                }
                var x=n(player.equip.weapon[l][1])
                if(n(player.equip.weaponCurrent[x].length).lte(3))
                {
                    return "<text style='color:white'><h1>"+"无"
                }
                return "<text style='color:white'>"+output(player.equip.weaponCurrent[x])
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",}},
            canClick(){return false},
            onClick(){
            },
        },
        "Equip":
        {
            display()
            {
                return '装备'
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"100px","height":"100px","min-height":"100px","transition-duration":"0s",}},
            canClick(){return true},
            onClick(){
                var l=player.equip.currentPage.sub(1).mul(10).add(player.equip.currentPos).sub(1)
                if(n(player.equip.weapon.length).lte(l))
                {
                    return
                }
                var x=n(player.equip.weapon[l][1])
                if(n(player.equip.weaponCurrent[x].length).lte(3))
                {
                    player.equip.weaponCurrent[x]=player.equip.weapon[l]
                    player.equip.weapon.slice(l,1)
                    return
                }
                var tmp=player.equip.weapon[l]
                player.equip.weapon[l]=player.equip.weaponCurrent[x]
                player.equip.weaponCurrent[x]=tmp
            },
        },
        "Weapon-0":
        {
            display()
            {
                if(n(player.equip.weaponCurrent[0].length).lte(3))
                {
                    return '<text style="color:white"><h1>'+"无"+'</h1></text><br>'
                }
                else
                {
                    return '<text style="color:white">'+output(player.equip.weaponCurrent[0])+'</text>'
                }
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",}},
            canClick(){return false},
            onClick(){
            },
        },
        "Weapon-1":
        {
            display()
            {
                if(n(player.equip.weaponCurrent[1].length).lte(3))
                {
                    return '<text style="color:white"><h1>'+"无"+'</h1></text><br>'
                }
                else
                {
                    return '<text style="color:white">'+output(player.equip.weaponCurrent[1])+'</text>'
                }
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",}},
            canClick(){return false},
            onClick(){
            },
        },
        "Weapon-2":
        {
            display()
            {
                if(n(player.equip.weaponCurrent[2].length).lte(3))
                {
                    return '<text style="color:white"><h1>'+"无"+'</h1></text><br>'
                }
                else
                {
                    return '<text style="color:white">'+output(player.equip.weaponCurrent[2])+'</text>'
                }
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",}},
            canClick(){return false},
            onClick(){
            },
        },
        "Weapon-3":
        {
            display()
            {
                if(n(player.equip.weaponCurrent[3].length).lte(3))
                {
                    return '<text style="color:white"><h1>'+"无"+'</h1></text><br>'
                }
                else
                {
                    return '<text style="color:white">'+output(player.equip.weaponCurrent[3])+'</text>'
                }
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",}},
            canClick(){return false},
            onClick(){
            },
        },
        "Weapon-4":
        {
            display()
            {
                if(n(player.equip.weaponCurrent[4].length).lte(3))
                {
                    return '<text style="color:white"><h1>'+"无"+'</h1></text><br>'
                }
                else
                {
                    return '<text style="color:white">'+output(player.equip.weaponCurrent[4])+'</text>'
                }
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",}},
            canClick(){return false},
            onClick(){
            },
        },
        "Weapon-5":
        {
            display()
            {
                if(n(player.equip.weaponCurrent[5].length).lte(3))
                {
                    return '<text style="color:white"><h1>'+"无"+'</h1></text><br>'
                }
                else
                {
                    return '<text style="color:white">'+output(player.equip.weaponCurrent[5])+'</text>'
                }
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",}},
            canClick(){return false},
            onClick(){
            },
        },
        "Weapon-6":
        {
            display()
            {
                if(n(player.equip.weaponCurrent[6].length).lte(3))
                {
                    return '<text style="color:white"><h1>'+"无"+'</h1></text><br>'
                }
                else
                {
                    return '<text style="color:white">'+output(player.equip.weaponCurrent[6])+'</text>'
                }
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",}},
            canClick(){return false},
            onClick(){
            },
        },
    },
    tabFormat:
    {
        "Player":
        {
            buttonStyle()
            {
                return {"border-radius":"0px"}
            },
            content:[
                "blank",
                ["row",[["clickable","Weapon-5"],["clickable","Weapon-6"],]],
                ["row",[["clickable","Weapon-0"],["clickable","Weapon-1"],["clickable","Weapon-2"],]],
                ["row",[["clickable","Weapon-3"],["clickable","Weapon-4"],]],
            ],
        },
        "Bag":
        {
            buttonStyle()
            {
                return {"border-radius":"0px"}
            },
            content:[
                "blank",
                ["row",[["clickable","Up"]]],
                ["row",[["clickable","Left"],
                        "blank",
                        ["display-text",function(){return format(player.equip.currentPage)+' / '+format(player.equip.maxPage)}],
                        "blank",
                        ["clickable","Right"],]],
                ["row",[["clickable","Down"]]],
                "blank",
                "blank",
                "blank",
                "blank",
                ["display-text",function(){
                    var l=player.equip.currentPage.sub(1).mul(10)
                    var r=player.equip.maxPos.add(l).sub(1)
                    // console.log(l)
                    // console.log(r)
                    var rt=''
                    for(var i=l;i.lte(r);i=i.add(1))
                    {
                        if(n(player.equip.weapon.length).lte(i))
                        {
                            break
                        }
                        if(i.eq(player.equip.currentPos.add(l).sub(1)))
                        {
                            rt=rt+'<br><h1>'+'LV.'+format(player.equip.weapon[i][7])+' '+player.equip.weapon[i][0]+'</h1><br><br>'
                        }
                        else
                        rt=rt+'LV.'+format(player.equip.weapon[i][7])+' '+player.equip.weapon[i][0]+'<br>'
                    }
                    return rt
                }],
                "blank",
                "blank",
                ["row",[["clickable","Equip"]]],
                ["row",[["clickable","Now"],["clickable","Player"],]],
            ],
        },
    },
    row: "side",
    layerShown(){return true},
})