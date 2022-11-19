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
    // x=n(0.0000000001) // 匿名专属爆率 , ajchen不许用(?)
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

function challenge_save()
{
    player.data.playerProgress=player.stat.playerProgress
    player.data.level=player.stat.level
    player.data.EXPneed=player.stat.EXPneed
    player.data.EXPnow=player.stat.EXPnow
    player.data.money=player.stat.money
    player.data.weapon=player.equip.weapon
    player.data.weaponCurrent=player.equip.weaponCurrent
    layerDataReset("stat")
    layerDataReset("equip")
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
}

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
            weapon:[],weaponCurrent:[],
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
               return {"border-radius":"20px 0 0 20px","width":"50px","height":"50px","min-height":"50px","transition-duration":"0s",}},
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
               return {"border-radius":"0 20px 20px 0","width":"50px","height":"50px","min-height":"50px","transition-duration":"0s",}},
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
               return {"border-radius":"20px","width":"100px","height":"100px","min-height":"100px","transition-duration":"0s",}},
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
            canClick(){return player.battle.currentLvl.lte(999)},
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