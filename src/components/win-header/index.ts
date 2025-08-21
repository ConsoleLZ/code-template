import {defineComponent, onMounted, reactive, toRefs} from 'vue'
import squareIcon from '@/assets/icon/square.png'

export default defineComponent({
    setup(){
        const state = reactive({
            menuDynamicsIcon: squareIcon
        })

        onMounted(()=>{
            const headerDom = document.querySelector('.header') as HTMLDivElement
            const headerPlaceholderDom = document.querySelector('.header-placeholder') as HTMLDivElement

            headerPlaceholderDom.style.height = headerDom.offsetHeight + 'px'
        })

        return {
            ...toRefs(state)
        }
    }
})