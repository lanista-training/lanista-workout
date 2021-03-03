import { useEffect, useState } from 'react';
export const useColor = () => {

    const [primaryColor, setPrimaryColor] = useState('#d20027');

    const changePrimaryColor = color => {
        window.localStorage.setItem('primaryColor', color)
        console.log("changePrimaryColor", color);
        if( color != primaryColor ) {
          console.log("SETTING PRIMARY COLOR", color)
          setPrimaryColor(color);
        }

    };

    useEffect(() => {
        const localPrimaryColor = window.localStorage.getItem('primaryColor');
        localPrimaryColor && setPrimaryColor(localPrimaryColor)
    }, []);

    return [primaryColor, changePrimaryColor]
};
