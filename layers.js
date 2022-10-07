// ------------ 装备轮子 -------------\\
const pinzhi=[//这个看不懂就砍死你丫的(?
    "<text style='color:grey'>破损</text>",
    "<text style='color:white'>普通</text>",
    "<text style='color:lime'>优秀</text>",
    "<text style='color:blue'>精良</text>",
    "<text style='color:magenta'>史诗</text>",
    "<text style='color:gold'>传奇</text>",
    "<text style='color:red'>神话</text>",
]
const buwei=[
    "剑",
    "护甲",
    "护手",
    "护腿",
    "靴子",
    "项链",
    "戒指",
]
const jichu=[
    [1,2,5,100],//表示不同品质的基础属性 , 同时属性收到装备等级影响 , (数值未填充)
    [1,2,5,100],//对了 , 不同装备应该有不同侧重点
    [1,2,5,100],//后面再说
    [1,2,5,100],
    [1,2,5,100],
    [1,2,5,100],
    [1,2,5,100],
]
const cizhui=[
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
function getCiZhui()
{
    var xx=n(0).add(Math.random())
    xx=xx.mul(cizhui.length).floor()
    return xx
}
function summon()
{
    var data=[]
    var cizhuiku=[]
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
    if(x.lte(0.000001))name=name+pinzhi[6]
    else if(x.lte(0.000009))name=name+pinzhi[5]
    else if(x.lte(0.00009))name=name+pinzhi[4]
    else if(x.lte(0.0009))name=name+pinzhi[3]
    else if(x.lte(0.009))name=name+pinzhi[2]
    else if(x.lte(0.09))name=name+pinzhi[1]
    else name=name+pinzhi[0]
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
            pos=getCiZhui()
            name=name+cizhui[pos][0]+'的'
            cizhuiku.push(pos)
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
            pos=getCiZhui()
            name=name+cizhui[pos][0]+'的'
            cizhuiku.push(pos)
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
            pos=getCiZhui()
            name=name+cizhui[pos][0]+'的'
            cizhuiku.push(pos)
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
            pos=getCiZhui()
            name=name+cizhui[pos][0]+'的'
            cizhuiku.push(pos)
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
            pos=getCiZhui()
            name=name+cizhui[pos][0]+'的'
            cizhuiku.push(pos)
        }
    }
    var xx=n(0).add(Math.random())//随机部位
    xx=xx.mul(buwei.length).floor()
    name=name+buwei[xx]
    data.push(name)
    //计算装备属性区域
    data.push(1)
    data.push(2)
    data.push(5)
    data.push(10)
    /////////////////
    data.push(cizhuiku)
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
        s+=cizhui[data[5][i]][0]+' : '+cizhui[data[5][i]][1]+'<br>'
    }
    return s
}
// ------------ END -------------\\
addLayer("data",
{
    symbol: "M",
    position: 0,
    startData()
    {
        return{
            unlocked: true,
            points: new ExpantaNum(0),
            att:two,
            def:one,
            hp:n(10),
            spd:n(1000),
        }
    },
    color: "white",
    resource: "重置点",
    type: "normal",
    requires:new ExpantaNum(10),
    exponent:1,
    baseAmount()
    {
        return zero
    },
    baseResource:"点数",
    gainMult()
    {
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp()
    {
        var exp = new ExpantaNum(1)
        return exp
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
                        return '<text style="color:#FF000099">攻击 : </text><text style="color:#FF0000">'+format(player.data.att)+'</text>'
                    },
                    { "color": "white", "font-size": "32px",}
                ],
                ["display-text",
                    function() {
                        return '<text style="color:#0000FF99">防御 : </text><text style="color:#0000FF">'+format(player.data.def)+'</text>'
                    },
                    { "color": "white", "font-size": "32px",}
                ],
                ["display-text",
                    function() {
                        return '<text style="color:#00FF0099">生命 : </text><text style="color:#00FF00">'+format(player.data.hp)+'</text>'
                    },
                    { "color": "white", "font-size": "32px",}
                ],
                ["display-text",
                    function() {
                        return '<text style="color:#FF00FF99">速度 : </text><text style="color:#FF00FF">'+format(player.data.spd)+'</text>'
                    },
                    { "color": "white", "font-size": "32px",}
                ],
                ["display-text",
                    function() {
                        var s=''
                        for(var i=0;i<7;i++)
                        {
                            s+=pinzhi[i]
                            s+='<br>'
                        }
                        return s
                    },
                    { "color": "white", "font-size": "32px",}
                ],
                ["display-text",
                    function() {
                        return output(summon())
                    },
                    { "color": "white", "font-size": "32px",}
                ],
            ],
        },
    },
    row: "side",
    layerShown(){return true},
})