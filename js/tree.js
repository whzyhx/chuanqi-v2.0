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
                return {"background-color":"#00FF00"}
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
    },
    tabFormat: [
        ["display-text",function(){return '<h1>等级 '+format(player.stat.level)}],
        ["bar","EXPbar"],
        "blank",
        "blank",
        "blank",
        ["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]
    ],
    previousTab: "",
    leftTab: true,
})