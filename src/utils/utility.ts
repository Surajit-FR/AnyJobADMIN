// Function to set an attribute on the <html> tag and save to sessionStorage
export const setHtmlAttribute = (attrName: string, value: string): void => {
    document.documentElement.setAttribute(attrName, value);
    const settings = JSON.parse(sessionStorage.getItem('theme-settings') || '{}');
    settings[attrName] = value;
    sessionStorage.setItem('theme-settings', JSON.stringify(settings));
};

// Function to remove an attribute from the <html> tag
export const removeHtmlAttribute = (attrName: string): void => {
    document.documentElement.removeAttribute(attrName);
    const settings = JSON.parse(sessionStorage.getItem('theme-settings') || '{}');
    delete settings[attrName];
    sessionStorage.setItem('theme-settings', JSON.stringify(settings));
};

// Function to toggle between two values for an attribute on the <html> tag
export const toggleHtmlAttribute = (attrName: string, value1: string, value2: string): void => {
    const currentValue = document.documentElement.getAttribute(attrName);
    const newValue = (currentValue === value1) ? value2 : value1;
    setHtmlAttribute(attrName, newValue);
};

// Function to add a class to the <html> tag
export const addHtmlClass = (className: string): void => {
    document.documentElement.classList.add(className);
    const classes = document.documentElement.className;
    sessionStorage.setItem('html-classes', classes);
};

// Function to remove a class from the <html> tag
export const removeHtmlClass = (className: string): void => {
    document.documentElement.classList.remove(className);
    const classes = document.documentElement.className;
    sessionStorage.setItem('html-classes', classes);
};

// Function to toggle multiple classes on the <html> tag
export const toggleHtmlClass = (classNames: string): void => {
    const classList = classNames.split(' ');
    classList.forEach(className => {
        document.documentElement.classList.toggle(className);
    });
    const classes = document.documentElement.className;
    sessionStorage.setItem('html-classes', classes);
};

// Function to load settings from sessionStorage
export const loadSettingsFromSessionStorage = (): void => {
    const settings = JSON.parse(sessionStorage.getItem('theme-settings') || '{}');
    Object.keys(settings).forEach(key => {
        const value = settings[key];
        if (value !== undefined) {
            setHtmlAttribute(key, value);
        }
    });

    const classes = sessionStorage.getItem('html-classes');
    if (classes) {
        document.documentElement.className = classes;
    }
};

// Function for formatReadableDateTime
export const formatReadableDateTime = (isoTimestamp: string, locale: string = "en-US", options: Intl.DateTimeFormatOptions = {}): string => {
    // Default options for date and time formatting
    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true // 12-hour clock format
    };

    // Merge user-provided options with defaults
    const formatOptions: Intl.DateTimeFormatOptions = { ...defaultOptions, ...options };

    // Format the date
    return new Intl.DateTimeFormat(locale, formatOptions).format(new Date(isoTimestamp));
}

export const HrFormat = (time: string)=>{
    const parsedTime= Number(time)
    if (parsedTime == 0){
      return "12 am"
    }
    else if(parsedTime < 12){
      return `${parsedTime} am`
    }
    else if(parsedTime == 12){
      return `${parsedTime} pm`
    }
    return `${parsedTime - 12} pm`
  }