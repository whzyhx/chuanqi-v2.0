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
            ],
        },
    },
    row: "side",
    layerShown(){return true},
})