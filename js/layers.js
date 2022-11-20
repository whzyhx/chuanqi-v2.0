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
    n(1000000),
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
    ["<text style='color:grey'>力量I"  , "攻击+10%"],
    ["<text style='color:white'>力量II" ,"攻击+20%"],
    ["<text style='color:lime'>力量III" ,"攻击+30%"],
    ["<text style='color:blue'>力量IV" , "攻击+40%"],
    ["<text style='color:magenta'>力量V","攻击+50%"],
    ["<text style='color:gold'>力量VI" , "攻击+60%"],
    ["<text style='color:red'>力量VII" , "攻击+70%"],

    ["<text style='color:grey'>强壮I"  , "生命+10%"],
    ["<text style='color:white'>强壮II" ,"生命+20%"],
    ["<text style='color:lime'>强壮III" ,"生命+30%"],
    ["<text style='color:blue'>强壮IV" , "生命+40%"],
    ["<text style='color:magenta'>强壮V","生命+50%"],
    ["<text style='color:gold'>强壮VI" , "生命+60%"],
    ["<text style='color:red'>强壮VII" , "生命+70%"],

    ["<text style='color:grey'>韧性I"  , "防御+10%"],
    ["<text style='color:white'>韧性II" ,"防御+20%"],
    ["<text style='color:lime'>韧性III" ,"防御+30%"],
    ["<text style='color:blue'>韧性IV" , "防御+40%"],
    ["<text style='color:magenta'>韧性V","防御+50%"],
    ["<text style='color:gold'>韧性VI" , "防御+60%"],
    ["<text style='color:red'>韧性VII" , "防御+70%"],
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
//[名字,部位,att,def,hp,spd,(...),[ , , ],level,quality]-后面的数组是用来存放词缀的
//                           |
//              这个是给以后更多的属性预留的地方
function getAffix()
{
    var xx=n(0).add(Math.random())
    xx=xx.mul(affix.length).floor()
    return xx
}
function summon(baolv)
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
    // x=n(0.0000000001) // 匿名专属爆率 , ajchen不许用(?)
    x=x.div(player.stat.luck).div(baolv)
    // console.log(baolv)
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
                    name=name+affix[pos][0]+'的</text>'
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
    data.push(xxxx)
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


