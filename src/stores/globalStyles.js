import { writable } from "svelte/store";

let globalStyle = writable({
    activeColor: '#5100FF',//0038FF
    activeLightColor: '#D3BFFF',
    secondaryColor: '#2F0095',
    inactiveColor: '#1A0053',
    activeMono: '#D3BFFF',
    secondaryMono: '#8060C3',
    inactiveMono: '#3B246A',
    errorColor: '#FF001F',
    successColor: '#00FF75',
    borderRadius: '3px',
    borderRadius20: '20px',
    borderRadius10: '10px',
    largeDesktopFont: '27px',
    veryLargeDesktopFont: '31px',
    verySmallDesktopFont: '15px',
    titleDesktopFont: '60px',
    regularDesktopFont: '25px',
    smallDesktopFont: '17px',
    mediumDesktopFont: '21px',
    footnoteDesktopFont: '12px',
    veryLargeMobileFont: '31px',
    largeMobileFont: '19px',
    regularMobileFont: '16px',
    mediumMobileFont: '14px',
    smallMobileFont: '10px',
    footnoteMobileFont: '8px',
    theme: 'light',
});


export default globalStyle;