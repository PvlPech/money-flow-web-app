import type { Directive, DirectiveBinding } from "vue";

export default <Directive<HTMLElement, DirectiveBinding>>{
    mounted(el: HTMLElement, binding: DirectiveBinding<any>): void {
        const options = {
            rootMargin: "0px",
            threshold: 1.0,
        } as IntersectionObserverInit;
        const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            if(entries[0].isIntersecting) {
                binding.value();
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);    
    }
}