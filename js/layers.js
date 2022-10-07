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

    calcStats:{//在这里面计算属性
        atk(){
            var base = n(1)//看不懂砍死你丫的
            var result = base//计算
            player.stat.atk=result//返回
        },
        def(){
            var base = n(2)
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
                        return '<text style="color:#FF00FF99">幸运 : </text><text style="color:green">'+format(player[this.layer].luck)+' <br>我草匿名你上个色我不知道哪个颜色好看</text>'
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
    position: 0,
    startData()
    {
        return{
            unlocked: true,
            points: new ExpantaNum(0),
        }
    },
    color: "white",
    type: "none",

    bars:{
        thatBar:{
            
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
                        return '<text style="color:#FF00FF99">幸运 : </text><text style="color:green">'+format(player[this.layer].luck)+' <br>我草匿名你上个色我不知道哪个颜色好看</text>'
                    },
                    { "color": "white", "font-size": "32px",}
                ],
            ],
        },
    },

    row: "side",
    layerShown(){return true},
})