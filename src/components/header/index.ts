import {defineComponent, onMounted} from 'vue'

export default defineComponent({
    setup(){
        onMounted(()=>{
            const headerDom = document.querySelector('.header') as HTMLDivElement
            const headerPlaceholderDom = document.querySelector('.header-placeholder') as HTMLDivElement

            headerPlaceholderDom.style.height = headerDom.offsetHeight + 'px'
        })
    }
})