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
    var name=''
    if(x.lte(0.000001))name=name+quality[6]
    else if(x.lte(0.000009))name=name+quality[5]
    else if(x.lte(0.00009))name=name+quality[4]
    else if(x.lte(0.0009))name=name+quality[3]
    else if(x.lte(0.009))name=name+quality[2]
    else if(x.lte(0.09))name=name+quality[1]
    else name=name+quality[0]
    name=name+'的'
    var xxx=n(0).add(Math.random())//随机词缀
    if(x.lte(0.000001))
    {
        //神话装备
        //100%:1词缀
        //100%:2词缀
        //80%:3词缀
        //50%:4词缀
        //20%:5词缀
        var changdu=0
        if(xxx.lte(0.2))changdu=5
        else if(xxx.lte(0.5))changdu=4
        else if(xxx.lte(0.8))changdu=3
        else changdu=2
        var pos
        for(var i=0;i<changdu;i++)
        {
            pos=getAffix()
            name=name+affix[pos][0]+'的'
            affixku.push(pos)
        }
    }
    else if(x.lte(0.000009))
    {
        //传奇装备
        //100%:1词缀
        //80%:2词缀
        //60%:3词缀
        //20%:4词缀
        var changdu=0
        if(xxx.lte(0.2))changdu=4
        else if(xxx.lte(0.6))changdu=3
        else if(xxx.lte(0.8))changdu=2
        else changdu=1
        var pos
        for(var i=0;i<changdu;i++)
        {
            pos=getAffix()
            name=name+affix[pos][0]+'的'
            affixku.push(pos)
        }
    }
    else if(x.lte(0.00009))
    {
        //史诗装备
        //80%:1词缀
        //60%:2词缀
        //20%:3词缀
        var changdu=0
        if(xxx.lte(0.2))changdu=3
        else if(xxx.lte(0.6))changdu=2
        else if(xxx.lte(0.8))changdu=1
        var pos
        for(var i=0;i<changdu;i++)
        {
            pos=getAffix()
            name=name+affix[pos][0]+'的'
            affixku.push(pos)
        }
    }
    else if(x.lte(0.0009))
    {
        //精良装备
        //80%:1词缀
        //20%:2词缀
        var changdu=0
        if(xxx.lte(0.2))changdu=2
        else if(xxx.lte(0.8))changdu=1
        var pos
        for(var i=0;i<changdu;i++)
        {
            pos=getAffix()
            name=name+affix[pos][0]+'的'
            affixku.push(pos)
        }
    }
    else if(x.lte(0.009))
    {
        //优秀装备
        //50%:1词缀
        var changdu=0
        if(xxx.lte(0.5))changdu=1
        var pos
        for(var i=0;i<changdu;i++)
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
            hp:n(10),
            spd:n(1000),
            luck:one
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
            var base = n(1)
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


addLayer("battle",
{
    symbol: "b",
    row: 0,
    position: 0,
    startData()
    {
        return {
            unlocked: true,
            points: new ExpantaNum(0),
            currentDoingProgress:0,//现在干的进度
            currentDointStage:0,//现在在干啥
            //stage=0:找怪
            //stage=1:打怪
            //stage=2:捡装备
        }
    },
    color: "white",
    type: "none",
    tooltip:"战场（？",

    currentDoing(){//现在在干嘛
        if (player[this.layer].currentDoingProgress>=1){
            player[this.layer].currentDoingProgress=0
            player[this.layer].currentDoingStage=(player[this.layer].currentDoingStage+1)%3//保证事件在这三样之间循环
        }

        player[this.layer].currentDoingProgress+=0.01

        //下面开始处理！
        if (player[this.layer].currentDoingStage==0) {
            
            return ['找怪',player[this.layer].currentDoingProgress]
        }
        if (player[this.layer].currentDoingStage==1) {
            return ['打怪',player[this.layer].currentDoingProgress]
        }
        if (player[this.layer].currentDoingStage==2) {
            return ['捡装备',player[this.layer].currentDoingProgress]
        }
    },

    bars:{
        thatBar:{
            direction: RIGHT,
            width: 400,
            height: 25,
            progress() {return player[this.layer].currentDoingProgress},
        }
    },

    tabFormat:[
        ["display-text",function(){return `正在${tmp.battle.currentDoing[0]}中...`}],
        ["bar","thatBar"],
    ],

    layerShown(){return true},
})