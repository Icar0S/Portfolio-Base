/** Chave da sessão que marca que o preloader já foi exibido. */
export const PRELOADER_STORAGE_KEY = "is-preloaded";

/** Script executado antes da pintura para decidir se o preloader aparece. */
export const preloaderBootScript = `(function(){var d=document.documentElement;try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem('${PRELOADER_STORAGE_KEY}')){d.classList.add('no-preloader')}else{d.classList.add('is-loading')}}catch(e){d.classList.add('no-preloader')}})();`;
