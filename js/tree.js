var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)


addLayer("tree-tab", {
    bars:
    {
        EXPbar:
        {
            direction: RIGHT,
            width: 400,
            height: 25,
            progress()
            {
                return player.stat.EXPnow.div(player.stat.EXPneed)
            },
            fillStyle()
            {
                return {"background-color":"green"}
            },
            display()
            {
                return "EXP : "+format(player.stat.EXPnow)+' / '+format(player.stat.EXPneed)
            }
        },
    },
    update(diff)
    {
        player.points=player.stat.money
        if(player.stat.EXPnow.gte(player.stat.EXPneed))
        {
            player.stat.EXPnow=player.stat.EXPnow.sub(player.stat.EXPneed)
            player.stat.level=player.stat.level.add(1)
            player.stat.EXPneed=player.stat.EXPneed.mul(1.1)
        }

        niming_drawBranch(8,4)
        niming_drawBranch(4,2)
        niming_drawBranch(4,3)
        niming_drawBranch(8,7)
        niming_drawBranch(7,6)
        niming_drawBranch(8,9)
        niming_drawBranch(8,11)
        niming_drawBranch(11,13)
        niming_drawBranch(11,14)
        niming_drawBranch(9,5)
        niming_drawBranch(9,10)
        niming_drawBranch(9,12)
    },
    tabFormat: [
        ["display-text",function(){return '<h1>等级 '+format(player.stat.level)}],
        ["bar","EXPbar"],
        "blank",
        "blank",
        "blank",
        ["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}],
        "blank",
        ["display-text",
            function() {
                return '<text style="color:#FF0000">攻击 : </text><text style="color:#FF0000">'+format(player.stat.atk)+'</text>'
            },
            { "color": "white", "font-size": "32px",}
        ],
        ["display-text",
            function() {
                return '<text style="color:#ADD8E6">防御 : </text><text style="color:lightblue">'+format(player.stat.def)+'</text>'
            },
            { "color": "white", "font-size": "32px",}
        ],
        ["display-text",
            function() {
                return '<text style="color:#00FF00">生命 : </text><text style="color:#00FF00">'+format(player.stat.hp)+'</text>'
            },
            { "color": "white", "font-size": "32px",}
        ],
        ["display-text",
            function() {
                return '<text style="color:#FF00FF">速度 : </text><text style="color:#FF00FF">'+format(player.stat.spd)
                +(hasTalent(13)?'x'+format(layers.challenge.clickables["T13"].EFFECT())+'='+format(player.stat.spd.mul(layers.challenge.clickables["T13"].EFFECT())):'')+'</text>'
            },
            { "color": "white", "font-size": "32px",}
        ],
        ["display-text",
            function() {
                return '<text style="color:#FFFF00">幸运 : </text><text style="color:#FFFF00">'+format(player.stat.luck)+'</text>'
            },
            { "color": "white", "font-size": "32px",}
        ],
    ],
    previousTab: "",
    leftTab: true,
})