addLayer("data",
{
    startData()
    {
        return{
            unlocked: true,
            points: new ExpantaNum(0),
            playerProgress:n(0),
            level:n(1),EXPneed:n(10),EXPnow:n(0),
            money:n(0),
            kill_boss_1:n(0),
            weapon:[],
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
})
addLayer("stat",
{
    symbol: "<h2>M",
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
    tooltip:"面板",
    nodeStyle(){
        return {"border-radius":"20px 20px 0 0","background-color":"red"}
    },
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
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(14))mult=mult.mul(1.1)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(15))mult=mult.mul(1.2)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(16))mult=mult.mul(1.3)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(17))mult=mult.mul(1.4)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(18))mult=mult.mul(1.5)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(19))mult=mult.mul(1.6)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(20))mult=mult.mul(1.7)
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
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(7))mult=mult.mul(1.1)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(8))mult=mult.mul(1.2)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(9))mult=mult.mul(1.3)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(10))mult=mult.mul(1.4)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(11))mult=mult.mul(1.5)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(12))mult=mult.mul(1.6)
                    if(n(player.equip.weaponCurrent[i][6][j]).eq(13))mult=mult.mul(1.7)
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
            if(_inChallenge(1))
            {
                result=result.mul(5)
            }
            else
            {
                if(_finishChallenge(1))result=result.mul(1.1)
            }
            player.stat.luck=result
        },
    },
    clickables:
    {
        "Sell 0":
        {
            display()
            {
                return '一键卖出<br>'+quality[0]
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"100px","height":"100px","min-height":"100px","background-color":"orange"}},
            canClick(){return true},
            onClick(){
                var newWeapon=[]
                var gain=n(0)
                for(var i=0;i<player.equip.weapon.length;i++)
                {
                    if(n(player.equip.weapon[i][8]).eq(0))
                    {
                        gain=gain.add(1)
                    }
                    else
                    {
                        newWeapon.push(player.equip.weapon[i])
                    }
                }
                player.equip.weapon=newWeapon
                player.stat.money=player.stat.money.add(gain)
            },
        },
        "Sell 1":
        {
            display()
            {
                return '一键卖出<br>'+quality[1]
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"100px","height":"100px","min-height":"100px","background-color":"orange"}},
            canClick(){return true},
            onClick(){
                var newWeapon=[]
                var gain=n(0)
                for(var i=0;i<player.equip.weapon.length;i++)
                {
                    if(n(player.equip.weapon[i][8]).eq(1))
                    {
                        gain=gain.add(5)
                    }
                    else
                    {
                        newWeapon.push(player.equip.weapon[i])
                    }
                }
                player.equip.weapon=newWeapon
                player.stat.money=player.stat.money.add(gain)
            },
        },
        "Sell 2":
        {
            display()
            {
                return '一键卖出<br>'+quality[2]
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"100px","height":"100px","min-height":"100px","background-color":"orange"}},
            canClick(){return true},
            onClick(){
                var newWeapon=[]
                var gain=n(0)
                for(var i=0;i<player.equip.weapon.length;i++)
                {
                    if(n(player.equip.weapon[i][8]).eq(2))
                    {
                        gain=gain.add(15)
                    }
                    else
                    {
                        newWeapon.push(player.equip.weapon[i])
                    }
                }
                player.equip.weapon=newWeapon
                player.stat.money=player.stat.money.add(gain)
            },
        },
        "Sell 3":
        {
            display()
            {
                return '一键卖出<br>'+quality[3]
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"100px","height":"100px","min-height":"100px","background-color":"orange"}},
            canClick(){return true},
            onClick(){
                var newWeapon=[]
                var gain=n(0)
                for(var i=0;i<player.equip.weapon.length;i++)
                {
                    if(n(player.equip.weapon[i][8]).eq(3))
                    {
                        gain=gain.add(50)
                    }
                    else
                    {
                        newWeapon.push(player.equip.weapon[i])
                    }
                }
                player.equip.weapon=newWeapon
                player.stat.money=player.stat.money.add(gain)
            },
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
                        return '<text style="color:#FF0000c0">攻击 : </text><text style="color:#FF0000">'+format(player[this.layer].atk)+'</text>'
                    },
                    { "color": "white", "font-size": "32px",}
                ],
                ["display-text",
                    function() {
                        return '<text style="color:#0000FFc0">防御 : </text><text style="color:lightblue">'+format(player[this.layer].def)+'</text>'
                    },
                    { "color": "white", "font-size": "32px",}
                ],
                ["display-text",
                    function() {
                        return '<text style="color:#00FF00c0">生命 : </text><text style="color:#00FF00">'+format(player[this.layer].hp)+'</text>'
                    },
                    { "color": "white", "font-size": "32px",}
                ],
                ["display-text",
                    function() {
                        return '<text style="color:#FF00FFc0">速度 : </text><text style="color:#FF00FF">'+format(player[this.layer].spd)+'</text>'
                    },
                    { "color": "white", "font-size": "32px",}
                ],
                ["display-text",
                    function() {
                        return '<text style="color:#FFFF00c0">幸运 : </text><text style="color:#FFFF00">'+format(player[this.layer].luck)+'</text>'
                    },
                    { "color": "white", "font-size": "32px",}
                ],
            ],
        },
        "选项":
        {
            buttonStyle()
            {
                return {"border-radius":"0px"}
            },
            content:[
                "blank",
                ["row",[["clickable","Sell 0"],["clickable","Sell 1"],["clickable","Sell 2"],["clickable","Sell 3"],]]
            ],
        },
       },
    row: "side",
    layerShown(){return true},
})
addLayer("equip",
{
    symbol: "<h2>W",
    position: 1,
    startData()
    {
        return{
            unlocked: true,
            points: new ExpantaNum(0),
            currentID:n(0),
            currentPage:n(1),maxPage:n(1),
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
    tooltip:"武器",
    nodeStyle(){
        return {"border-radius":"0 0 20px 20px","background-color":"blue"}
    },
    update(diff)
    {
        player.equip.maxPage=n(player.equip.weapon.length).div(50).add(1).floor()

        //对不起 , 陌尘
        if(_inChallenge(0))
        {
            player.devSpeed=5
        }
        else
        {
            if(_finishChallenge(0))player.devSpeed=1.1
            else player.devSpeed=1
        }
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
               return {"border-radius":"20px 0 0 20px","width":"50px","height":"50px","min-height":"50px",}},
            canClick(){return player.equip.currentPage.gte(1.5)},
            onClick(){
                player.equip.currentPage=player.equip.currentPage.sub(1)
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
               return {"border-radius":"0 20px 20px 0","width":"50px","height":"50px","min-height":"50px",}},
            canClick(){return player.equip.currentPage.lte(player.equip.maxPage.sub(0.5))},
            onClick(){
                player.equip.currentPage=player.equip.currentPage.add(1)
            },
        },
        "Now":
        {
            display()
            {
                var s='<h1>当前的</h1><br><br>'
                var l=player.equip.currentID
                if(n(player.equip.weapon.length).lte(l))
                {
                    return "<text style='color:white'><h1>"+"无"
                }
                if(n(player.equip.weapon[l].length).lte(1))
                {
                    return "<text style='color:white'><h1>"+"无"
                }
                return "<text style='color:white'>"+s+output(player.equip.weapon[l])
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",
                        "border-width":"5px","border-color":"white"}},
            canClick(){return false},
            onClick(){
            },
        },
        "Player":
        {
            display()
            {
                var s='<h1>穿戴中</h1><br><br>'
                var l=player.equip.currentID
                if(n(player.equip.weapon.length).lte(l))
                {
                    return "<text style='color:white'><h1>"+"无"
                }
                var x=n(player.equip.weapon[l][1])
                if(n(player.equip.weaponCurrent[x].length).lte(3))
                {
                    return "<text style='color:white'><h1>"+"无"
                }
                return "<text style='color:white'>"+s+output(player.equip.weaponCurrent[x])
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",
                        "border-width":"5px","border-color":"white"}},
            canClick(){return false},
            onClick(){
            },
        },
        "Equip":
        {
            display()
            {
                return '装备<br>'+format(player.equip.currentPage)+' / '+format(player.equip.maxPage)
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"20px","width":"100px","height":"100px","min-height":"100px",}},
            canClick(){return true},
            onClick(){
                var l=player.equip.currentID
                if(n(player.equip.weapon.length).lte(l))
                {
                    return
                }
                var x=n(player.equip.weapon[l][1])
                if(n(player.equip.weaponCurrent[x].length).lte(3))
                {
                    player.equip.weaponCurrent[x]=player.equip.weapon[l]
                    player.equip.weapon.splice(l,1)
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
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",
               "border-width":"5px","border-color":"white"}},
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
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",
               "border-width":"5px","border-color":"white"}},
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
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",
               "border-width":"5px","border-color":"white"}},
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
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",
               "border-width":"5px","border-color":"white"}},
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
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",
               "border-width":"5px","border-color":"white"}},
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
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",
               "border-width":"5px","border-color":"white"}},
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
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",
               "border-width":"5px","border-color":"white"}},
            canClick(){return false},
            onClick(){
            },
        },
    },
    grid: {
        rows: 10,
        cols: 5,
        getStartData(id) {
            return 0
        },
        getUnlocked(id) { // Default
            return true
        },
        getCanClick(data, id) {
            var x=n(id/100).floor(),y=n(id%100)
            var idd=x.sub(1).mul(5).add(y).sub(1).add(player.equip.currentPage.sub(1).mul(50))
            if(n(player.equip.weapon.length).lte(idd))
            {
                return false
            }
            return true
        },
        getStyle(data,id){
            var x=n(id/100).floor(),y=n(id%100)
            var idd=x.sub(1).mul(5).add(y).sub(1).add(player.equip.currentPage.sub(1).mul(50))
            if(player.equip.currentID.eq(idd))
            {
                return {"height":"50px","min-height":"50px","width":"150px","background-color":"rgb(205,185,39)","border-radius":"0px","transition-duration":"0s"}
            }
            return {"height":"50px","min-height":"50px","width":"150px","background-color":"black","border-radius":"0px","transition-duration":"0s"}
        },
        onClick(data, id) {
            var x=n(id/100).floor(),y=n(id%100)
            var idd=x.sub(1).mul(5).add(y).sub(1).add(player.equip.currentPage.sub(1).mul(50))
            player.equip.currentID=idd
        },
        getDisplay(data, id) {
            var x=n(id/100).floor(),y=n(id%100)
            var idd=x.sub(1).mul(5).add(y).sub(1).add(player.equip.currentPage.sub(1).mul(50))
            if(n(player.equip.weapon.length).lte(idd))
            {
                return ''
            }
            // if(player.equip.currentID.eq(idd))
            // {
            //     return '<text style="color:black">'+'LV.'+format(player.equip.weapon[idd][7])+' '+player.equip.weapon[idd][0]
            // }
            return '<text style="color:white">'+'LV.'+format(player.equip.weapon[idd][7])+' '+player.equip.weapon[idd][0]
        },
    },
    tabFormat:
    {
        "玩家":
        {
            buttonStyle()
            {
                return {"border-radius":"0px"}
            },
            content:[
                "blank",
                ["row",[["clickable","Weapon-5"],"blank","blank",["clickable","Weapon-6"],]],
                "blank",
                ["row",[["clickable","Weapon-0"],"blank","blank",["clickable","Weapon-1"],"blank","blank",["clickable","Weapon-2"],]],
                "blank",
                ["row",[["clickable","Weapon-3"],"blank","blank",["clickable","Weapon-4"],]],
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
            ],
        },
        "背包":
        {
            buttonStyle()
            {
                return {"border-radius":"0px"}
            },
            content:[
                "blank",
                ["row",[["clickable","Now"],
                        "blank",
                        "blank",
                        "blank",
                        ["clickable","Left"],
                        ["clickable","Equip"],
                        ["clickable","Right"],
                        "blank",
                        "blank",
                        "blank",
                        ["clickable","Player"],]],
                "blank",
                "blank",
                "blank",
                "blank",
                ["display-text",function(){return '<h2>背包容量 '+format(player.equip.weapon.length)+'/200'}],
                "blank",
                "grid",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
            ],
        },
    },
    row: "side",
    layerShown(){return true},
})
var monster={
    slime:{
        name(){return "幼年史莱姆"},
        src(){return '史莱姆'},
        unlocked(){return n(player.battle.currentLvl).gte(1)},
        mult(){return n(1.1).pow(n(player.battle.currentLvl))},
        hp(){return n(5).mul(monster['slime'].mult())},
        atk(){return n(1).mul(monster['slime'].mult())},
        def(){return n(0).mul(monster['slime'].mult())},
        spd(){return n(2000)},
        EXP_gain(){return n(1)},
        MONEY_gain(){return n(1)},
        BaoLv(){return n(1)},
    },
    slime_zhanshi:{
        name(){return "史莱姆<text style='color:#FF0000'>战士</text>"},
        src(){return '史莱姆战士'},
        unlocked(){return n(player.battle.currentLvl).gte(2)},
        mult(){return n(1.1).pow(n(player.battle.currentLvl))},
        hp(){return n(10).mul(monster['slime_zhanshi'].mult())},
        atk(){return n(5).mul(monster['slime_zhanshi'].mult())},
        def(){return n(2).mul(monster['slime_zhanshi'].mult())},
        spd(){return n(2000)},
        EXP_gain(){return n(2)},
        MONEY_gain(){return n(3)},
        BaoLv(){return n(2)},
    },
    slime_gongshou:{
        name(){return "史莱姆<text style='color:#00FF00'>弓手</text>"},
        src(){return '史莱姆弓手'},
        unlocked(){return n(player.battle.currentLvl).gte(4)},
        mult(){return n(1.1).pow(n(player.battle.currentLvl))},
        hp(){return n(15).mul(monster['slime_gongshou'].mult())},
        atk(){return n(8).mul(monster['slime_gongshou'].mult())},
        def(){return n(4).mul(monster['slime_gongshou'].mult())},
        spd(){return n(2500)},
        EXP_gain(){return n(4)},
        MONEY_gain(){return n(6)},
        BaoLv(){return n(3)},
    },
    slime_fashi:{
        name(){return "史莱姆<text style='color:#0000FF'>法师</text>"},
        src(){return '史莱姆法师'},
        unlocked(){return n(player.battle.currentLvl).gte(6)},
        mult(){return n(1.1).pow(n(player.battle.currentLvl))},
        hp(){return n(25).mul(monster['slime_fashi'].mult())},
        atk(){return n(15).mul(monster['slime_fashi'].mult())},
        def(){return n(8).mul(monster['slime_fashi'].mult())},
        spd(){return n(2500)},
        EXP_gain(){return n(8)},
        MONEY_gain(){return n(15)},
        BaoLv(){return n(5)},
    },
    slime_jingying:{
        name(){return "史莱姆<text style='color:#00FFFF'>精英</text>"},
        src(){return '史莱姆精英'},
        unlocked(){return n(player.battle.currentLvl).gte(10)},
        mult(){return n(1.1).pow(n(player.battle.currentLvl))},
        hp(){return n(30).mul(monster['slime_jingying'].mult())},
        atk(){return n(20).mul(monster['slime_jingying'].mult())},
        def(){return n(15).mul(monster['slime_jingying'].mult())},
        spd(){return n(1500)},
        EXP_gain(){return n(15)},
        MONEY_gain(){return n(30)},
        BaoLv(){return n(10)},
    },
    slime_guowang:{
        name(){return "史莱姆<text style='color:gold'>国王</text>"},
        src(){return '史莱姆国王'},
        unlocked(){return false},
        mult(){return n(1)},
        hp(){return n(3000).mul(monster['slime_guowang'].mult())},
        atk(){return n(1000).mul(monster['slime_guowang'].mult())},
        def(){return n(750).mul(monster['slime_guowang'].mult())},
        spd(){return n(1750)},
        EXP_gain(){return n(150)},
        MONEY_gain(){return n(300)},
        BaoLv(){return n(100)},
    },
}
const map_img_src=[
    "<img src='js/img/地图-草.png' alt=''>",
]
//`<img src="js/img/`+moster[]+`.png" alt="">`
function re_calc(lvl)//重新生成怪物属性
{
    var level=n(lvl)
    var canSummon=[]

    for(i in monster)
    {//是否可以生成这一种怪物
        if(monster[i].unlocked())
        {
            canSummon.push(i)
        }
    }
    var x=n(0).add(Math.random()).mul(canSummon.length).floor()
    var y=canSummon[x]
    player.battle.monsterID=y
    player.battle.monsterHPmx=monster[y].hp()
    player.battle.monsterHPnow=monster[y].hp()
    player.battle.monsterATK=monster[y].atk()
    player.battle.monsterDEF=monster[y].def()
    player.battle.monsterSPD=monster[y].spd()
    return
}
addLayer("battle",  
{
    symbol: "<text style='color:black'>B",
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
            monsterID:'slime',
            monsterHPmx:n(0),monsterHPnow:n(0),
            monsterATK:n(0),monsterDEF:n(0),
            monsterSPD:n(0),
            monsterProgress:n(0),
            stringstringstring:"",

            zhandourizhi:[],

            kill_boss_1:n(0),
        }
    },
    color: "white",
    type: "none",
    tooltip:"战斗",

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
                    player.battle.zhandourizhi=[]
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
                player.stat.hpnow=player.stat.hpnow.sub(player.battle.monsterATK.sub(player.stat.def).max(0)).max(0)
                player.battle.zhandourizhi.push(
                    monster[player.battle.monsterID].name()+' 对 你 造成了 <text style="color:red">'
                    +format(player.battle.monsterATK.sub(player.stat.def).max(0))+'</text> 伤害')
            }
            player.stat.playerProgress=player.stat.playerProgress.add(player.stat.spd.div(5000).mul(diff))
            if(player.stat.playerProgress.gte(1))
            {
                player.stat.playerProgress=n(0)
                //产生一次攻击
                player.battle.monsterHPnow=player.battle.monsterHPnow.sub(player.stat.atk.sub(player.battle.monsterDEF).max(0)).max(0)
                player.battle.zhandourizhi.push(
                    '你 对 '+monster[player.battle.monsterID].name()+' 造成了 <text style="color:red">'
                    +format(player.stat.atk.sub(player.battle.monsterDEF).max(0))+'</text> 伤害')
            }
            if(player.stat.hpnow.lte(0.001))
            {
                player.battle.stringstringstring="<text style='color:red'>你死了</text>"
                player.battle.inFight=0
            }
            else if(player.battle.monsterHPnow.lte(0.001))
            {
                //计算 击杀boss
                if(player.battle.monsterID=="slime_guowang")
                {
                    alert("你一剑击碎了史莱姆国王的王冠")
                    alert('"#$%^@$!"')
                    alert("奇怪的是 , 国王的眼神里 , 没有悲哀")
                    alert("仅仅有一丝遗憾和一点点的释然")
                    alert("它最后的话你并没有听懂 , 但你隐约觉得哪里不太对")
                    player.battle.kill_boss_1=n(1)
                }
                //
                player.battle.stringstringstring="<text style='color:gold'>你赢了</text>"
                player.battle.inFight=0
                //计算掉落
                //注意 , 掉落是需要显示的 , 即加到stringstringstring里
                var EXPgain=monster[player.battle.monsterID].EXP_gain()
                var MONEYgain=monster[player.battle.monsterID].MONEY_gain()
                player.battle.stringstringstring=player.battle.stringstringstring+'<br>'
                player.battle.stringstringstring=player.battle.stringstringstring+'你获得了 '+format(EXPgain)+' 点经验'
                player.battle.stringstringstring=player.battle.stringstringstring+'<br>'
                player.battle.stringstringstring=player.battle.stringstringstring+'你获得了 '+format(MONEYgain)+' 金币'
                player.battle.stringstringstring=player.battle.stringstringstring+'<br>'
                player.battle.stringstringstring=player.battle.stringstringstring+'你获得了一件装备 !'
                player.stat.EXPnow=player.stat.EXPnow.add(EXPgain)
                player.stat.money=player.stat.money.add(MONEYgain)
                if(player.equip.weapon.length<200)
                {
                    var wea=summon(monster[player.battle.monsterID].BaoLv())
                    player.equip.weapon.push(wea)
                }
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
    nodeStyle(){
        // return {"clip-path":"polygon(50% 0%,60% 10%,60% 60%,80% 60%,80% 70%,60% 70% 60% 100%,40% 100%,40% 70%,20% 70%,20% 60%,40% 60%,40% 10%)"}
        return {
            "border-radius":"0px",
            "height":"200px",
            "width":"100px",
            "border-width":"0px",
            "clip-path":"polygon(50% 0%,70% 10%,70% 60%,90% 60%,90% 75%,60% 75%,60% 100%,40% 100%,40% 75%,10% 75%,10% 60%,30% 60%,30% 10%)"}
            // "clip-path":"polygon(80% 0%,80% 20%,60% 60%,80% 70%,70% 90%,50% 80%,40% 100%,20% 90%,30% 70%,10% 60%,20% 40%,40% 50%,60% 10%)"}
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
                if(player.battle.inFight==1)
                {
                    player.stat.hpnow=player.stat.hp
                    player.battle.stringstringstring=""
                    player.battle.monsterProgress=n(0)
                    player.stat.playerProgress=n(0)
                    player.battle.zhandourizhi=[]
                    re_calc(player.battle.currentLvl)
                }
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
            canClick(){return player.battle.currentLvl.add(1).lte(49)},
            onClick(){
                player.battle.currentLvl=player.battle.currentLvl.add(1)
                if(player.battle.inFight==1)
                {
                    player.stat.hpnow=player.stat.hp
                    player.battle.stringstringstring=""
                    player.battle.monsterProgress=n(0)
                    player.stat.playerProgress=n(0)
                    player.battle.zhandourizhi=[]
                    re_calc(player.battle.currentLvl)
                }
            },
        },
        "BOSS-1":
        {
            display()
            {
                return '挑战<br>Lv.50 史莱姆国王'
            },
            unlocked(){return player.battle.currentLvl.eq(49) && player.battle.kill_boss_1.eq(0)},
            style(){
               return {"width":"150px","height":"50px","min-height":"50px","border-radius":"10px"}},
            canClick(){return player.battle.currentLvl.eq(49)},
            onClick(){
                player.battle.inFight=1
                player.currentDoingProgress=1
                player.stat.hpnow=player.stat.hp
                player.battle.stringstringstring=""
                player.battle.monsterProgress=n(0)
                player.stat.playerProgress=n(0)
                player.battle.zhandourizhi=[]
                var y="slime_guowang"
                player.battle.monsterID=y
                player.battle.monsterHPmx=monster[y].hp()
                player.battle.monsterHPnow=monster[y].hp()
                player.battle.monsterATK=monster[y].atk()
                player.battle.monsterDEF=monster[y].def()
                player.battle.monsterSPD=monster[y].spd()
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
                                    ,"blank",["clickable","ADD"],"blank",["clickable","BOSS-1"],]],
        "blank",
        ["display-text",function(){return `正在${player[this.layer].currentDoingStage==1?'打怪':'找怪'}中...`}],
        ["bar","thatBar"],
        "blank",
        "blank",
        ["display-text",function(){return "<h2>怪物 : "+monster[player.battle.monsterID].name()}],
        ["display-text",function(){return `<img src="js/img/`+monster[player.battle.monsterID].src()+`.png" alt="">`+'<br>'+map_img_src[0]}],
        "blank",
        ["bar","monsterHPbar"],
        ["bar","monsterSPDbar"],
        "blank",
        ["display-text",function(){return player.battle.stringstringstring}],
        "blank",
        ["bar","playerHPbar"],
        ["bar","playerSPDbar"],
        "blank",
        ["display-text",function(){
            var s=''
            var touming=['ff','ee','dd','cc','bb','aa','99','88','77','66','55','44','33','22','11','00','00','00']
            for(var i=player.battle.zhandourizhi.length-1;i>=0;i--)
            {
                s=s+'<text style="color:#FFFFFF'+touming[Math.max(player.battle.zhandourizhi.length-1-i,0)]+'">'+(i+1)+'. '+player.battle.zhandourizhi[i]+'<br>'
            }
            return s}],
    ],
    // branches:["challenge"],
    layerShown(){return true},
})

