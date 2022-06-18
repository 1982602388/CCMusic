// components/area-header/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title:{
            type:String,
            value:"默认文字"
        },
        textRight:{
            type:String,
            value:"更多"
        },
        showRight:{
            type:Boolean,
            value:true
        }
    },

    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleRightClick(){
            this.triggerEvent("clicks")
        }
    }
})
