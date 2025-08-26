import {defineComponent, onMounted, reactive, toRefs} from 'vue'
import squareIcon from '@/assets/icon/square.png'
import splitIcon from '@/assets/icon/split.png'

export default defineComponent({
    setup(){
        const state = reactive({
            menuDynamicsIcon: squareIcon
        })

        const methods = {
            // 最小化窗口
            onMinimize(){
                window.ipcRenderer.invoke('minimize-window')
            },
            // 最大化
            onMaximize(){
                window.ipcRenderer.invoke('maximize-window')
            },
            // 关闭
            onClose(){
                window.ipcRenderer.invoke('close-window')
            }
        }

        onMounted(()=>{
            const headerDom = document.querySelector('.header') as HTMLDivElement
            const headerPlaceholderDom = document.querySelector('.header-placeholder') as HTMLDivElement

            headerPlaceholderDom.style.height = headerDom.offsetHeight + 'px'
        })

        window.ipcRenderer.on('hasMaximize', (_e, hasMaximize)=>{
            if(hasMaximize){
                state.menuDynamicsIcon = splitIcon
            }else {
                state.menuDynamicsIcon = squareIcon
            }
        })

        return {
            ...toRefs(state),
            ...methods
        }
    }
})