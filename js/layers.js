const quality=[
    "<text style='color:grey'>破损的</text>",
    "<text style='color:white'>普通的</text>",
    "<text style='color:lime'>优秀的</text>",
    "<text style='color:lightblue'>精良的</text>",
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
    ["<text style='color:lightblue'>力量IV" , "攻击+40%"],
    ["<text style='color:magenta'>力量V","攻击+50%"],
    ["<text style='color:gold'>力量VI" , "攻击+60%"],
    ["<text style='color:red'>力量VII" , "攻击+70%"],

    ["<text style='color:grey'>强壮I"  , "生命+10%"],
    ["<text style='color:white'>强壮II" ,"生命+20%"],
    ["<text style='color:lime'>强壮III" ,"生命+30%"],
    ["<text style='color:lightblue'>强壮IV" , "生命+40%"],
    ["<text style='color:magenta'>强壮V","生命+50%"],
    ["<text style='color:gold'>强壮VI" , "生命+60%"],
    ["<text style='color:red'>强壮VII" , "生命+70%"],

    ["<text style='color:grey'>韧性I"  , "防御+10%"],
    ["<text style='color:white'>韧性II" ,"防御+20%"],
    ["<text style='color:lime'>韧性III" ,"防御+30%"],
    ["<text style='color:lightblue'>韧性IV" , "防御+40%"],
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
//[名字,部位,att,def,hp,spd,[ , , ],level,quality]
const sell_price=[1,5,15,50,150,500,1500]
function getAffix(){
    var xx=n(0).add(Math.random())
    xx=xx.mul(affix.length).floor()
    return xx
}
function summon(baolv){
    var data=[]
    var affixku=[]
    var x=n(0).add(Math.random())//随机品质
    // x=n(0.0000000001) // 匿名专属爆率 , ajchen不许用(?)
    x=x.div(player.stat.luck).div(baolv)
    var which=0
    var name=''
    for(var i=0;i<possibility.length;i++){
        if(x.lte(possibility[i])){
            name=quality[i]
            which=i
        }
    }
    if(player.stat.guolv[which]){
        player.stat.money=player.stat.money.add(sell_price[which])
        return 1
    }
    var xxx=n(0).add(Math.random())//随机词缀
    var xxxx=n(which)
    for(var i=0;i<5;i++){
        var gailv=affixPoss[xxxx][i]
        if(xxx.lte(gailv)){
            pos=getAffix()
            name=name+affix[pos][0]+'的</text>'
            affixku.push(pos)
        }
    }
    var xx=n(0).add(Math.random())//随机部位
    xx=xx.mul(part.length).floor()
    name=name+part[xx]
    data.push(name)
    data.push(xx)
    //计算装备等级对属性的影响
    var mult=n(1.05).pow(player.battle.currentLvl.sub(1))
    for(var i=0;i<4;i++){
        if(i==3)mult=n(1)
        data.push(n(base[i].mul(quality_base[xxxx]).mul(part_base[xx][i])).mul(mult))
    }
    /////////////////
    data.push(affixku)
    data.push(player.battle.currentLvl)
    data.push(xxxx)
    return data
}
function output(data){
    var s='<h2>LV.'+format(data[7])+' '
    s+=data[0]
    s+='</h2><br>'
    var xxx=n(data[1])
    s+='部位 : '+part[xxx]
    s+='<br><h1>─────────────</h1><br><h2>'
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

function auto_sell(which){
    var newWeapon=[]
    var gain=n(0)
    for(var i=0;i<player.equip.weapon.length;i++){
        if(n(player.equip.weapon[i][8]).eq(which)) gain=gain.add(sell_price[which])
        else{
            newWeapon.push(player.equip.weapon[i])
        }
    }
    player.equip.weapon=newWeapon
    player.stat.money=player.stat.money.add(gain)
}
addLayer("data",{
    startData(){
        return{
            unlocked: true,
            points: new ExpantaNum(0),
            hp:n(10),
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
addLayer("stat",{
    symbol: "<h2>M",
    position: 0,
    startData(){
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

            guolv:[false,false,false,false,false,false,false,false,false],

            playerFaProgress:n(0),
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
            for(var i=0;i<7;i++){
                if(n(player.equip.weaponCurrent[i].length).lte(3)) continue
                result=result.add(player.equip.weaponCurrent[i][2])
                //计算词缀对属性的影响
                for(var j=0;j<player.equip.weaponCurrent[i][6].length;j++){
                    if(player.equip.weaponCurrent[i][6][j].array[0]>=0 && player.equip.weaponCurrent[i][6][j].array[0]<=6)
                        mult=mult.mul(n(player.equip.weaponCurrent[i][6][j].array[0]).mul(0.1).add(1.1))
                }
            }
            if(HAS(5))mult=mult.mul(1.2)
            if(HAS(4))mult=mult.mul(1.5)
            player.stat.atk=result.mul(mult)//返回
        },
        def(){
            var base = n(0)
            var result = base
            var mult=n(1)
            for(var i=0;i<7;i++){
                if(n(player.equip.weaponCurrent[i].length).lte(3)) continue
                result=result.add(player.equip.weaponCurrent[i][3])
                //计算词缀对属性的影响
                for(var j=0;j<player.equip.weaponCurrent[i][6].length;j++){
                    if(player.equip.weaponCurrent[i][6][j].array[0]>=14 && player.equip.weaponCurrent[i][6][j].array[0]<=20)
                        mult=mult.mul(n(player.equip.weaponCurrent[i][6][j].array[0]-13).mul(0.1).add(1.1))
                }
            }
            if(HAS(3))mult=mult.mul(1.3)
            if(HAS(12))mult=mult.mul(1.5)
            player.stat.def=result.mul(mult)//返回
        },
        hp(){
            var base = n(10)
            var result = base
            var mult=n(1)
            for(var i=0;i<7;i++){
                if(n(player.equip.weaponCurrent[i].length).lte(3)) continue
                result=result.add(player.equip.weaponCurrent[i][4])
                //计算词缀对属性的影响
                for(var j=0;j<player.equip.weaponCurrent[i][6].length;j++){
                    if(player.equip.weaponCurrent[i][6][j].array[0]>=7 && player.equip.weaponCurrent[i][6][j].array[0]<=13)
                        mult=mult.mul(n(player.equip.weaponCurrent[i][6][j].array[0]-6).mul(0.1).add(1.1))
                }
            }
            if(HAS(3))mult=mult.mul(1.3)
            player.stat.hp=result.mul(mult)//返回
        },
        spd(){
            var base = n(1000)
            if(HAS(5))base=base.add(500)
            if(HAS(13))base=base.add(200)
            var result = base
            for(var i=0;i<7;i++){
                if(n(player.equip.weaponCurrent[i].length).lte(3)) continue
                result=result.add(player.equip.weaponCurrent[i][5])
            }
            player.stat.spd=result
        },
        luck(){
            var base = n(1)
            var result = base  
            if(_inChallenge(1)) result=result.mul(5)
            else if(_inChallenge(2)) result=result.mul(0.7)
            else if(_inChallenge(7)) result=result.mul(1000000)
            if(_finishChallenge(1))result=result.mul(1.1)
            if(HAS(2))result=result.mul(3)
            player.stat.luck=result
        },
    },
    clickables:{
        "Sell 0":{
            display(){return '一键卖出<br>'+quality[0]},
            unlocked(){return true},
            style(){return {"border-radius":"0px","width":"100px","height":"100px","min-height":"100px","background-color":"orange"}},
            canClick(){return true},
            onClick(){auto_sell(0)},
        },
        "Sell 1":{
            display(){return '一键卖出<br>'+quality[1]},
            unlocked(){return true},
            style(){return {"border-radius":"0px","width":"100px","height":"100px","min-height":"100px","background-color":"orange"}},
            canClick(){return true},
            onClick(){auto_sell(1)},
        },
        "Sell 2":{
            display(){return '一键卖出<br>'+quality[2]},
            unlocked(){return true},
            style(){return {"border-radius":"0px","width":"100px","height":"100px","min-height":"100px","background-color":"orange"}},
            canClick(){return true},
            onClick(){auto_sell(2)},
        },
        "Sell 3":{
            display(){return '一键卖出<br>'+quality[3]},
            unlocked(){return true},
            style(){return {"border-radius":"0px","width":"100px","height":"100px","min-height":"100px","background-color":"orange"}},
            canClick(){return true},
            onClick(){auto_sell(3)},
        },
        "Sell 4":{
            display(){return '一键卖出<br>'+quality[4]},
            unlocked(){return true},
            style(){return {"border-radius":"0px","width":"100px","height":"100px","min-height":"100px","background-color":"orange"}},
            canClick(){return true},
            onClick(){auto_sell(4)},
        },
        "Sell 5":{
            display(){return '一键卖出<br>'+quality[5]},
            unlocked(){return true},
            style(){return {"border-radius":"0px","width":"100px","height":"100px","min-height":"100px","background-color":"orange"}},
            canClick(){return true},
            onClick(){auto_sell(5)},
        },
        "Sell 6":{
            display(){return '一键卖出<br>'+quality[6]},
            unlocked(){return true},
            style(){return {"border-radius":"0px","width":"100px","height":"100px","min-height":"100px","background-color":"orange"}},
            canClick(){return true},
            onClick(){auto_sell(6)},
        },
        "AutoSell 0":{
            display(){return '自动卖出<br>'+quality[0]+'<br><br>'+(player.stat.guolv[0]?'启用':"禁用")},
            unlocked(){return true},
            style(){return {"border-radius":"0px","width":"100px","height":"100px","min-height":"100px","background-color":"orange"}},
            canClick(){return true},
            onClick(){player.stat.guolv[0]=!player.stat.guolv[0]},
        },
        "AutoSell 1":{
            display(){return '自动卖出<br>'+quality[1]+'<br><br>'+(player.stat.guolv[1]?'启用':"禁用")},
            unlocked(){return true},
            style(){return {"border-radius":"0px","width":"100px","height":"100px","min-height":"100px","background-color":"orange"}},
            canClick(){return true},
            onClick(){player.stat.guolv[1]=!player.stat.guolv[1]},
        },
        "AutoSell 2":{
            display(){return '自动卖出<br>'+quality[2]+'<br><br>'+(player.stat.guolv[2]?'启用':"禁用")},
            unlocked(){return true},
            style(){return {"border-radius":"0px","width":"100px","height":"100px","min-height":"100px","background-color":"orange"}},
            canClick(){return true},
            onClick(){player.stat.guolv[2]=!player.stat.guolv[2]},
        },
        "AutoSell 3":{
            display(){return '自动卖出<br>'+quality[3]+'<br><br>'+(player.stat.guolv[3]?'启用':"禁用")},
            unlocked(){return true},
            style(){return {"border-radius":"0px","width":"100px","height":"100px","min-height":"100px","background-color":"orange"}},
            canClick(){return true},
            onClick(){player.stat.guolv[3]=!player.stat.guolv[3]},
        },
        "AutoSell 4":{
            display(){return '自动卖出<br>'+quality[4]+'<br><br>'+(player.stat.guolv[4]?'启用':"禁用")},
            unlocked(){return true},
            style(){return {"border-radius":"0px","width":"100px","height":"100px","min-height":"100px","background-color":"orange"}},
            canClick(){return true},
            onClick(){player.stat.guolv[4]=!player.stat.guolv[4]},
        },
        "AutoSell 5":{
            display(){return '自动卖出<br>'+quality[5]+'<br><br>'+(player.stat.guolv[5]?'启用':"禁用")},
            unlocked(){return true},
            style(){return {"border-radius":"0px","width":"100px","height":"100px","min-height":"100px","background-color":"orange"}},
            canClick(){return true},
            onClick(){player.stat.guolv[5]=!player.stat.guolv[5]},
        },
        "AutoSell 6":{
            display(){return '自动卖出<br>'+quality[6]+'<br><br>'+(player.stat.guolv[6]?'启用':"禁用")},
            unlocked(){return true},
            style(){return {"border-radius":"0px","width":"100px","height":"100px","min-height":"100px","background-color":"orange"}},
            canClick(){return true},
            onClick(){player.stat.guolv[6]=!player.stat.guolv[6]},
        },
    },
    tabFormat:{
        "属性":{
            buttonStyle(){return {"border-radius":"0px"}},
            content:[
                "blank",
                ["display-text",function(){return '<text style="color:#FF0000">攻击 : '+format(player[this.layer].atk)+'</text>'},{"font-size": "32px",}],
                ["display-text",function(){return '<text style="color:lightblue">防御 : '+format(player[this.layer].def)+'</text>'},{"font-size": "32px",}],
                ["display-text",function(){return '<text style="color:#00FF00">生命 : '+format(player[this.layer].hp)+'</text>'},{"font-size": "32px",}],
                ["display-text",function(){return '<text style="color:#FF00FF">速度 : '+format(player[this.layer].spd)+'</text>'},{"font-size": "32px",}],
                ["display-text",function(){return '<text style="color:#FFFF00">幸运 : '+format(player[this.layer].luck)+'</text>'},{"font-size": "32px",}],
            ],
        },
        "选项":{
            buttonStyle(){return {"border-radius":"0px"}},
            content:[
                "blank",
                ["row",[["clickable","Sell 0"],["clickable","Sell 1"],["clickable","Sell 2"]
                ,["clickable","Sell 3"],["clickable","Sell 4"],["clickable","Sell 5"],["clickable","Sell 6"],]],
                "blank",
                "blank",
                ["row",[["clickable","AutoSell 0"],["clickable","AutoSell 1"],["clickable","AutoSell 2"]
                ,["clickable","AutoSell 3"],["clickable","AutoSell 4"],["clickable","AutoSell 5"],["clickable","AutoSell 6"],]]
            ],
        },
        "说明":{
            buttonStyle(){return {"border-radius":"0px"}},
            content:[
                ["display-text",function(){
                    return "<h1>欢迎来到 传奇-v2.0</h1>"
                    +"<br><br>上一款 传奇-v1.0 由于质量过差 , 已被废弃<br>网址 : https://whzyhx.github.io/Ni-Ming/"
                    +"<br><br>本游戏打怪是全程自动的 , 只需要手动调整等级<br>*可以长按快速调整等级*<br>(其中 , 找怪需要花费5秒的时间)"
                    +"<br>爆出的装备有以下品质"
                    +"<br><br>"+quality[0]+" : 概率 90%"
                    +"<br>"+quality[1]+" : 概率 9%"
                    +"<br>"+quality[2]+" : 概率 0.9%"
                    +"<br>"+quality[3]+" : 概率 0.09%"
                    +"<br>"+quality[4]+" : 概率 0.009%"
                    +"<br>"+quality[5]+" : 概率 0.0009%"
                    +"<br>"+quality[6]+" : 概率 0.00009%"
                    +"<br><br>但这是初始爆率 , 最后的概率还会乘上你的幸运"
                    +"<br>同时怪物的种类也会影响爆率 (例如 , 史莱姆精英会让你爆率x10)"
                    +"<br><br>挑战会在你10级的时候解锁"
                    +"<br>进行挑战时 , 数据会被保存 , 退出挑战后仍然是原来的进度"
                    +"<br><br>天赋系统说明 : "
                    +"<br><br>每个天赋有4种边框"
                    +"<br><text style='color:grey'>灰色</text> 未达到解锁条件"
                    +"<br><text style='color:red'>红色</text> 达到解锁条件 , 但是天赋点不足"
                    +"<br><text style='color:lightblue'>蓝色</text> 可以点亮"
                    +"<br><text style='color:gold'>金色</text> 已点亮"
                    +"<br><br><h2>*注意 : 三种职业最多只能同时激活两种*</h2>"
                }]
            ],
        },
    },
    row: "side",
    layerShown(){return true},
})
function display_weapon(which){
    if(n(player.equip.weaponCurrent[which].length).lte(3))return '<text style="color:white"><h1>'+"无"+'</h1></text><br>'
    return '<text style="color:white">'+output(player.equip.weaponCurrent[which])+'</text>'
}
addLayer("equip",{
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

            weaponSizeMax:n(200),
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
        
        var x=n(1)
        if(_inChallenge(0))x=n(5)
        else if(_inChallenge(2))x=n(0.7)
        else if(_inChallenge(7))x=n(10)
        if(_finishChallenge(0))x=x.mul(1.1)
        player.devSpeed=x

        var xx=n(200)
        if(_inChallenge(3))xx=n(10)
        if(_finishChallenge(3))xx=xx.add(200)
        player.equip.weaponSizeMax=xx
    },
    clickables:{
        "Left":{
            display(){return '←'},
            unlocked(){return true},
            style(){return {"border-radius":"20px 0 0 20px","width":"50px","height":"50px","min-height":"50px",}},
            canClick(){return player.equip.currentPage.gt(1)},
            onClick(){player.equip.currentPage=player.equip.currentPage.sub(1)},
        },
        "Right":{
            display(){return '→'},
            unlocked(){return true},
            style(){return {"border-radius":"0 20px 20px 0","width":"50px","height":"50px","min-height":"50px",}},
            canClick(){return player.equip.currentPage.lt(player.equip.maxPage)},
            onClick(){player.equip.currentPage=player.equip.currentPage.add(1)},
        },
        "Now":{
            display(){
                var s='<h1>当前的</h1><br><br>'
                var l=player.equip.currentID
                if(n(player.equip.weapon.length).lte(l) || n(player.equip.weapon[l].length).lte(1))return "<text style='color:white'><h1>"+"无"
                return "<text style='color:white'>"+s+output(player.equip.weapon[l])
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",
                        "border-width":"5px","border-color":"white"}},
            canClick(){return false},
            onClick(){},
        },
        "Player":{
            display(){
                var s='<h1>穿戴中</h1><br><br>'
                var l=player.equip.currentID
                if(n(player.equip.weapon.length).lte(l))return "<text style='color:white'><h1>"+"无"
                var x=n(player.equip.weapon[l][1])
                if(n(player.equip.weaponCurrent[x].length).lte(3))return "<text style='color:white'><h1>"+"无"
                return "<text style='color:white'>"+s+output(player.equip.weaponCurrent[x])
            },
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",
                        "border-width":"5px","border-color":"white"}},
            canClick(){return false},
            onClick(){},
        },
        "Equip":{
            display(){return '装备<br>'+format(player.equip.currentPage)+' / '+format(player.equip.maxPage)},
            unlocked(){return true},
            style(){return {"border-radius":"20px 20px 0 0","width":"100px","height":"75px","min-height":"75px",}},
            canClick(){return true},
            onClick(){
                var l=player.equip.currentID
                if(n(player.equip.weapon.length).lte(l)) return
                var x=n(player.equip.weapon[l][1])
                if(n(player.equip.weaponCurrent[x].length).lte(3)){
                    player.equip.weaponCurrent[x]=player.equip.weapon[l]
                    player.equip.weapon.splice(l,1)
                    return
                }
                var tmp=player.equip.weapon[l]
                player.equip.weapon[l]=player.equip.weaponCurrent[x]
                player.equip.weaponCurrent[x]=tmp
            },
        },
        "Sell":{
            GAIN(){
                var x=n(0)
                var l=player.equip.currentID
                if(n(player.equip.weapon.length).gt(l)){
                    var xx=n(player.equip.weapon[l][8])
                    x=n(sell_price[xx])
                }
                return x
            },
            display(){return '卖出<br>获得 '+format(this.GAIN())+' 金币'},
            unlocked(){return true},
            style(){return {"border-radius":"0 0 20px 20px","width":"100px","height":"75px","min-height":"75px",}},
            canClick(){return true},
            onClick(){
                var l=player.equip.currentID
                if(n(player.equip.weapon.length).lte(l)) return
                player.stat.money=player.stat.money.add(this.GAIN())
                player.equip.weapon.splice(l,1)
            },
        },
        "Weapon-0":{
            display(){return display_weapon(0)},
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",
               "border-width":"5px","border-color":"white"}},
            canClick(){return false},
            onClick(){},
        },
        "Weapon-1":{
            display(){return display_weapon(1)},
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",
               "border-width":"5px","border-color":"white"}},
            canClick(){return false},
            onClick(){},
        },
        "Weapon-2":{
            display(){return display_weapon(2)},
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",
               "border-width":"5px","border-color":"white"}},
            canClick(){return false},
            onClick(){},
        },
        "Weapon-3":{
            display(){return display_weapon(3)},
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",
               "border-width":"5px","border-color":"white"}},
            canClick(){return false},
            onClick(){},
        },
        "Weapon-4":{
            display(){return display_weapon(4)},
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",
               "border-width":"5px","border-color":"white"}},
            canClick(){return false},
            onClick(){},
        },
        "Weapon-5":{
            display(){return display_weapon(5)},
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",
               "border-width":"5px","border-color":"white"}},
            canClick(){return false},
            onClick(){},
        },
        "Weapon-6":{
            display(){return display_weapon(6)},
            unlocked(){return true},
            style(){
               return {"border-radius":"0px","width":"200px","height":"300px","min-height":"300px","background-color":"black","transition-duration":"0s",
               "border-width":"5px","border-color":"white"}},
            canClick(){return false},
            onClick(){},
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
            if(n(player.equip.weapon.length).lte(idd)) return false
            return true
        },
        getStyle(data,id){
            var x=n(id/100).floor(),y=n(id%100)
            var idd=x.sub(1).mul(5).add(y).sub(1).add(player.equip.currentPage.sub(1).mul(50))
            if(player.equip.currentID.eq(idd))
                return {"height":"50px","min-height":"50px","width":"150px","background-color":"rgb(205,185,39)","border-radius":"0px","transition-duration":"0s"}
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
            if(n(player.equip.weapon.length).lte(idd)) return ''
            return '<text style="color:white">'+'LV.'+format(player.equip.weapon[idd][7])+' '+player.equip.weapon[idd][0]
        },
    },
    tabFormat:{
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
                ["blank",["8px","400px"]],
            ],
        },
        "背包":{
            buttonStyle(){return {"border-radius":"0px"}},
            content:[
                "blank",
                ["row",[["clickable","Now"],
                        "blank",
                        "blank",
                        "blank",
                        ["clickable","Left"],
                        ["column",[["clickable","Equip"],["clickable","Sell"],]],
                        ["clickable","Right"],
                        "blank",
                        "blank",
                        "blank",
                        ["clickable","Player"],]],
                "blank",
                "blank",
                "blank",
                "blank",
                ["display-text",function(){return '<h2>背包容量 '+format(player.equip.weapon.length)+' / '+format(player.equip.weaponSizeMax)}],
                ["blank",["8px","400px"]],
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
function re_calc(lvl,is_teshu,namE){//重新生成怪物属性
    player.stat.hpnow=player.stat.hp
    player.battle.stringstringstring=""
    player.battle.monsterProgress=n(0)
    player.stat.playerProgress=n(0)
    player.stat.playerFaProgress=n(0)
    player.battle.zhandourizhi=[]

    var level=n(lvl)
    var canSummon=[]

    for(i in monster)if(monster[i].unlocked())canSummon.push(i)

    var x=n(0).add(Math.random()).mul(canSummon.length).floor()
    var y=canSummon[x]
    if(is_teshu==1)y=namE
    player.battle.monsterID=y
    player.battle.monsterHPmx=monster[y].hp()
    player.battle.monsterHPnow=monster[y].hp()
    player.battle.monsterATK=monster[y].atk()
    player.battle.monsterDEF=monster[y].def()
    player.battle.monsterSPD=monster[y].spd()
    return
}
function beiAttack(){
    var xxx=n(0).add(Math.random())
    if(xxx.lt(0.2) && HAS(12)){
        player.battle.zhandourizhi.push(
            monster[player.battle.monsterID].name()+' 对 你 造成了 <text style="color:red">'
            +format(0)+'</text> 伤害 (被格挡)')
        return
    }
    player.battle.monsterProgress=n(0)
    player.stat.hpnow=player.stat.hpnow.sub(player.battle.monsterATK.sub(player.stat.def).max(0)).max(0)
    player.battle.zhandourizhi.push(
        monster[player.battle.monsterID].name()+' 对 你 造成了 <text style="color:red">'
        +format(player.battle.monsterATK.sub(player.stat.def).max(0))+'</text> 伤害')
}
function Attack(){
    if(HAS(11)){//恢复术
        var xxxxx=player.stat.hpnow
        player.stat.hpnow=player.stat.hpnow.add(player.stat.hp.mul(0.05)).min(player.stat.hp)
        player.battle.zhandourizhi.push(
            '你 使用 <text style="color:lime">恢复术 </text>恢复了 <text style="color:lime">'
            +format(player.stat.hpnow.sub(xxxxx))+'</text> 血量')
    }
    player.stat.playerProgress=n(0)
    player.battle.monsterHPnow=player.battle.monsterHPnow.sub(player.stat.atk.sub(player.battle.monsterDEF).max(0)).max(0)
    player.battle.zhandourizhi.push(
        '你 对 '+monster[player.battle.monsterID].name()+' 造成了 <text style="color:red">'
        +format(player.stat.atk.sub(player.battle.monsterDEF).max(0))+'</text> 伤害')
    if(HAS(8)){//淬毒
        player.battle.monsterHPnow=player.battle.monsterHPnow.sub(player.stat.atk.mul(0.3)).max(0)
        player.battle.zhandourizhi.push(
            '弓箭上的<text style="color:pink">毒</text> 对 '+monster[player.battle.monsterID].name()+' 造成了 <text style="color:red">'
            +format(player.stat.atk.mul(0.3))+'</text> 伤害')
    }
    if(HAS(7)){//双发弓手
        player.battle.monsterHPnow=player.battle.monsterHPnow.sub(player.stat.atk.sub(player.battle.monsterDEF).max(0)).max(0)
        player.battle.zhandourizhi.push(
            '另一支弓箭 对 '+monster[player.battle.monsterID].name()+' 造成了 <text style="color:red">'
            +format(player.stat.atk.sub(player.battle.monsterDEF).max(0))+'</text> 伤害')
        if(HAS(8)){//淬毒
            player.battle.monsterHPnow=player.battle.monsterHPnow.sub(player.stat.atk.mul(0.3)).max(0)
            player.battle.zhandourizhi.push(
                '另一支弓箭上的<text style="color:pink">毒</text> 对 '+monster[player.battle.monsterID].name()+' 造成了 <text style="color:red">'
                +format(player.stat.atk.mul(0.3))+'</text> 伤害')
        }
    }
}
addLayer("battle",  {
    symbol: "<text style='color:black'>B",
    row: 0,
    position: 0,
    startData(){
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

    update(diff){//现在在干嘛
        if (player[this.layer].currentDoingProgress>=1){
            if(player.battle.inFight==0){
                if(player.battle.currentDoingStage==0){
                    player.battle.inFight=1
                    re_calc(player.battle.currentLvl)
                }
                else player[this.layer].currentDoingProgress=0
                player[this.layer].currentDoingStage=(player[this.layer].currentDoingStage+1)%2//保证事件在这两样之间循环
            }
        }
        if(player.battle.inFight==1){
            player.battle.monsterProgress=player.battle.monsterProgress.add(player.battle.monsterSPD.div(5000).mul(diff))
            if(player.battle.monsterProgress.gte(1))beiAttack()
            player.stat.playerProgress=player.stat.playerProgress.add(player.stat.spd.mul(layers.challenge.clickables["T13"].EFFECT()).div(5000).mul(diff))
            if(player.stat.playerProgress.gte(1))Attack()
            if(HAS(9) || HAS(10)){
                player.stat.playerFaProgress=player.stat.playerFaProgress.add((HAS(9)?n(0.1):n(0.5)).mul(diff))
                if(player.stat.playerFaProgress.gte(1)){
                    player.stat.playerFaProgress=n(0)
                    if(HAS(9)){
                        player.battle.monsterHPnow=player.battle.monsterHPnow.sub(player.stat.atk.mul(2).sub(player.battle.monsterDEF).max(0)).max(0)
                        player.battle.zhandourizhi.push(
                            '你 使用 <text style="color:orange">火球术</text> 对 '+monster[player.battle.monsterID].name()+' 造成了 <text style="color:red">'
                            +format(player.stat.atk.mul(2).sub(player.battle.monsterDEF).max(0))+'</text> 伤害')
                    }
                    else{
                        player.battle.monsterHPnow=player.battle.monsterHPnow.sub(player.stat.atk.mul(0.2)).max(0)
                        player.battle.zhandourizhi.push(
                            '你 使用 <text style="color:cyan">雷电术</text> 对 '+monster[player.battle.monsterID].name()+' 造成了 <text style="color:red">'
                            +format(player.stat.atk.mul(0.2))+'</text> 伤害')
                    }
                }
            }
            if(player.stat.hpnow.lte(0.001)){
                player.battle.stringstringstring="<text style='color:red'>你死了</text>"
                player.battle.inFight=0
            }
            else if(player.battle.monsterHPnow.lte(0.001)){
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
                if(n(player.equip.weapon.length).lt(player.equip.weaponSizeMax)){
                    var wea=summon(monster[player.battle.monsterID].BaoLv())
                    if(Array.isArray(wea))
                    player.equip.weapon.push(wea)
                }
                if(HAS(6) && n(player.equip.weapon.length).lt(player.equip.weaponSizeMax)){
                    var wea=summon(monster[player.battle.monsterID].BaoLv())
                    if(Array.isArray(wea))
                    player.equip.weapon.push(wea)
                }
            }
        }
        if (player[this.layer].currentDoingStage==0) player[this.layer].currentDoingProgress+=player.stat.spd.div(5000).mul(diff).toNumber()
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
    clickables:{
        "SUB":
        {
            display(){return '←'},
            unlocked(){return true},
            style(){return {"width":"50px","height":"50px","min-height":"50px",}},
            canClick(){return player.battle.currentLvl.gt(1)},
            onClick(){
                player.battle.currentLvl=player.battle.currentLvl.sub(1)
                if(player.battle.inFight==1) re_calc(player.battle.currentLvl)
            },
            onHold(){if(this.canClick())this.onClick()},
        },
        "ADD":{
            display(){return '→'},
            unlocked(){return true},
            style(){return {"width":"50px","height":"50px","min-height":"50px",}},
            canClick(){return player.battle.currentLvl.lt(49)},
            onClick(){
                player.battle.currentLvl=player.battle.currentLvl.add(1)
                if(player.battle.inFight==1) re_calc(player.battle.currentLvl)
            },
            onHold(){if(this.canClick())this.onClick()},
        },
        "BOSS-1":{
            display(){return '挑战<br>Lv.50 史莱姆国王'},
            unlocked(){return player.battle.currentLvl.eq(49) && player.battle.kill_boss_1.eq(0)},
            style(){return {"width":"150px","height":"50px","min-height":"50px","border-radius":"10px"}},
            canClick(){return player.battle.currentLvl.eq(49)},
            onClick(){re_calc(player.battle.currentLvl,1,"slime_guowang")},
        },
    },

    bars:{
        thatBar:{
            direction: RIGHT,
            width: 400,
            height: 25,
            progress(){return player[this.layer].currentDoingProgress},
            fillStyle(){return (player[this.layer].inFight==0?{"background-color":"#00FF00"}:{"background-color":"#FF0000"})},
        },
        monsterHPbar:{
            direction: RIGHT,
            width: 400,
            height: 20,
            progress(){return player.battle.monsterHPnow.div(player.battle.monsterHPmx)},
            fillStyle(){return {"background-color":"#FF0000"}},
            display(){return "HP "+format(player.battle.monsterHPnow)+' / '+format(player.battle.monsterHPmx)}
        },
        playerHPbar:{
            direction: RIGHT,
            width: 400,
            height: 20,
            progress(){return player.stat.hpnow.div(player.stat.hp)},
            fillStyle(){return {"background-color":"#FF0000"}},
            display(){return "HP "+format(player.stat.hpnow)+' / '+format(player.stat.hp)}
        },
        monsterSPDbar:{
            direction: RIGHT,
            width: 400,
            height: 20,
            progress(){return player.battle.monsterProgress},
            fillStyle(){return {"background-color":"#FFFF00"}},
            display(){return ""}
        },
        playerSPDbar:{
            direction: RIGHT,
            width: 400,
            height: 20,
            progress(){return player.stat.playerProgress},
            fillStyle(){return {"background-color":"#FFFF00"}},
            display(){return ""}
        },
        playerFashubar:{
            direction: RIGHT,
            width: 400,
            height: 20,
            unlocked(){return HAS(9) || HAS(10)},
            progress(){return player.stat.playerFaProgress},
            fillStyle(){return {"background-color":(HAS(9)?"orange":"cyan")}},
            display(){return ""}
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
        ["bar","playerFashubar"],
        "blank",
        ["display-text",function(){
            var s=''
            var touming=['ff','ee','dd','cc','bb','aa','99','88','77','66','55','44','33','22','11','00','00','00']
            for(var i=player.battle.zhandourizhi.length-1;i>=Math.max(0,player.battle.zhandourizhi.length-16);i--){
                s=s+'<text style="color:#FFFFFF'+touming[Math.max(player.battle.zhandourizhi.length-1-i,0)]+'">'+(i+1)+'. '+player.battle.zhandourizhi[i]+'<br>'
            }
            return s}],
    ],
    layerShown(){return true},
})

function challenge_save(){
    player.data.hp=player.stat.hp
    player.data.playerProgress=player.stat.playerProgress
    player.data.level=player.stat.level
    player.data.EXPneed=player.stat.EXPneed
    player.data.EXPnow=player.stat.EXPnow
    player.data.money=player.stat.money
    player.data.weapon=player.equip.weapon
    player.data.weaponCurrent=player.equip.weaponCurrent
    player.data.kill_boss_1=player.battle.kill_boss_1

    player.stat.hp=n(10)
    player.stat.hpnow=n(!0)
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
function challenge_load(){
    player.stat.hpnow=player.data.hp
    player.stat.hp=player.data.hp
    player.stat.playerProgress=player.data.playerProgress
    player.stat.level=player.data.level
    player.stat.EXPneed=player.data.EXPneed
    player.stat.EXPnow=player.data.EXPnow
    player.stat.money=player.data.money
    player.equip.weapon=player.data.weapon
    player.equip.weaponCurrent=player.data.weaponCurrent
    player.battle.kill_boss_1=player.data.kill_boss_1

    player.data.hp=n(10)
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
function _inChallenge(x){return player.challenge.in_challenge.eq(1) && player.challenge.challenge_num[0]==x}
function _finishChallenge(x){return player.challenge.finish_challenge[x]}
function HAS(x){return player.challenge.has_tianfu[x]}
function huanhang(s,x){
    var rt=''
    for(var i=0;i<s.length;i++)if(s[i]=='<')x=Math.max(x-1,0)
    for(var i=0;i<x;i++)rt=rt+'\n'
    return rt
}
function get_challenge_text(y){
    var rt=y*45,x=(y+1)%2
    return '<p style="transform:rotate('+rt+'deg);font-size:'+(x?'12px':'16px')+';">'
    +player.challenge.challenge_text[player.challenge.challenge_num[y]]
    +huanhang(player.challenge.challenge_text[player.challenge.challenge_num[y]],(x?32:21))
}
function get_challenge_style(y,ss,xpx,ypx){
    const nw={
        "width":"400px","height":"400px","min-height":"400px",
        "clip-path":ss,
        "left":xpx,"top":ypx,
        "position":"relative",
        "background-color":(player.challenge.finish_challenge[player.challenge.challenge_num[y]]?"lime":"#AF9B60")
        ,"transition-duration":"0s"
    }
    return nw
}
function get_tianfu_style(y){
    var nw={"width":"100px","height":"100px","min-height":"100px"
    ,"border-radius":"0px","border-width":"10px","border-color":"grey"}
    nw["background-image"]="url(js/tianfu/tianfu"+y+".png)"
    if(layers.challenge.clickables["T"+y].UNlock()){
        if(player.challenge.has_tianfu[y]==true)nw["border-color"]="yellow"
        else if(layers.challenge.clickables["T"+y].canBUY())nw["border-color"]="lightblue"
        else nw["border-color"]="red"
    }
    return nw
}
addLayer("challenge",{
    symbol: "<text style='color:black;border:solid black;border-radius:100%;border-width:5px'>├C┤",
    row: 0,
    position: 2,
    startData(){
        return {
            unlocked: true,
            points: new ExpantaNum(0),
            unlock_challenge:false,
            challenge_num:[0,1,2,3,4,5,6,7],
            challenge_text:[
                "挑战1 - 极速<br><br>时速x5",
                "挑战2 - 强运<br><br>运气x5",
                "挑战3 - 困难模式<br><br>时速x0.7<br>运气x0.7",
                "挑战4 - 无处存储<br><br>背包只有10格",
                "挑战5",
                "挑战6",
                "挑战7",
                "挑战8 - 外挂<br>?????<br>????<br>???<br>??<br>?",
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
"<div class='kuang' style='height:20px'>当前选中 : 挑战1 - 极速</div><br>"
+"<div class='kuang' style='height:40px'>效果<br>时速x5</div><br>"
+"<div class='kuang' style='height:40px'>目标<br>击败 史莱姆<text style='color:gold'>国王</text></div><br>"
+"<div class='kuang' style='height:60px'>奖励<br><h3>1</h3> 天赋点<br>时速永久x1.1</div>",

"<div class='kuang' style='height:20px'>当前选中 : 挑战2 - 强运</div><br>"
+"<div class='kuang' style='height:40px'>效果<br>运气x5</div><br>"
+"<div class='kuang' style='height:40px'>目标<br>击败 史莱姆<text style='color:gold'>国王</text></div><br>"
+"<div class='kuang' style='height:60px'>奖励<br><h3>1</h3> 天赋点<br>运气永久x1.1</div>",

"<div class='kuang' style='height:20px'>当前选中 : 挑战3 - 困难模式</div><br>"
+"<div class='kuang' style='height:60px'>效果<br>运气x0.7<br>时速x0.7</div><br>"
+"<div class='kuang' style='height:40px'>目标<br>击败 史莱姆<text style='color:gold'>国王</text></div><br>"
+"<div class='kuang' style='height:40px'>奖励<br><h3>2</h3> 天赋点</div>",

"<div class='kuang' style='height:20px'>当前选中 : 挑战4 - 无处存储</div><br>"
+"<div class='kuang' style='height:40px'>效果<br>背包只有10格子</div><br>"
+"<div class='kuang' style='height:40px'>目标<br>击败 史莱姆<text style='color:gold'>国王</text></div><br>"
+"<div class='kuang' style='height:60px'>奖励<br><h3>1</h3> 天赋点<br>背包格子永久+200</div>",
                "挑战5",
                "挑战6",
                "挑战7",

"<div class='kuang' style='height:40px'>当前选中 : 挑战8 - 外挂<br>应玩家要求 , 特加此项挑战</div><br>"
+"<div class='kuang' style='height:60px'>效果<br>时速x10<br>运气x1000000</div><br>"
+"<div class='kuang' style='height:40px'>目标<br>爆出 "+quality[0]+" 装备</div><br>"
+"<div class='kuang' style='height:40px'>奖励<br><h3>100</h3> 天赋点</div>",
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
            has_tianfu:[
                false,false,false,false,false,false,false,false,false,false,false,false,false,false,
                false,false,false,false,false,false,false,false,false,false,false,false,false,false,
                false,false,false,false,false,false,false,false,false,false,false,false,false,false,
                false,false,false,false,false,false,false,false,false,false,false,false,false,false,
                false,false,false,false,false,false,false,false,false,false,false,false,false,false,
            ],
            cost:[0,0,1,1,1,1,1,2,2,2,2,2,2,2],

            complete_tianfu_text:[
"",
"<div class='kuang'><h2>天赋 - 开始</h2>"
+"<br><br><i>从此踏上征途</i>"
+"<br><br>开启你的天赋树<br>花费 : 0天赋点</div>",
"<div class='kuang'><h2>天赋 - 幸运儿</h2>"
+"<br><br>你的运气有点令别人羡慕<br><text style='color:yellow'>运气x3</text><br>花费 : 1天赋点</div>",
"<div class='kuang'><h2>天赋 - 战士</h2>"
+"<br><br><i>战士守则 : 坚韧不屈 , 屹立不倒</i>"
+"<br><br>学习怎么成为一名战士<br><text style='color:lightblue'>防御x1.3</text><br><text style='color:lime'>生命x1.3</text><br>花费 : 1天赋点</div>",
"<div class='kuang'><h2>天赋 - 法师</h2>"
+"<br><br><i>法师守则 : 想在战场上活下去 , 时刻留意你的四周</i>"
+"<br><br>学习怎么成为一名法师<br><text style='color:red'>攻击x1.5</text><br>花费 : 1天赋点</div>",
"<div class='kuang'><h2>天赋 - 弓手</h2>"
+"<br><br><i>弓手守则 : 敏捷 , 隐蔽</i>"
+"<br><br>学习怎么成为一名弓手<br><text style='color:red'>攻击x1.2</text><br><text style='color:magenta'>初始速度+500</text><br>花费 : 1天赋点</div>",
"<div class='kuang'><h2>天赋 - 买一送一</h2>"
+"<br><br><i>当你捡起一件装备时 , 惊奇的发现地上还有一件</i>"
+"<br><br>你的运气已经不能用好来形容了<br>现在每只怪物掉落两件装备<br>花费 : 1天赋点</div>",
"<div class='kuang'><h2>弓手专属天赋 - 双发弓手</h2>"
+"<br><br>现在你攻击一次 , 可以发出两支箭<br><text style='color:red'>攻击x0.75</text><br><text style='color:magenta'>速度x0.8</text><br>额外射出一支弓箭<br>花费 : 2天赋点</div>",
"<div class='kuang'><h2>弓手专属天赋 - 淬毒</h2>"
+"<br><br>你的弓箭被淬上了毒<br><text style='color:pink'>每次攻击额外造成 30% 攻击的真实毒伤</text><br>花费 : 2天赋点</div>",
"<div class='kuang'><h2>法师专属天赋 - 火球术</h2>"
+"<br><br>你学会了法术 - 火球 !<br>你每10秒可以发射一枚火球<br>火球造成的伤害=<text style='color:red'>200%攻击</text>-<text style='color:lightblue'>敌人防御</text><br>花费 : 2天赋点</div>",
"<div class='kuang'><h2>法师专属天赋 - 雷电术</h2>"
+"<br><br>你学会了法术 - 雷电 !<br>你每2秒可以释放一道闪电<br>雷电造成的伤害=<text style='color:red'>25%攻击</text><br>花费 : 2天赋点</div>",
"<div class='kuang'><h2>法师专属天赋 - 恢复术</h2>"
+"<br><br>你学会了法术 - 恢复 !<br>每次攻击恢复 <text style='color:lime'>5%最大生命值</text><br>花费 : 2天赋点</div>",
"<div class='kuang'><h2>战士专属天赋 - 盾牌</h2>"
+"<br><br><i>坚如磐石</i>"
+"<br><br>左手持剑 , 右手持盾<br><text style='color:lightblue'>防御x1.5</text><br>你有20%的概率格挡住敌人的攻击<br>花费 : 2天赋点</div>",
"<div class='kuang'><h2>战士专属天赋 - 狂战士</h2>"
+"<br><br><i><text style='color:red'>嗜血</text></i>"
+"<br><br>失去的血量越多 , 攻速越高<br><text style='color:magenta'>初始速度+200</text><br>花费 : 2天赋点</div>",
            ],
            choose_tianfu_id:1,
            tianfudianMax:n(0),tianfudianNow:n(0),

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
    update(diff){
        if(player.stat.level.gte(10))player.challenge.unlock_challenge=true

        if(player.tab=="challenge")options.forceOneTab=true
        else options.forceOneTab=player.challenge.choose_one_tab

        //计算天赋点
        player.challenge.tianfudianMax=n(0)
        if(_finishChallenge(0))player.challenge.tianfudianMax=player.challenge.tianfudianMax.add(1)
        if(_finishChallenge(1))player.challenge.tianfudianMax=player.challenge.tianfudianMax.add(1)
        if(_finishChallenge(2))player.challenge.tianfudianMax=player.challenge.tianfudianMax.add(2)
        if(_finishChallenge(3))player.challenge.tianfudianMax=player.challenge.tianfudianMax.add(1)

        player.challenge.challenge_text=[
            "挑战1 - 极速<br><br>时速x5",
            "挑战2 - 强运<br><br>运气x5",
            "挑战3 - 困难模式<br><br>时速x0.7<br>运气x0.7",
            "挑战4 - 无处存储<br><br>背包只有10格",
            "挑战5",
            "挑战6",
            "挑战7",
            "挑战8 - 外挂<br>?????<br>????<br>???<br>??<br>?",
            "挑战9",
            "挑战10",
            "挑站11",
            "挑战12",
            "挑战13",
            "挑战14",
            "挑战15",
            "挑战16",
            "挑战17",
            "挑战18",]
        player.challenge.complete_challenge_text=[
"<div class='kuang' style='height:20px'>当前选中 : 挑战1 - 极速</div><br>"
+"<div class='kuang' style='height:40px'>效果<br>时速x5</div><br>"
+"<div class='kuang' style='height:40px'>目标<br>击败 史莱姆<text style='color:gold'>国王</text></div><br>"
+"<div class='kuang' style='height:60px'>奖励<br><h3>1</h3> 天赋点<br>时速永久x1.1</div>",

"<div class='kuang' style='height:20px'>当前选中 : 挑战2 - 强运</div><br>"
+"<div class='kuang' style='height:40px'>效果<br>运气x5</div><br>"
+"<div class='kuang' style='height:40px'>目标<br>击败 史莱姆<text style='color:gold'>国王</text></div><br>"
+"<div class='kuang' style='height:60px'>奖励<br><h3>1</h3> 天赋点<br>运气永久x1.1</div>",

"<div class='kuang' style='height:20px'>当前选中 : 挑战3 - 困难模式</div><br>"
+"<div class='kuang' style='height:60px'>效果<br>运气x0.7<br>时速x0.7</div><br>"
+"<div class='kuang' style='height:40px'>目标<br>击败 史莱姆<text style='color:gold'>国王</text></div><br>"
+"<div class='kuang' style='height:40px'>奖励<br><h3>2</h3> 天赋点</div>",

"<div class='kuang' style='height:20px'>当前选中 : 挑战4 - 无处存储</div><br>"
+"<div class='kuang' style='height:40px'>效果<br>背包只有10格子</div><br>"
+"<div class='kuang' style='height:40px'>目标<br>击败 史莱姆<text style='color:gold'>国王</text></div><br>"
+"<div class='kuang' style='height:60px'>奖励<br><h3>1</h3> 天赋点<br>背包格子永久+200</div>",
            "挑战5",
            "挑战6",
            "挑战7",

"<div class='kuang' style='height:40px'>当前选中 : 挑战8 - 外挂<br>应玩家要求 , 特加此项挑战</div><br>"
+"<div class='kuang' style='height:60px'>效果<br>时速x10<br>运气x1000000</div><br>"
+"<div class='kuang' style='height:40px'>目标<br>爆出 "+quality[0]+" 装备</div><br>"
+"<div class='kuang' style='height:40px'>奖励<br><h3>100</h3> 天赋点</div>",
            "挑战9",
            "挑战10",
            "挑站11",
            "挑战12",
            "挑战13",
            "挑战14",
            "挑战15",
            "挑战16",
            "挑战17",
            "挑战18",]
    },
    //奇数 : 32个换行
    //偶数 : 21个换行
    //"background-color":"#AF9B60"
    clickables:{
        11:{
            display(){return get_challenge_text(0)},
            unlocked(){return true},
            style(){return get_challenge_style(0,"polygon(33% 0%,66% 0%,50% 50%)","0px","0px")},
            canClick(){return false},
            onClick(){},
        },
        12:{
            display(){return get_challenge_text(1)},
            unlocked(){return true},
            style(){return get_challenge_style(1,"polygon(66% 0%,100% 33%,50% 50%)","-400px","0px")},
            canClick(){return false},
            onClick(){},
        },
        13:{
            display(){return get_challenge_text(2)},
            unlocked(){return true},
            style(){return get_challenge_style(2,"polygon(100% 33%,100% 66%,50% 50%)","-200px","-400px")},
            canClick(){return false},
            onClick(){},
        },
        14:{
            display(){return get_challenge_text(3)},
            unlocked(){return true},
            style(){return get_challenge_style(3,"polygon(100% 66%,66% 100%,50% 50%)","-400px","-800px")},
            canClick(){return false},
            onClick(){},
        },
        15:{
            display(){return get_challenge_text(4)},
            unlocked(){return true},
            style(){return get_challenge_style(4,"polygon(66% 100%,33% 100%,50% 50%)","0px","-800px")},
            canClick(){return false},
            onClick(){},
        },
        16:{
            display(){return get_challenge_text(5)},
            unlocked(){return true},
            style(){return get_challenge_style(5,"polygon(33% 100%,0% 66%,50% 50%)","400px","-800px")},
            canClick(){return false},
            onClick(){},
        },
        17:{
            display(){return get_challenge_text(6)},
            unlocked(){return true},
            style(){return get_challenge_style(6,"polygon(0% 66%,0% 33%,50% 50%)","200px","-400px")},
            canClick(){return false},
            onClick(){},
        },
        18:{
            display(){return get_challenge_text(7)},
            unlocked(){return true},
            style(){return get_challenge_style(6,"polygon(0% 33%,33% 0%,50% 50%)","400px","0px")},
            canClick(){return false},
            onClick(){},
        },
        "Left":{
            display(){return '←'},
            unlocked(){return true},
            style(){
               return {"border-radius":"20px 0 0 20px","width":"50px","height":"50px","min-height":"50px",
               "left":"0px","top":"-800px",
               "position":"relative",}},
            canClick(){return player.challenge.in_challenge.eq(0)},
            onClick(){
                var new_array=[]
                new_array.push(player.challenge.challenge_num[player.challenge.challenge_num.length-1])
                for(var i=0;i<player.challenge.challenge_num.length-1;i++){
                    new_array.push(player.challenge.challenge_num[i])
                }
                player.challenge.challenge_num=new_array
            },
        },
        "Right":{
            display(){return '→'},
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
        "Enter":{
            canComplete(){
                if(player.challenge.challenge_num[0]<=3)
                return player.battle.kill_boss_1.eq(1)
                return false
            },
            display(){
                if(player.challenge.in_challenge.eq(0))
                return "进入挑战"
                if(this.canComplete()) return '完成挑战'
                return "退出挑战"
            },
            unlocked(){return true},
            style(){return {"left":"0px","top":"-800px","position":"relative",}},
            canClick(){return player.challenge.in_challenge.eq(1) || !player.challenge.finish_challenge[player.challenge.challenge_num[0]]},
            onClick(){
                if(player.challenge.in_challenge.eq(0)){
                    player.challenge.in_challenge=n(1)
                    challenge_save()
                }
                else{
                    if(this.canComplete()) player.challenge.finish_challenge[player.challenge.challenge_num[0]]=true
                    player.challenge.in_challenge=n(0)
                    challenge_load()
                }
            },
        },
        "T1":{
            UNlock(){return true},
            canBUY(){return player.challenge.tianfudianMax.sub(player.challenge.tianfudianNow).gte(0) && this.UNlock()},
            display(){return ''},
            unlocked(){return true},
            style(){return get_tianfu_style(1)},
            canClick(){return true},
            onClick(){player.challenge.choose_tianfu_id=1},
        },
        "T2":{
            UNlock(){return HAS(1)},
            canBUY(){return player.challenge.tianfudianMax.sub(player.challenge.tianfudianNow).gte(1) && this.UNlock()},
            display(){return ''},
            unlocked(){return true},
            style(){return get_tianfu_style(2)},
            canClick(){return true},
            onClick(){player.challenge.choose_tianfu_id=2},
        },
        "T3":{
            UNlock(){return (!HAS(4) || !HAS(5)) && HAS(1)},
            canBUY(){return player.challenge.tianfudianMax.sub(player.challenge.tianfudianNow).gte(1) && this.UNlock()},
            display(){return ''},
            unlocked(){return true},
            style(){return get_tianfu_style(3)},
            canClick(){return true},
            onClick(){player.challenge.choose_tianfu_id=3},
        },
        "T4":{
            UNlock(){return (!HAS(3) || !HAS(5)) && HAS(1)},
            canBUY(){return player.challenge.tianfudianMax.sub(player.challenge.tianfudianNow).gte(1) && this.UNlock()},
            display(){return ''},
            unlocked(){return true},
            style(){return get_tianfu_style(4)},
            canClick(){return true},
            onClick(){player.challenge.choose_tianfu_id=4},
        },
        "T5":{
            UNlock(){return (!HAS(4) || !HAS(3)) && HAS(1)},
            canBUY(){return player.challenge.tianfudianMax.sub(player.challenge.tianfudianNow).gte(1) && this.UNlock()},
            display(){return ''},
            unlocked(){return true},
            style(){return get_tianfu_style(5)},
            canClick(){return true},
            onClick(){player.challenge.choose_tianfu_id=5},
        },
        "T6":{
            UNlock(){return HAS(2)},
            canBUY(){return player.challenge.tianfudianMax.sub(player.challenge.tianfudianNow).gte(1) && this.UNlock()},
            display(){return ''},
            unlocked(){return true},
            style(){return get_tianfu_style(6)},
            canClick(){return true},
            onClick(){player.challenge.choose_tianfu_id=6},
        },
        "T7":{
            UNlock(){return HAS(5)},
            canBUY(){return player.challenge.tianfudianMax.sub(player.challenge.tianfudianNow).gte(2) && this.UNlock()},
            display(){return ''},
            unlocked(){return true},
            style(){return get_tianfu_style(7)},
            canClick(){return true},
            onClick(){player.challenge.choose_tianfu_id=7},
        },
        "T8":{
            UNlock(){return HAS(5)},
            canBUY(){return player.challenge.tianfudianMax.sub(player.challenge.tianfudianNow).gte(2) && this.UNlock()},
            display(){return ''},
            unlocked(){return true},
            style(){return get_tianfu_style(8)},
            canClick(){return true},
            onClick(){player.challenge.choose_tianfu_id=8},
        },
        "T9":{
            UNlock(){return HAS(4) && !HAS(10)},
            canBUY(){return player.challenge.tianfudianMax.sub(player.challenge.tianfudianNow).gte(2) && this.UNlock()},
            display(){return ''},
            unlocked(){return true},
            style(){return get_tianfu_style(9)},
            canClick(){return true},
            onClick(){player.challenge.choose_tianfu_id=9},
        },
        "T10":{
            UNlock(){return HAS(4) && !HAS(9)},
            canBUY(){return player.challenge.tianfudianMax.sub(player.challenge.tianfudianNow).gte(2) && this.UNlock()},
            display(){return ''},
            unlocked(){return true},
            style(){return get_tianfu_style(10)},
            canClick(){return true},
            onClick(){player.challenge.choose_tianfu_id=10},
        },
        "T11":{
            UNlock(){return HAS(4)},
            canBUY(){return player.challenge.tianfudianMax.sub(player.challenge.tianfudianNow).gte(2) && this.UNlock()},
            display(){return ''},
            unlocked(){return true},
            style(){return get_tianfu_style(11)},
            canClick(){return true},
            onClick(){player.challenge.choose_tianfu_id=11},
        },
        "T12":{
            UNlock(){return HAS(3)},
            canBUY(){return player.challenge.tianfudianMax.sub(player.challenge.tianfudianNow).gte(2) && this.UNlock()},
            display(){return ''},
            unlocked(){return true},
            style(){return get_tianfu_style(12)},
            canClick(){return true},
            onClick(){player.challenge.choose_tianfu_id=12},
        },
        "T13":{
            EFFECT(){return (!HAS(13)?n(1):player.stat.hp.sub(player.stat.hpnow).div(player.stat.hp).add(1))},
            UNlock(){return HAS(3)},
            canBUY(){return player.challenge.tianfudianMax.sub(player.challenge.tianfudianNow).gte(2) && this.UNlock()},
            display(){return ''},
            unlocked(){return true},
            style(){return get_tianfu_style(13)},
            canClick(){return true},
            onClick(){player.challenge.choose_tianfu_id=13},
        },
        "ChongXi":{
            display(){return '重洗'},
            unlocked(){return true},
            style(){return {"border-radius":"20px 0 0 20px","width":"50px","height":"50px","min-height":"50px","transition-duration":"0s"}},
            canClick(){return true},
            onClick(){
                player.challenge.has_tianfu=[
                    false,false,false,false,false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,false,false,false,false,
                ]
                player.challenge.tianfudianNow=n(0)
            },
        },
        "GouMai":{
            display(){return '点亮'},
            unlocked(){return true},
            style(){return {"border-radius":"0 20px 20px 0","width":"50px","height":"50px","min-height":"50px","transition-duration":"0s"}},
            canClick(){return true},
            onClick(){
                if(HAS(player.challenge.choose_tianfu_id))return
                if(player.challenge.tianfudianMax.sub(player.challenge.tianfudianNow).lt(player.challenge.cost[player.challenge.choose_tianfu_id]))return
                if(!layers.challenge.clickables["T"+player.challenge.choose_tianfu_id].canBUY())return
                player.challenge.tianfudianNow=player.challenge.tianfudianNow.add(player.challenge.cost[player.challenge.choose_tianfu_id])
                player.challenge.has_tianfu[player.challenge.choose_tianfu_id]=true
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
                ["row",[["clickable","ChongXi"],"blank",["display-text",function(){
                    return '<h1>你有 '+format(player.challenge.tianfudianNow)+' / '+format(player.challenge.tianfudianMax)+' 天赋点'
                }],"blank",["clickable","GouMai"],]],
                "blank",
                ["display-text",function(){return player.challenge.complete_tianfu_text[player.challenge.choose_tianfu_id]}],
                "blank",
                ["column",[
                    ["row",[
                            ["clickable","T12"],
                            "blank","blank","blank",
                            ["clickable","T13"],
                    ]],
                    "blank",
                    ["row",["blank","blank","blank",
                            ["blank",["100px","17px"]],
                            "blank","blank","blank",
                            ["blank",["100px","17px"]],
                            ["clickable","T3"],
                            "blank","blank","blank",
                            ["blank",["100px","17px"]],
                            "blank","blank","blank",
                            ["clickable","T9"],
                    ]],
                    "blank",
                    ["row",[["clickable","T6"],
                            "blank","blank","blank",
                            ["clickable","T2"],
                            "blank","blank","blank",
                            ["clickable","T1"],
                            "blank","blank","blank",
                            ["clickable","T4"],
                            "blank","blank","blank",
                            ["clickable","T10"],]],
                    "blank",
                    ["row",["blank","blank","blank",
                            ["blank",["100px","17px"]],
                            "blank","blank","blank",
                            ["blank",["100px","17px"]],
                            ["clickable","T5"],
                            "blank","blank","blank",
                            ["blank",["100px","17px"]],
                            "blank","blank","blank",
                            ["clickable","T11"],
                    ]],
                    "blank",
                    ["row",[["clickable","T7"],
                            "blank","blank","blank",
                            ["clickable","T8"],]],
                ]],
            ]
        }
    },

    layerShown(){return player.challenge.unlock_challenge},
})