function challenge_save()
{
    player.data.playerProgress=player.stat.playerProgress
    player.data.level=player.stat.level
    player.data.EXPneed=player.stat.EXPneed
    player.data.EXPnow=player.stat.EXPnow
    player.data.money=player.stat.money
    player.data.weapon=player.equip.weapon
    player.data.weaponCurrent=player.equip.weaponCurrent
    player.data.kill_boss_1=player.battle.kill_boss_1

    player.stat.playerProgress=n(0)
    player.stat.level=n(1)
    player.stat.EXPneed=n(10)
    player.stat.EXPnow=n(0)
    player.stat.money=n(0)
    player.equip.weapon=[]
    player.equip.weaponCurrent=[
        [1,1],
        [1,1],
        [1,1],
        [1,1],
        [1,1],
        [1,1],
        [1,1],
        [1,1],
    ]
    player.battle.kill_boss_1=n(0)
}
function challenge_load()
{
    player.stat.playerProgress=player.data.playerProgress
    player.stat.level=player.data.level
    player.stat.EXPneed=player.data.EXPneed
    player.stat.EXPnow=player.data.EXPnow
    player.stat.money=player.data.money
    player.equip.weapon=player.data.weapon
    player.equip.weaponCurrent=player.data.weaponCurrent
    player.battle.kill_boss_1=player.data.kill_boss_1

    player.data.playerProgress=n(0)
    player.data.level=n(1)
    player.data.EXPneed=n(10)
    player.data.EXPnow=n(0)
    player.data.money=n(0)
    player.data.weapon=[]
    player.data.weaponCurrent=[
        [1,1],
        [1,1],
        [1,1],
        [1,1],
        [1,1],
        [1,1],
        [1,1],
        [1,1],
    ]
    player.data.kill_boss_1=n(0)
}
function _inChallenge(x)
{
    return player.challenge.in_challenge.eq(1) && player.challenge.challenge_num[0]==x
}
function _finishChallenge(x)
{
    return player.challenge.finish_challenge[x]
}
function huanhang(s,x)
{
    var rt=''
    for(var i=0;i<s.length;i++)
    {
        if(s[i]=='<')
        {
            x--;
            x=Math.max(x,0)
            // rt=rt+'\n'
        }
    }
    for(var i=0;i<x;i++)
    {
        rt=rt+'\n'
    }
    return rt
}

