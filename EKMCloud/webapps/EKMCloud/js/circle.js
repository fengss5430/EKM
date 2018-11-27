$(function(){
    //饼状图
    var myChart1 = echarts.init(document.getElementById("circle"));
    var myChart2 = echarts.init(document.getElementById("circle2"));
    var labelTop = {
        normal : {
            label : {
                show : false,
                position : 'center',
                formatter : '{b}',
                textStyle: {
                    baseline : 'top'
                }
            },
            labelLine : {
                show : false
            }
        }
    };
    var labelBottom = {
        normal : {
            color: '#ccc',
            label : {
                show : true,
                position : 'center'
            },
            labelLine : {
                show : false
            }
        },
        emphasis: {
            barBorderWidth:1,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowOffsetX:0,
            shadowOffsetY:0,
            shadowBlur: 10,
            opacity:0.9
        }
    };
    var labelFromatter = {
        normal : {
            label : {
                formatter : function (params){
//                    return Math.floor(100 - params.value) + '%'
                	var num=(Math.floor((100 - params.value)*10000)/10000).toFixed(4) + '%';//不包含%                	
                    return num;
                },
                textStyle: {
                    baseline : 'bottom'
                }
            }
        },
        emphasis: {
            barBorderWidth:1,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowOffsetX:0,
            shadowOffsetY:0,
            shadowBlur: 10,
            opacity:0.9
        }
    };
    var tooltip={
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        position: function (p) {
            // 位置回调
            // console.log && console.log(p);
            return [p[0] + 10, p[1] - 10];
        }

    };
    var selfSpaceBaiFen=memory();
    var selfSpaceB=(Math.floor((selfSpaceBaiFen.replace(/%/, ""))*10000)/10000).toFixed(4);
    var NoselfSpaceB=(100-selfSpaceB).toFixed(4);
    option = {
        tooltip :tooltip,
        title : {
            subtext: '个人空间使用率',
            color:'#ccc',
            fontSize:'14',
            fontWeight:'normal',
            x: 'center',
            padding: [-25, 10]
        },

        calculable : true,
        series : [
            {
                name:'个人空间使用率',
                type:'pie',
                radius : ['40', '50'],
                color: ["#f77324"],
                avoidLabelOverlap:false,
                hoverAnimation:false,
                itemStyle : {
                    normal : {
                    	label : {
                            show : false
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis : {
                        label : {
                            show : true,
                            position : 'center',
                            textStyle : {
                                fontSize : '18',
                                fontWeight : 'bold',
                                baseline : 'middle'
                            }
                        }
                    }
                },
                itemStyle : labelFromatter,
                data:[
                    {value:selfSpaceB, name:'已使用',itemStyle : labelTop},
                    {value:NoselfSpaceB, name:'未使用',itemStyle : labelBottom}
                ]
            }
        ]
    };
    myChart1.setOption(option);
    var spaceBaiFen =  findTolSpace();
    if(typeof(spaceBaiFen) != "undefined"){
    	var useSpaceB=(Math.floor((spaceBaiFen.replace(/%/, ""))*10000)/10000).toFixed(4);
        var NoUseSpaceB=(100-useSpaceB).toFixed(4);
        option2 = {
            tooltip :tooltip,
            title : {
                subtext: '总空间使用率',
                color:'#626262',
                fontSize:'14',
                fontWeight:'normal',
                x: 'center',
                padding: [-25, 10]
            },

            calculable : true,
            series : [
                {
                    name:'总空间使用率',
                    type:'pie',
                    radius : ['40', '50'],
                    color: ["#f77324"],
                    avoidLabelOverlap:false,
                    hoverAnimation:false,
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                textStyle : {
                                    fontSize : '18',
                                    fontWeight : 'bold',
                                    baseline : 'middle'
                                }
                            }
                        }
                    },
                    itemStyle : labelFromatter,
                    data:[
                        {value:useSpaceB, name:'已使用',itemStyle : labelTop},
                        {value:NoUseSpaceB, name:'未使用',itemStyle : labelBottom}
                    ]
                }
            ]
        };
        myChart2.setOption(option2);
    }
});