import type { Directive } from "vue";

export default <Directive<HTMLElement>>{
    mounted(el: HTMLElement): void {
        el.focus();    
    }
}