addLayer("challenge",
{
    symbol: "<text style='color:black;border:solid black;border-radius:100%;border-width:5px'>├C┤",
    row: 0,
    position: 2,
    startData()
    {
        return {
            unlocked: true,
            points: new ExpantaNum(0),
            challenge_num:[0,1,2,3,4,5,6,7],
            challenge_text:[
                "挑战1 - 极速<br><br>时间流逝速度x5",
                "挑战2 - 强运<br><br>运气x5",
                "挑战3",
                "挑战4",
                "挑战5",
                "挑战6",
                "挑战7",
                "挑战8",
                "挑战9",
                "挑战10",
                "挑站11",
                "挑战12",
                "挑战13",
                "挑战14",
                "挑战15",
                "挑战16",
                "挑战17",
                "挑战18",
            ],
            complete_challenge_text:[
"<div class='kuang1'>当前选中 : 挑战1 - 极速</div><br>"
+"<div class='kuang2'>效果<br>时间流逝速度x5</div><br>"
+"<div class='kuang2'>目标<br>击败 史莱姆<text style='color:gold'>国王</text></div><br>"
+"<div class='kuang3'>奖励<br><h3>1</h3> 天赋点<br>时间流逝速度永久x1.1</div>",
"<div class='kuang1'>当前选中 : 挑战2 - 强运</div><br>"
+"<div class='kuang2'>效果<br>运气x5</div><br>"
+"<div class='kuang2'>目标<br>击败 史莱姆<text style='color:gold'>国王</text></div><br>"
+"<div class='kuang3'>奖励<br><h3>1</h3> 天赋点<br>运气永久x1.1</div>",
                "挑战3",
                "挑战4",
                "挑战5",
                "挑战6",
                "挑战7",
                "挑战8",
                "挑战9",
                "挑战10",
                "挑站11",
                "挑战12",
                "挑战13",
                "挑战14",
                "挑战15",
                "挑战16",
                "挑战17",
                "挑战18",
            ],
            finish_challenge:[
                false,false,false,false,false,false,false,false,false,false,false,false,false,false,
                false,false,false,false,false,false,false,false,false,false,false,false,false,false,
                false,false,false,false,false,false,false,false,false,false,false,false,false,false,
                false,false,false,false,false,false,false,false,false,false,false,false,false,false,
                false,false,false,false,false,false,false,false,false,false,false,false,false,false,
            ],
            in_challenge:n(0),

            choose_one_tab:false,
        }
    },
    color: "#AF9B60",
    type: "none",
    tooltip:"挑战",

    nodeStyle(){
        return {
            "border-radius":"100px",
            "border-width":"0px",
            "height":"150px",
            "width":"150px",}
            //10% 10%,90% 10%,90% 30%,80% 60%,70% 80%,50% 90%,30% 80%,20% 60%,10% 30%
    },
    update(diff)
    {
        if(player.tab=="challenge")
        {
            options.forceOneTab=true
        }
        else
        {
            options.forceOneTab=player.challenge.choose_one_tab
        }
    },
    //奇数 : 32个换行
    //偶数 : 21个换行
    //"background-color":"#AF9B60"
    clickables:
    {
        11:
        {
            display()
            {
                return '<p style="transform:rotate(0deg);font-size:12px;">'
                +player.challenge.challenge_text[player.challenge.challenge_num[0]]
                +huanhang(player.challenge.challenge_text[player.challenge.challenge_num[0]],32)
            },
            unlocked(){return true},
            style(){
               return {"width":"400px","height":"400px","min-height":"400px",
                    "clip-path":"polygon(33% 0%,66% 0%,50% 50%)",
                    "left":"0px","top":"0px",
                    "position":"relative",
                    "background-color":(player.challenge.finish_challenge[player.challenge.challenge_num[0]]?"lime":"#AF9B60")
                    // "border-color":"blue","border-width":"5px",
                }
                },
            canClick(){return false},
            onClick(){
            },
        },
        12:
        {
            display()
            {
                return '<p style="transform:rotate(45deg);font-size:16px;">'
                +player.challenge.challenge_text[player.challenge.challenge_num[1]]
                +huanhang(player.challenge.challenge_text[player.challenge.challenge_num[1]],21)
            },
            unlocked(){return true},
            style(){
               return {"width":"400px","height":"400px","min-height":"400px",
                    "clip-path":"polygon(66% 0%,100% 33%,50% 50%)",
                    "left":"-400px","top":"0px",
                    "position":"relative",
                    "background-color":(player.challenge.finish_challenge[player.challenge.challenge_num[1]]?"lime":"#AF9B60")
                    // "border-color":"blue","border-width":"5px",
                }
                },
            canClick(){return false},
            onClick(){
            },
        },
        13:
        {
            display()
            {
                return '<p style="transform:rotate(90deg);font-size:12px;">'
                +player.challenge.challenge_text[player.challenge.challenge_num[2]]
                +huanhang(player.challenge.challenge_text[player.challenge.challenge_num[2]],32)
            },
            unlocked(){return true},
            style(){
               return {"width":"400px","height":"400px","min-height":"400px",
                    "clip-path":"polygon(100% 33%,100% 66%,50% 50%)",
                    "left":"-200px","top":"-400px",
                    "position":"relative",
                    "background-color":(player.challenge.finish_challenge[player.challenge.challenge_num[2]]?"lime":"#AF9B60")
                    // "border-color":"blue","border-width":"5px",
                }
                },
            canClick(){return false},
            onClick(){
            },
        },
        14:
        {
            display()
            {
                return '<p style="transform:rotate(135deg);font-size:16px;">'
                +player.challenge.challenge_text[player.challenge.challenge_num[3]]
                +huanhang(player.challenge.challenge_text[player.challenge.challenge_num[3]],21)
            },
            unlocked(){return true},
            style(){
               return {"width":"400px","height":"400px","min-height":"400px",
                    "clip-path":"polygon(100% 66%,66% 100%,50% 50%)",
                    "left":"-400px","top":"-800px",
                    "position":"relative",
                    "background-color":(player.challenge.finish_challenge[player.challenge.challenge_num[3]]?"lime":"#AF9B60")
                    // "border-color":"blue","border-width":"5px",
                }
                },
            canClick(){return false},
            onClick(){
            },
        },
        15:
        {
            display()
            {
                return '<p style="transform:rotate(180deg);font-size:12px;">'
                +player.challenge.challenge_text[player.challenge.challenge_num[4]]
                +huanhang(player.challenge.challenge_text[player.challenge.challenge_num[4]],32)
            },
            unlocked(){return true},
            style(){
               return {"width":"400px","height":"400px","min-height":"400px",
                    "clip-path":"polygon(66% 100%,33% 100%,50% 50%)",
                    "left":"0px","top":"-800px",
                    "position":"relative",
                    "background-color":(player.challenge.finish_challenge[player.challenge.challenge_num[4]]?"lime":"#AF9B60")
                    // "border-color":"blue","border-width":"5px",
                }
                },
            canClick(){return false},
            onClick(){
            },
        },
        16:
        {
            display()
            {
                return '<p style="transform:rotate(225deg);font-size:16px;">'
                +player.challenge.challenge_text[player.challenge.challenge_num[5]]
                +huanhang(player.challenge.challenge_text[player.challenge.challenge_num[5]],21)
            },
            unlocked(){return true},
            style(){
               return {"width":"400px","height":"400px","min-height":"400px",
                    "clip-path":"polygon(33% 100%,0% 66%,50% 50%)",
                    "left":"400px","top":"-800px",
                    "position":"relative",
                    "background-color":(player.challenge.finish_challenge[player.challenge.challenge_num[5]]?"lime":"#AF9B60")
                    // "border-color":"blue","border-width":"5px",
                }
                },
            canClick(){return false},
            onClick(){
            },
        },
        17:
        {
            display()
            {
                return '<p style="transform:rotate(270deg);font-size:12px;">'
                +player.challenge.challenge_text[player.challenge.challenge_num[6]]
                +huanhang(player.challenge.challenge_text[player.challenge.challenge_num[6]],32)
            },
            unlocked(){return true},
            style(){
               return {"width":"400px","height":"400px","min-height":"400px",
                    "clip-path":"polygon(0% 66%,0% 33%,50% 50%)",
                    "left":"200px","top":"-400px",
                    "position":"relative",
                    "background-color":(player.challenge.finish_challenge[player.challenge.challenge_num[6]]?"lime":"#AF9B60")
                    // "border-color":"blue","border-width":"5px",
                }
                },
            canClick(){return false},
            onClick(){
            },
        },
        18:
        {
            display()
            {
                return '<p style="transform:rotate(315deg);font-size:16px;">'
                +player.challenge.challenge_text[player.challenge.challenge_num[7]]
                +huanhang(player.challenge.challenge_text[player.challenge.challenge_num[7]],21)
            },
            unlocked(){return true},
            style(){
               return {"width":"400px","height":"400px","min-height":"400px",
                    "clip-path":"polygon(0% 33%,33% 0%,50% 50%)",
                    "left":"400px","top":"0px",
                    "position":"relative",
                    "background-color":(player.challenge.finish_challenge[player.challenge.challenge_num[8]]?"lime":"#AF9B60")
                    // "border-color":"blue","border-width":"5px",
                }
                },
            canClick(){return false},
            onClick(){
            },
        },
        "Left":
        {
            display()
            {
                return '←'
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"20px 0 0 20px","width":"50px","height":"50px","min-height":"50px",
            
               "left":"0px","top":"-800px",
               "position":"relative",}},
            canClick(){return player.challenge.in_challenge.eq(0)},
            onClick(){
                var new_array=[]
                new_array.push(player.challenge.challenge_num[player.challenge.challenge_num.length-1])
                for(var i=0;i<player.challenge.challenge_num.length-1;i++)
                {
                    new_array.push(player.challenge.challenge_num[i])
                }
                player.challenge.challenge_num=new_array

                layerDataReset("challenge")
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
               return {"border-radius":"0 20px 20px 0","width":"50px","height":"50px","min-height":"50px",
            
               "left":"0px","top":"-800px",
               "position":"relative",
            }},
            canClick(){return player.challenge.in_challenge.eq(0)},
            onClick(){
                player.challenge.challenge_num.push(player.challenge.challenge_num[0])
                player.challenge.challenge_num.splice(0,1)
            },
        },
        "Enter":
        {
            canComplete()
            {
                if(player.challenge.challenge_num[0]==0 || player.challenge.challenge_num[0]==1)
                return player.battle.kill_boss_1.eq(1)
                return false
            },
            display()
            {
                if(player.challenge.in_challenge.eq(0))
                return "进入挑战"
                if(this.canComplete())
                {
                    return '完成挑战'
                }
                return "退出挑战"
            },
            unlocked(){return true},
            style(){
               return {
                "left":"0px","top":"-800px",
                "position":"relative",
                }
                },
            canClick(){return player.challenge.in_challenge.eq(1) || !player.challenge.finish_challenge[player.challenge.challenge_num[0]]},
            onClick(){
                if(player.challenge.in_challenge.eq(0))
                {
                    player.challenge.in_challenge=n(1)
                    challenge_save()
                }
                else
                {
                    if(this.canComplete())
                    {
                        player.challenge.finish_challenge[player.challenge.challenge_num[0]]=true
                    }
                    player.challenge.in_challenge=n(0)
                    challenge_load()
                }
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
    },

    tabFormat:{
        "挑战":{
            unlocked(){return true},
            buttonStyle(){return {"border-radius":"0px"}},
            content:[
                ["row",[["clickable",18],["clickable",11],["clickable",12],]],
                ["row",[["clickable",17],["clickable",13],]],
                ["row",[["clickable",16],["clickable",15],["clickable",14],]],
                "blank",
                ["row",[["clickable","Left"],["clickable","Enter"],["clickable","Right"],]],
                "blank",
                ["display-text",function(){
                    return player.challenge.complete_challenge_text[player.challenge.challenge_num[0]]
                },{"top":"-800px","position":"relative"}],
            ]
        },
        "天赋":{
            unlocked(){return true},
            buttonStyle(){return {"border-radius":"0px"}},
            content:[
                
            ]
        }
    },

    layerShown(){return true},
})